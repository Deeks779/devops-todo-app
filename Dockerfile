# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
