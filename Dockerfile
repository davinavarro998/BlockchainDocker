# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port you want to use (if any)
EXPOSE 8545

# Command to run your Hardhat project
CMD ["npx", "hardhat", "node"]
