FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và yarn.lock vào thư mục làm việc
COPY package.json yarn.lock* package-lock.json* ./

# Cài đặt dependencies của dự án
RUN npm install

COPY . .

RUN npm run build


# Expose cổng mà ứng dụng Next.js sẽ chạy
EXPOSE 3000

CMD ["npm","run","start"]