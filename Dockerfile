# --- 1. Aşama: Build (Node.js) ---
FROM node:22-alpine AS builder

# Konteyner içinde /app diye bir klasör açar (senin pc'de olmasına gerek yok)
WORKDIR /app

# Paketleri yükle
COPY package.json package-lock.json ./
RUN npm install

# Tüm dosyaları içeri at ve build al
COPY . .
RUN npm run build
# (Bu işlem sonucunda 'dist' klasörü oluşacak)

# --- 2. Aşama: Sunucu (Caddy) ---
FROM caddy:alpine

# React uygulaman tek sayfa (SPA) olduğu için sayfayı yenileyince 404 yememen lazım.
# Bu yüzden Caddy'ye basit bir ayar dosyası oluşturuyoruz:
RUN echo $':3000 {\n\
    root * /usr/share/caddy\n\
    file_server\n\
    try_files {path} /index.html\n\
}' > /etc/caddy/Caddyfile

# Build aşamasından çıkan 'dist' klasörünü Caddy'nin sunacağı yere kopyalıyoruz
COPY --from=builder /app/dist /usr/share/caddy

# 3000 Portunu dışarı açıyoruz
EXPOSE 3000

# Caddy'yi başlatıyoruz
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
