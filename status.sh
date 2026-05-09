#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "=== 回忆录应用状态检查 ==="
echo "项目目录: $SCRIPT_DIR"
echo ""

# 检查项目结构
echo "1. 检查项目结构..."
if [ -d "$SCRIPT_DIR/frontend" ] && [ -d "$SCRIPT_DIR/backend" ]; then
    echo "   ✓ 项目结构完整"
else
    echo "   ✗ 项目结构不完整"
fi

# 检查依赖
echo ""
echo "2. 检查依赖..."
if [ -d "$SCRIPT_DIR/frontend/node_modules" ] && [ -d "$SCRIPT_DIR/backend/node_modules" ]; then
    echo "   ✓ 依赖已安装"
else
    echo "   ✗ 依赖未安装"
fi

# 检查数据库
echo ""
echo "3. 检查数据库..."
if [ -f "$SCRIPT_DIR/backend/database/memories.db" ]; then
    # 尝试使用 API 检查数据库内容
    if curl -s http://localhost:5000/api/memories > /dev/null 2>&1; then
        MEMORY_COUNT=$(curl -s http://localhost:5000/api/memories | grep -o '"id":[0-9]*' | wc -l)
        echo "   ✓ 数据库存在，包含 $MEMORY_COUNT 条回忆"
    else
        # 尝试使用 sqlite3 命令
        MEMORY_COUNT=$(sqlite3 "$SCRIPT_DIR/backend/database/memories.db" "SELECT COUNT(*) FROM memories;" 2>/dev/null || echo "未知")
        echo "   ✓ 数据库存在，包含 $MEMORY_COUNT 条回忆"
    fi
else
    echo "   ✗ 数据库不存在"
fi

# 检查服务
echo ""
echo "4. 检查服务状态..."
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "   ✓ 后端服务运行中"
else
    echo "   ✗ 后端服务未运行"
fi

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✓ 前端服务运行中"
else
    echo "   ✗ 前端服务未运行"
fi

# 检查端口
echo ""
echo "5. 检查端口占用..."
if command -v netstat > /dev/null; then
    BACKEND_PORT=$(netstat -ano | grep ":5000" | head -1)
    FRONTEND_PORT=$(netstat -ano | grep ":3000" | head -1)

    if [ -n "$BACKEND_PORT" ]; then
        echo "   ✓ 端口 5000 已占用"
    else
        echo "   ✗ 端口 5000 未占用"
    fi

    if [ -n "$FRONTEND_PORT" ]; then
        echo "   ✓ 端口 3000 已占用"
    else
        echo "   ✗ 端口 3000 未占用"
    fi
else
    echo "   ⚠ 无法检查端口（netstat 不可用）"
fi

# 检查文件数量
echo ""
echo "6. 检查文件统计..."
TOTAL_FILES=$(find "$SCRIPT_DIR" -not -path "*/node_modules/*" -not -path "*/.git/*" -type f | wc -l)
JS_FILES=$(find "$SCRIPT_DIR" -not -path "*/node_modules/*" -not -path "*/.git/*" -name "*.js" -o -name "*.jsx" | wc -l)
CSS_FILES=$(find "$SCRIPT_DIR" -not -path "*/node_modules/*" -not -path "*/.git/*" -name "*.css" | wc -l)
SQL_FILES=$(find "$SCRIPT_DIR" -not -path "*/node_modules/*" -not -path "*/.git/*" -name "*.sql" | wc -l)

echo "   总文件数: $TOTAL_FILES"
echo "   JavaScript 文件: $JS_FILES"
echo "   CSS 文件: $CSS_FILES"
echo "   SQL 文件: $SQL_FILES"

# 检查磁盘空间
echo ""
echo "7. 检查磁盘空间..."
PROJECT_SIZE=$(du -sh "$SCRIPT_DIR" 2>/dev/null | cut -f1 || echo "未知")
echo "   项目大小: $PROJECT_SIZE"

echo ""
echo "=== 状态检查完成 ==="