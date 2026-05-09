#!/bin/bash

echo "=== 备份回忆录数据 ==="

# 创建备份目录
BACKUP_DIR="backups"
mkdir -p $BACKUP_DIR

# 生成备份文件名
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/memories_backup_$TIMESTAMP.tar.gz"

# 备份数据库
echo "1. 备份数据库..."
if [ -f "backend/database/memories.db" ]; then
    cp backend/database/memories.db "$BACKUP_DIR/memories_$TIMESTAMP.db"
    echo "   ✓ 数据库已备份"
else
    echo "   ✗ 数据库不存在"
fi

# 备份上传文件
echo "2. 备份上传文件..."
if [ -d "backend/uploads" ] && [ "$(ls -A backend/uploads)" ]; then
    tar -czf "$BACKUP_DIR/uploads_$TIMESTAMP.tar.gz" backend/uploads/
    echo "   ✓ 上传文件已备份"
else
    echo "   ✗ 没有上传文件需要备份"
fi

# 创建完整备份
echo "3. 创建完整备份..."
tar -czf "$BACKUP_FILE" \
    backend/database/memories.db \
    backend/uploads/ \
    backend/.env \
    2>/dev/null

if [ -f "$BACKUP_FILE" ]; then
    echo "   ✓ 完整备份已创建: $BACKUP_FILE"
    echo "   备份大小: $(du -h "$BACKUP_FILE" | cut -f1)"
else
    echo "   ✗ 备份创建失败"
fi

# 清理旧备份（保留最近 7 个）
echo "4. 清理旧备份..."
cd $BACKUP_DIR
ls -t memories_backup_*.tar.gz 2>/dev/null | tail -n +8 | xargs -r rm
cd ..
echo "   ✓ 旧备份已清理"

echo ""
echo "=== 备份完成 ==="
echo "备份位置: $BACKUP_DIR/"
echo ""
ls -lh $BACKUP_DIR/