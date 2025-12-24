# --- Aşama 1: Derleme (Builder) ---
FROM node:20-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm ci

# Tüm kaynak kodunu kopyala
COPY . .

# Build argümanlarını tanımla (API Key gibi değişkenlerin build sırasında olması gerekir)
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Uygulamayı derle (dist klasörünü oluşturur)
RUN npm run build

# --- Aşama 2: Sunum (Production) ---
FROM nginx:alpine

# Derlenen dosyaları Nginx'in varsayılan dizinine kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx portunu dışarı aç (Varsayılan 80)
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
