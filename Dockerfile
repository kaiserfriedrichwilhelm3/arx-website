FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .
RUN if [ -f "tsconfig.json" ] || grep -q '"build"' package.json 2>/dev/null; then npm run build || true; fi

EXPOSE 3000
CMD ["npm", "start"]
