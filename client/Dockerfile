# Use node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g vite
# Copy the rest of the client files
COPY . .

# Expose the port
EXPOSE 5173

# Command to run the client
CMD ["npm", "run", "dev"]
