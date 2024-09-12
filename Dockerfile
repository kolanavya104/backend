# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
