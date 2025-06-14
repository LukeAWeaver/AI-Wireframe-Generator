FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose the development server port
EXPOSE 3000

# Start the development server with host flag
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"] 