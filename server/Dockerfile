# Use node.js as base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server files
COPY . .

# Expose the port
EXPOSE 5000

# Command to run the server
CMD ["node", "index.js"]
