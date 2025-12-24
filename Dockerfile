# --- Aşama 1: Derleme (Builder) ---
FROM node:22-alpine AS builder

WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package.json package-lock.json ./

# DÜZELTME: 'npm ci' yerine 'npm install' kullanıyoruz.
# npm ci, lock dosyası package.json ile senkronize değilse hata verir.
# npm install ise eksikleri tamamlar ve kuruluma devam eder.
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# Coolify'da tanımladığınız VITE_API_KEY'i build aşamasına dahil et
ARG VITE_API_KEY
ENV VITE_API_KEY=$VITE_API_KEY

# Projeyi derle (sonuç 'dist' klasörüne çıkar)
RUN npm run build

# --- Aşama 2: Sunum (Production) ---
FROM nginx:alpine

# React Router için Nginx Ayarı
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Derlenen 'dist' klasörünü Nginx'in sunacağı yere kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Port 80'i dışarı aç
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
