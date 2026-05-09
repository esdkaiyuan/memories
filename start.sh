#!/bin/bash

echo "启动回忆录应用..."

# 检查依赖
echo "检查依赖..."
if [ ! -d "backend/node_modules" ]; then
    echo "安装后端依赖..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "安装前端依赖..."
    cd frontend && npm install && cd ..
fi

# 检查数据库
if [ ! -f "backend/database/memories.db" ]; then
    echo "初始化数据库..."
    cd backend && npm run init-db && cd ..
fi

# 启动后端
echo "启动后端服务器 (端口 5000)..."
cd backend && npm run dev &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动前端
echo "启动前端服务器 (端口 3000)..."
cd frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "=========================================="
echo "回忆录应用已启动！"
echo "=========================================="
echo ""
echo "前端: http://localhost:3000"
echo "后端: http://localhost:5000"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo ""

# 等待用户中断
wait $BACKEND_PID $FRONTEND_PID