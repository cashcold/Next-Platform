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

# Set the HOST environment variable to 0.0.0.0
ENV HOST 0.0.0.0

# Expose the port your app runs on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
