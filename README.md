# 回忆录 Web 应用

一个以藤蔓绕柱向上生长的形式动态展示回忆的 Web 应用。

## 功能特性

- 🌿 3D 藤蔓生长动画
- 🎯 交互式记忆节点
- 📝 回忆 CRUD 管理
- 📷 媒体文件上传
- 🎨 心情和类别分类

## 技术栈

- **前端**：React + Three.js + Vite
- **后端**：Node.js + Express
- **数据库**：SQLite

## 快速开始

### 方式一：使用启动脚本（推荐）

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### 方式二：手动启动

#### 1. 安装依赖

```bash
# 后端
cd backend
npm install

# 前端
cd frontend
npm install
```

#### 2. 初始化数据库

```bash
cd backend
npm run init-db
```

#### 3. 启动开发服务器

```bash
# 启动后端（端口 5000）
cd backend
npm run dev

# 启动前端（端口 3000）
cd frontend
npm run dev
```

#### 4. 访问应用

- 前端：http://localhost:3000
- 后端 API：http://localhost:5000/api

## API 文档

### 回忆

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/memories` | 获取所有回忆 |
| GET | `/api/memories/:id` | 获取单个回忆 |
| POST | `/api/memories` | 创建回忆 |
| PUT | `/api/memories/:id` | 更新回忆 |
| DELETE | `/api/memories/:id` | 删除回忆 |

### 上传

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/upload` | 上传文件 |
| DELETE | `/api/upload/:id` | 删除文件 |

## 项目结构

```
memories/
├── frontend/          # React 前端
│   ├── src/
│   │   ├── components/
│   │   │   ├── Scene3D/    # 3D 场景组件
│   │   │   └── UI/         # UI 组件
│   │   ├── pages/          # 页面
│   │   └── utils/          # 工具函数
│   └── package.json
├── backend/           # Express 后端
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── models/         # 数据模型
│   │   └── routes/         # 路由
│   ├── database/           # 数据库脚本
│   └── package.json
└── README.md
```

## 使用说明

### 3D 视图

- 🖱️ 拖拽旋转视角
- 🔍 滚轮缩放
- 👆 点击节点查看详情

### 管理页面

- ➕ 添加新回忆
- ✏️ 编辑回忆
- 🗑️ 删除回忆
- 📷 上传照片

## 开发说明

### 数据库

数据库文件位于 `backend/database/memories.db`

### 测试数据

运行 `npm run init-db` 会插入 15 条示例回忆

### 环境变量

后端环境变量在 `backend/.env`:

```
PORT=5000
DB_PATH=./database/memories.db
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

## 运维工具

### 状态检查

```bash
chmod +x status.sh
./status.sh
```

状态检查脚本会检查：
- 项目结构完整性
- 依赖安装状态
- 数据库状态
- 服务运行状态
- 端口占用情况
- 文件统计信息

### 监控

```bash
chmod +x monitor.sh
./monitor.sh
```

监控脚本会检查：
- 后端服务状态
- 前端服务状态
- 数据库状态
- 上传目录状态
- 系统资源使用情况

### 备份

```bash
chmod +x backup.sh
./backup.sh
```

备份脚本会：
- 备份数据库
- 备份上传文件
- 创建完整备份压缩包
- 自动清理旧备份（保留最近 7 个）

### 部署

```bash
chmod +x deploy.sh
./deploy.sh
```

部署脚本会：
- 构建前端
- 复制构建产物到后端
- 启动生产服务器

## 测试

详细测试指南请查看 [TESTING.md](TESTING.md)

## 许可证

MIT