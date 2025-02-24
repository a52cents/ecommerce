# Utiliser une image Node.js officielle
FROM node:18

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code dans le conteneur
COPY . .

# Exposer le port utilisé par ton API (ex: 3000)
EXPOSE 3000

# Commande pour démarrer l'API
CMD ["npm", "start"]

