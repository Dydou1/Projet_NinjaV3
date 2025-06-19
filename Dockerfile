# Étape de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# Étape finale
FROM node:20-alpine

# Ajout utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

COPY --from=builder /app .

# Copier aussi les certificats dans l'image (important)
RUN mkdir -p /app/src/ssl
COPY src/ssl /app/src/ssl

RUN npm prune --production
USER appuser

# Exposer HTTP + HTTPS
EXPOSE 3001
EXPOSE 3443

CMD ["node", "src/server.js"]

