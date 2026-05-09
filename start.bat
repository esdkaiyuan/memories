@echo off
echo 启动回忆录应用...

REM 检查依赖
echo 检查依赖...
if not exist "backend\node_modules" (
    echo 安装后端依赖...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo 安装前端依赖...
    cd frontend
    call npm install
    cd ..
)

REM 检查数据库
if not exist "backend\database\memories.db" (
    echo 初始化数据库...
    cd backend
    call npm run init-db
    cd ..
)

REM 启动后端
echo 启动后端服务器 (端口 5000)...
cd backend
start "Backend Server" cmd /c "npm run dev"
cd ..

REM 等待后端启动
timeout /t 3 /nobreak >nul

REM 启动前端
echo 启动前端服务器 (端口 3000)...
cd frontend
start "Frontend Server" cmd /c "npm run dev"
cd ..

echo.
echo ==========================================
echo 回忆录应用已启动！
echo ==========================================
echo.
echo 前端: http://localhost:3000
echo 后端: http://localhost:5000
echo.
echo 关闭此窗口不会停止服务
echo 请手动关闭后端和前端服务器窗口
echo.
pause