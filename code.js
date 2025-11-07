"use strict";
// Figma Plugin Code - Backend Logic
// Show the UI when the plugin is launched
figma.showUI(__html__, { width: 400, height: 500 });
// Store the current selection
let currentSelection = null;
// Listen for selection changes
figma.on("selectionchange", () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 1 && selection[0].type === "TEXT") {
        currentSelection = selection[0];
        // Send selection info to UI
        figma.ui.postMessage({
            type: "selection-changed",
            data: {
                hasSelection: true,
                text: currentSelection.characters
            }
        });
    }
    else {
        currentSelection = null;
        figma.ui.postMessage({
            type: "selection-changed",
            data: {
                hasSelection: false,
                text: ""
            }
        });
    }
});
// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === "regenerate-text") {
        if (!currentSelection) {
            figma.ui.postMessage({
                type: "error",
                message: "Veuillez sélectionner un texte"
            });
            return;
        }
        try {
            // Get the API key and Gem ID from the message
            const { apiKey, gemId, originalText } = msg;
            if (!apiKey) {
                figma.ui.postMessage({
                    type: "error",
                    message: "Veuillez configurer votre clé API Gemini"
                });
                return;
            }
            // Show loading state
            figma.ui.postMessage({
                type: "loading",
                message: "Génération du texte en cours..."
            });
            // Call Gemini AI API
            const regeneratedText = await callGeminiAPI(apiKey, gemId, originalText);
            // Load the font before updating text
            await figma.loadFontAsync(currentSelection.fontName);
            // Update the text node
            currentSelection.characters = regeneratedText;
            // Notify UI of success
            figma.ui.postMessage({
                type: "success",
                message: "Texte régénéré avec succès!",
                newText: regeneratedText
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
            figma.ui.postMessage({
                type: "error",
                message: `Erreur: ${errorMessage}`
            });
        }
    }
    if (msg.type === "close") {
        figma.closePlugin();
    }
    if (msg.type === "get-current-selection") {
        const selection = figma.currentPage.selection;
        if (selection.length === 1 && selection[0].type === "TEXT") {
            currentSelection = selection[0];
            figma.ui.postMessage({
                type: "selection-changed",
                data: {
                    hasSelection: true,
                    text: currentSelection.characters
                }
            });
        }
        else {
            figma.ui.postMessage({
                type: "selection-changed",
                data: {
                    hasSelection: false,
                    text: ""
                }
            });
        }
    }
};
// Function to call Gemini AI API
async function callGeminiAPI(apiKey, gemId, text) {
    var _a, _b, _c, _d, _e;
    try {
        // Construct the API endpoint
        // If gemId is provided, use the Gem-specific endpoint, otherwise use the standard model
        let endpoint;
        let requestBody;
        if (gemId && gemId.trim() !== "") {
            // Using a Gem (with pre-configured guidelines)
            endpoint = `https://generativelanguage.googleapis.com/v1beta/gems/${gemId}:generateContent?key=${apiKey}`;
            requestBody = {
                contents: [{
                        parts: [{
                                text: text
                            }]
                    }]
            };
        }
        else {
            // Using the standard Gemini model with a generic reformulation prompt
            endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            requestBody = {
                contents: [{
                        parts: [{
                                text: `Reformule le texte suivant en améliorant sa clarté et sa qualité tout en gardant le même sens:\n\n${text}`
                            }]
                    }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            };
        }
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) || response.statusText}`);
        }
        const data = await response.json();
        // Extract the generated text from the response
        if (data.candidates && ((_e = (_d = (_c = (_b = data.candidates[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text)) {
            return data.candidates[0].content.parts[0].text.trim();
        }
        else {
            throw new Error("Format de réponse invalide de l'API Gemini");
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        throw new Error(`Erreur lors de l'appel à l'API Gemini: ${errorMessage}`);
    }
}
