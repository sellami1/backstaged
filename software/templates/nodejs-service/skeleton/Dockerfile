FROM node:24-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY src ./src
USER node
EXPOSE ${{ values.port }}
CMD ["node", "src/index.js"]
