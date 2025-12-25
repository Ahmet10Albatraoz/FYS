FROM node:22-alpine AS base

# Bağımlılıkları yükle
FROM base AS deps
WORKDIR /
COPY package.json package-lock.json* ./
RUN npm ci

# Build al
FROM base AS builder
WORKDIR /
COPY --from=deps /node_modules ./node_modules
COPY . .
RUN npm run build

# Çalıştırma aşaması
FROM base AS runner
WORKDIR /

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

COPY --from=builder /public ./public
COPY --from=builder /.next/standalone ./
COPY --from=builder /.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
