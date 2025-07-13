FROM node:21-alpine

WORKDIR /src/app

# Copy the package files first
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install dotenv


# Copy the rest of the application files
COPY . .

# Expose the desired port
EXPOSE 9080

# Start the application
CMD [ "node", "index.js" ]