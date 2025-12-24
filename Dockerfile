# --- Aşama 1: Derleme (Builder) ---
# Sizin örneğinizdeki gibi Node 22 sürümünü kullanıyoruz
FROM node:22-alpine AS builder

WORKDIR /app

# Cache optimizasyonu için bağımlılık dosyalarını kopyala
COPY package.json package-lock.json ./

# 'npm install' yerine 'npm ci' kullanıyoruz (lock dosyasına sadık kalır ve daha güvenlidir)
RUN npm ci

# Tüm proje dosyalarını kopyala
COPY . .

# Coolify'da tanımladığınız VITE_API_KEY'i build aşamasına dahil et
# Coolify'da "Build Arguments" veya "Environment Variables" kısmında bu değişkenin tanımlı olduğundan emin olun.
ARG VITE_API_KEY
ENV VITE_API_KEY=$VITE_API_KEY

# Projeyi derle (sonuç 'dist' klasörüne çıkar)
RUN npm run build

# --- Aşama 2: Sunum (Production) ---
# Statik dosyaları sunmak için Nginx kullanıyoruz
FROM nginx:alpine

# React Router için Nginx Ayarı
# (Bu ayar olmazsa, alt sayfalarda F5 yapınca 404 hatası alırsınız)
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
