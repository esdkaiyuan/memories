#!/bin/bash

echo "=== 测试回忆录 API ==="

# 测试健康检查
echo -e "\n1. 测试健康检查:"
curl -s http://localhost:5000/health | jq .

# 测试获取所有回忆
echo -e "\n2. 获取所有回忆:"
curl -s http://localhost:5000/api/memories | jq '.data.memories | length'

# 测试创建新回忆
echo -e "\n3. 创建新回忆:"
curl -s -X POST http://localhost:5000/api/memories \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试回忆",
    "content": "这是一个测试回忆",
    "memory_date": "2024-01-01",
    "mood": "happy",
    "category": "general"
  }' | jq .

# 测试获取单个回忆
echo -e "\n4. 获取单个回忆 (ID=1):"
curl -s http://localhost:5000/api/memories/1 | jq '.data.title'

# 测试更新回忆
echo -e "\n5. 更新回忆 (ID=16):"
curl -s -X PUT http://localhost:5000/api/memories/16 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "更新后的测试回忆",
    "content": "这是更新后的测试回忆",
    "memory_date": "2024-01-01",
    "mood": "excited",
    "category": "milestone"
  }' | jq '.data.title'

# 测试删除回忆
echo -e "\n6. 删除回忆 (ID=16):"
curl -s -X DELETE http://localhost:5000/api/memories/16 | jq .

echo -e "\n=== 测试完成 ==="