const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（上传的文件）
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 生产环境：提供前端静态文件
if (isProduction) {
  app.use(express.static(path.join(__dirname, 'public')));
}

// API 路由
app.use('/api', routes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 生产环境：所有其他路由返回前端 index.html
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// 错误处理
app.use(errorHandler);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`环境: ${isProduction ? '生产' : '开发'}`);
  if (isProduction) {
    console.log(`前端: http://localhost:${PORT}`);
  } else {
    console.log(`API 文档: http://localhost:${PORT}/api`);
  }
});

module.exports = app;