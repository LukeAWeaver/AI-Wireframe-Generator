FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose the development server port
EXPOSE 3001

# Start the development server
CMD ["npm", "run", "dev"] 