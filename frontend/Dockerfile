FROM node:23.11-slim
RUN npm install -g @angular/cli
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:prod"]