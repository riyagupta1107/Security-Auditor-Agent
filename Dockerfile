FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV GROQ_API_KEY=""

CMD ["node", "index.js"]