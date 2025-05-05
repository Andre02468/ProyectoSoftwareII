FROM node:23.11-slim
RUN npm install -g @nestjs/cli
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3006
CMD ["npm", "run", "start:prod"]