# Gunakan base image
FROM node:20

# Buat direktori kerja
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy semua file ke container
COPY . .

# Expose port
EXPOSE 3000

# Start aplikasi
CMD ["npm", "start"]