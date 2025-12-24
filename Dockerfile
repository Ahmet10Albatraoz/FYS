# --- Aşama 1: Derleme (Builder) ---
FROM node:20-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package.json package-lock.json ./

# DEĞİŞİKLİK BURADA: npm ci yerine npm install kullanıyoruz.
# npm install, lock dosyası eksik olsa bile package.json'a bakarak kurulumu tamamlar.
RUN npm install

# Tüm kaynak kodunu kopyala
COPY . .

# Build argümanlarını tanımla
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Uygulamayı derle
RUN npm run build

# --- Aşama 2: Sunum (Production) ---
FROM nginx:alpine

# Derlenen dosyaları Nginx'in varsayılan dizinine kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx portunu dışarı aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
