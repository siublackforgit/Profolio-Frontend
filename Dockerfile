#Build the React App
FROM node:18 AS Build
WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build