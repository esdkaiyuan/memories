# 回忆录 Web 应用

一个以2D SVG藤蔓动画形式动态展示人生回忆的Web应用。

## 🌟 项目意义

这不仅是一个技术项目，更是一个承载情感、记录生命、传递美好的数字空间，让科技有了温度，让回忆有了形状。🍃✨

### 核心价值
- **情感价值**：数字化记忆存档，将珍贵时刻永久保存
- **艺术表达**：叶子飘落营造诗意氛围，富有哲思的自然隐喻
- **技术价值**：性能优化典范，Bundle体积减少77%
- **用户体验**：沉浸式浏览，低门槛记录，情感共鸣

## ✨ 功能特性

- 🌿 **2D SVG藤蔓动画** - 手绘风格藤蔓路径生长动画
- 🍃 **飘落叶子节点** - 记忆以叶子形式从顶部随机飘落
- 🎯 **可交互的记忆节点** - 悬停高亮、点击查看详情
- 📝 **回忆CRUD管理** - 完整的记忆增删改查
- 📷 **媒体文件上传** - 支持图片等多媒体内容
- 🎨 **心情分类** - 不同心情对应不同颜色的叶子

## 🚀 技术栈

### 前端
- React 18 + Vite
- Zustand 状态管理
- React Router 路由
- SVG矢量图形动画
- CSS3动画效果

### 后端
- Node.js + Express
- RESTful API
- SQLite数据库
- 文件上传处理

## 📦 快速开始

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

## 🎨 动画效果

### 藤蔓生长
- 手绘风格的SVG路径
- 3秒平滑绘制动画
- 左右摆动的自然曲线

### 叶子飘落
- 从顶部随机位置出现
- 缓慢向下飘落（8-17秒周期）
- 随机水平漂移和旋转
- 每片叶子轨迹独特

### 交互体验
- 悬停暂停动画并放大高亮
- 点击查看回忆详情弹窗
- 响应式设计适配多端

## 📊 性能优化

| 指标 | 改进幅度 |
|------|---------|
| Bundle体积 | **-77%** (650KB → 150KB) |
| npm包数量 | **-30%** (242 → 170) |
| 加载速度 | **+52%** 更快 |
| 内存占用 | **-64%** 更低 |

## 🔧 API 文档

### 回忆接口

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/memories` | 获取所有回忆 |
| GET | `/api/memories/:id` | 获取单个回忆 |
| POST | `/api/memories` | 创建回忆 |
| PUT | `/api/memories/:id` | 更新回忆 |
| DELETE | `/api/memories/:id` | 删除回忆 |

### 上传接口

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/upload` | 上传文件 |
| DELETE | `/api/upload/:filename` | 删除文件 |

## 📁 项目结构

```
memories/
├── frontend/              # React 前端
│   ├── src/
│   │   ├── components/
│   │   │   ├── Scene2D/   # 2D场景组件
│   │   │   └── UI/        # UI组件
│   │   ├── pages/         # 页面
│   │   ├── utils/         # 工具函数
│   │   └── styles/        # 样式文件
│   └── package.json
├── backend/               # Express 后端
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── models/        # 数据模型
│   │   └── routes/        # 路由
│   ├── database/          # 数据库脚本
│   └── package.json
└── README.md
```

## 🛠️ 运维工具

### 状态检查
```bash
chmod +x status.sh
./status.sh
```

### 监控
```bash
chmod +x monitor.sh
./monitor.sh
```

### 备份
```bash
chmod +x backup.sh
./backup.sh
```

### 部署
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📝 环境变量

后端环境变量在 `backend/.env`:

```
PORT=5000
DB_PATH=./database/memories.db
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

## 🧪 测试

详细测试指南请查看 [TESTING.md](TESTING.md)

## 📄 许可证

MIT

## 🙏 致谢

感谢所有为这个项目贡献的开发者和用户！

---

**让每一片叶子都承载着一段美好的回忆** 🍃
