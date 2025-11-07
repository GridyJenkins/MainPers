# AI Text Regenerator - Plugin Figma

Un plugin Figma puissant qui utilise Google Gemini AI pour régénérer et reformuler automatiquement vos textes selon des guidelines personnalisées.

## 🎯 Fonctionnalités

- **Régénération intelligente** : Reformule vos textes en utilisant l'IA Gemini
- **Guidelines personnalisées** : Intégration avec les Gems de Gemini AI pour appliquer des règles spécifiques
- **Interface intuitive** : Simple et facile à utiliser
- **Sauvegarde de configuration** : Vos paramètres sont conservés entre les sessions

## 📋 Prérequis

- Figma Desktop App ou Figma dans le navigateur
- Une clé API Google Gemini AI (gratuite)
- (Optionnel) Un Gem ID si vous souhaitez utiliser des guidelines personnalisées

## 🚀 Installation

### Étape 1 : Obtenir une clé API Gemini

1. Allez sur [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Create API Key"
4. Copiez votre clé API

### Étape 2 : (Optionnel) Créer un Gem avec vos guidelines

1. Allez sur [Google AI Studio](https://aistudio.google.com/)
2. Créez un nouveau Gem
3. Configurez vos guidelines spécifiques pour la reformulation de texte
   - Exemple : "Reformule le texte en style professionnel et concis"
   - Exemple : "Adapte le texte pour un public jeune et dynamique"
   - Exemple : "Transforme le texte en suivant les principes UX writing"
4. Notez l'ID de votre Gem (format : `gems/xxxxx`)

### Étape 3 : Compiler le plugin

```bash
# Installer les dépendances
npm install

# Compiler le TypeScript en JavaScript
npm run build
```

### Étape 4 : Installer dans Figma

1. Ouvrez Figma Desktop App
2. Allez dans **Menu** → **Plugins** → **Development** → **Import plugin from manifest...**
3. Sélectionnez le fichier `manifest.json` de ce projet
4. Le plugin est maintenant installé!

## 💡 Utilisation

### Configuration initiale

1. Lancez le plugin depuis **Menu** → **Plugins** → **AI Text Regenerator**
2. Entrez votre **clé API Gemini** dans le champ prévu
3. (Optionnel) Entrez votre **Gem ID** si vous utilisez des guidelines personnalisées
4. Cliquez sur **"💾 Sauvegarder la config"** pour conserver vos paramètres

### Régénérer un texte

1. Sélectionnez un élément texte dans votre design Figma
2. Le texte apparaîtra automatiquement dans le plugin
3. Cliquez sur **"✨ Régénérer le texte"**
4. Attendez quelques secondes que l'IA génère le nouveau texte
5. Le texte sera automatiquement mis à jour dans votre design!

## 📁 Structure du projet

```
.
├── manifest.json      # Configuration du plugin Figma
├── code.ts           # Logique backend (TypeScript)
├── code.js           # Logique backend compilée (généré)
├── ui.html           # Interface utilisateur
├── package.json      # Dépendances npm
├── tsconfig.json     # Configuration TypeScript
└── README.md         # Documentation
```

## 🔧 Fichiers essentiels

### 1. manifest.json
Configure le plugin et déclare les permissions nécessaires, notamment l'accès réseau à l'API Gemini.

### 2. code.ts
Contient toute la logique backend :
- Détection de la sélection de texte
- Communication avec l'API Gemini
- Mise à jour du texte dans Figma

### 3. ui.html
Interface utilisateur complète avec :
- Formulaire de configuration API
- Aperçu du texte sélectionné
- Boutons d'action
- Messages de statut

## 🛠️ Développement

### Scripts disponibles

```bash
# Compiler le TypeScript
npm run build

# Mode watch (recompile automatiquement)
npm run watch
```

### Modifier le plugin

1. Modifiez `code.ts` ou `ui.html`
2. Exécutez `npm run build`
3. Rechargez le plugin dans Figma (Menu → Plugins → Development → Reload)

## 🔐 Sécurité

- Votre clé API est stockée localement dans le navigateur (localStorage)
- Jamais partagée ou envoyée ailleurs que vers l'API Gemini officielle
- Utilisez le type "password" pour masquer la clé à l'écran

## 🌟 Bonnes pratiques

1. **Créez des Gems spécifiques** pour différents types de contenu :
   - Gem pour les titres et headers
   - Gem pour les descriptions de produits
   - Gem pour les textes marketing
   - Gem pour les textes d'erreur

2. **Testez vos guidelines** dans Google AI Studio avant de les utiliser

3. **Sauvegardez votre configuration** pour ne pas avoir à re-saisir vos clés

4. **Gérez votre quota API** - L'API Gemini a des limites d'utilisation gratuites

## 🐛 Dépannage

### Le plugin ne se charge pas
- Vérifiez que vous avez bien compilé le TypeScript (`npm run build`)
- Assurez-vous que `code.js` existe dans le dossier

### Erreur "API Key invalid"
- Vérifiez que votre clé API est correcte
- Assurez-vous que l'API Gemini est activée pour votre compte

### Le texte ne se met pas à jour
- Vérifiez que vous avez bien sélectionné un élément TEXT dans Figma
- Essayez de recharger le plugin

### Erreur réseau
- Vérifiez votre connexion internet
- Vérifiez que le domaine `generativelanguage.googleapis.com` est accessible

## 📚 Ressources

- [Documentation Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Google Gemini AI Documentation](https://ai.google.dev/)
- [Google AI Studio](https://aistudio.google.com/)

## 📄 Licence

Ce projet est libre d'utilisation et de modification.

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à proposer des améliorations.

---

Créé avec ❤️ pour améliorer votre workflow Figma
