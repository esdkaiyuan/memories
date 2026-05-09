#!/bin/bash

echo "=== 部署回忆录应用 ==="

# 构建前端
echo "1. 构建前端..."
cd frontend
npm run build
cd ..

# 复制构建产物到后端
echo "2. 复制构建产物..."
cp -r frontend/dist/* backend/public/

# 设置生产环境变量
echo "3. 设置生产环境..."
export NODE_ENV=production
export PORT=5000

# 启动生产服务器
echo "4. 启动生产服务器..."
cd backend
npm start

echo ""
echo "=========================================="
echo "部署完成！"
echo "=========================================="
echo ""
echo "应用运行在: http://localhost:5000"
echo ""