#Stage 1 Build React app
From node:18-alphine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ..
RUN npm run build

#Stage 2: Serve with Nginx ..
FROM nginx:alphine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


