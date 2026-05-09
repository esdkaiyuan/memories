#!/bin/bash

echo "=== 回忆录应用监控 ==="
echo ""

# 检查后端服务
echo "1. 检查后端服务..."
if curl -s http://localhost:5000/health > /dev/null; then
    echo "   ✓ 后端服务运行正常"
else
    echo "   ✗ 后端服务未运行"
fi

# 检查前端服务
echo ""
echo "2. 检查前端服务..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "   ✓ 前端服务运行正常"
else
    echo "   ✗ 前端服务未运行"
fi

# 检查数据库
echo ""
echo "3. 检查数据库..."
if [ -f "backend/database/memories.db" ]; then
    MEMORY_COUNT=$(sqlite3 backend/database/memories.db "SELECT COUNT(*) FROM memories;")
    echo "   ✓ 数据库存在，包含 $MEMORY_COUNT 条回忆"
else
    echo "   ✗ 数据库不存在"
fi

# 检查上传目录
echo ""
echo "4. 检查上传目录..."
if [ -d "backend/uploads" ]; then
    FILE_COUNT=$(ls -1 backend/uploads 2>/dev/null | wc -l)
    echo "   ✓ 上传目录存在，包含 $FILE_COUNT 个文件"
else
    echo "   ✗ 上传目录不存在"
fi

# 系统资源
echo ""
echo "5. 系统资源..."
echo "   CPU 使用率: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')%"
echo "   内存使用: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
echo "   磁盘使用: $(df -h . | awk 'NR==2 {print $3 "/" $2 " (" $5 ")"}')"

echo ""
echo "=== 监控完成 ==="