# 使用官方的 Node.js 作为基础镜像
FROM node:18 as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到容器中（除了 .dockerignore 中指定的文件）
COPY . .

# 构建 Vue 3 + TypeScript + Vite 项目
RUN npm run build

# 第二阶段的多阶段构建
FROM nginx:latest as production-stage

# 将第一阶段构建的文件复制到 Nginx 镜像中
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 配置 Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# 暴露 Nginx 的默认端口（通常是 80）
EXPOSE 80

# 容器启动时运行 Nginx
CMD ["nginx", "-g", "daemon off;"]
