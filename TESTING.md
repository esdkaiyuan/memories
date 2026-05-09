# 测试指南

## 功能测试

### 1. 后端 API 测试

启动后端服务器后，可以使用以下命令测试 API：

```bash
# 健康检查
curl http://localhost:5000/health

# 获取所有回忆
curl http://localhost:5000/api/memories

# 获取单个回忆
curl http://localhost:5000/api/memories/1

# 创建新回忆
curl -X POST http://localhost:5000/api/memories \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试回忆",
    "content": "这是一个测试回忆",
    "memory_date": "2024-01-01",
    "mood": "happy",
    "category": "general"
  }'

# 更新回忆
curl -X PUT http://localhost:5000/api/memories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "更新后的标题",
    "content": "更新后的内容"
  }'

# 删除回忆
curl -X DELETE http://localhost:5000/api/memories/16
```

### 2. 前端功能测试

访问 http://localhost:3000 后：

1. **3D 视图页面**
   - 验证 3D 场景是否正常加载
   - 测试鼠标拖拽旋转
   - 测试滚轮缩放
   - 点击记忆节点查看详情
   - 验证藤蔓生长动画

2. **管理页面** (http://localhost:3000/manage)
   - 查看回忆列表
   - 点击"添加回忆"按钮
   - 填写表单并提交
   - 编辑现有回忆
   - 删除回忆

### 3. 数据库测试

```bash
# 重置数据库
cd backend
npm run init-db

# 验证数据
sqlite3 database/memories.db "SELECT COUNT(*) FROM memories;"
```

## 性能测试

### 1. API 响应时间

```bash
# 测试获取所有回忆的响应时间
time curl http://localhost:5000/api/memories > /dev/null
```

### 2. 前端加载时间

使用浏览器开发者工具的 Network 标签页测量页面加载时间。

## 浏览器兼容性

测试以下浏览器：
- Chrome (推荐)
- Firefox
- Edge
- Safari

## 常见问题

### 1. 端口被占用

如果端口 3000 或 5000 被占用，可以修改配置：

**前端**：修改 `frontend/vite.config.js` 中的 `server.port`

**后端**：修改 `backend/.env` 中的 `PORT`

### 2. 数据库错误

如果遇到数据库错误，重新初始化：

```bash
cd backend
rm database/memories.db
npm run init-db
```

### 3. 依赖问题

如果遇到依赖问题，重新安装：

```bash
# 清除缓存
rm -rf node_modules
rm package-lock.json

# 重新安装
npm install
```

## 测试数据

应用自带 15 条测试数据，涵盖不同心情和类别：

- 旅行回忆（3条）
- 家庭回忆（3条）
- 工作回忆（2条）
- 里程碑回忆（4条）
- 友情回忆（1条）
- 其他回忆（2条）

## 自动化测试

未来可以添加：

1. **单元测试**：使用 Jest 测试工具函数
2. **集成测试**：使用 Supertest 测试 API
3. **端到端测试**：使用 Cypress 测试用户流程