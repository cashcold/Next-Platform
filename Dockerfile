# Use the official Node.js image.
FROM node:12

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your backend runs on
EXPOSE 8000

# Start the Node.js application
CMD ["node", "server.js"]
