# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 web 版回忆录应用，以藤蔓绕柱向上生长的形式动态展示曾经的回忆。采用前后端分离架构。

## 技术栈

- **前端**：React + Three.js（3D效果）+ Vite
- **后端**：Node.js + Express
- **数据库**：SQLite（本地测试）

## 开发命令

### 后端
```bash
cd backend
npm install          # 安装依赖
npm run init-db      # 初始化数据库（创建表和测试数据）
npm run dev          # 启动开发服务器（端口5000）
npm start            # 启动生产服务器
```

### 前端
```bash
cd frontend
npm install          # 安装依赖
npm run dev          # 启动开发服务器（端口3000）
npm run build        # 构建生产版本
npm run preview      # 预览生产版本
```

## 项目结构

- `frontend/` - React + Three.js 前端应用
- `backend/` - Node.js + Express API 服务器
- `backend/database/` - SQLite 数据库文件和脚本
- `backend/uploads/` - 上传的媒体文件存储

## API 端点

- `GET /api/memories` - 获取所有回忆（支持分页、筛选）
- `GET /api/memories/:id` - 获取单个回忆
- `POST /api/memories` - 创建新回忆
- `PUT /api/memories/:id` - 更新回忆
- `DELETE /api/memories/:id` - 删除回忆
- `POST /api/upload` - 上传媒体文件

## 数据库

数据库文件位于 `backend/database/memories.db`，包含两个表：
- `memories` - 回忆数据
- `media` - 媒体附件

## 3D 场景

藤蔓绕柱生长动画的核心组件：
- `Pillar.jsx` - 时间轴柱子
- `Vine.jsx` - 藤蔓螺旋几何体
- `MemoryNode.jsx` - 记忆节点（叶子/花朵）