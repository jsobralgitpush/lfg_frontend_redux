# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Note: We are not copying the rest of the app or running npm run build here.
# This is intentional. In development, we'll rely on volume binding
# to reflect code changes without rebuilding the image.

# Specify the command to run on container start
CMD ["npm", "start"]

# This line is optional, since 3000 is the default port for Create React App
EXPOSE 3000
