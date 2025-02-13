# 使用官方的 Node.js 运行时镜像作为构建环境
FROM node:14 as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 构建应用
RUN npm run build

# 使用官方的 Nginx 镜像作为运行环境
FROM nginx:stable-alpine as production-stage

# 复制构建好的文件到 Nginx 的默认静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]