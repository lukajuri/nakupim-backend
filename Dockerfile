# Use a lightweight Node.js image
FROM node:16-alpine

WORKDIR /app

# Copy package files & install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy app code
COPY . .

# Run the app
CMD ["node", "index.js"]