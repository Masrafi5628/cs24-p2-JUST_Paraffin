# Use node.js as base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client files
COPY . .

# Expose the port
EXPOSE 3000

# Command to run the client
CMD ["npm", "run","dev"]
