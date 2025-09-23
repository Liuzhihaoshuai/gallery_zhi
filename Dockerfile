# 多阶段构建：构建阶段
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制包管理文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制项目源码
COPY . .

# 构建项目
RUN pnpm build

# 生产阶段：使用 nginx 服务静态文件
FROM nginx:alpine AS production

# 复制构建产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置（可选，使用默认配置）
# 如果需要自定义路由，可以取消注释下面一行并创建 nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
