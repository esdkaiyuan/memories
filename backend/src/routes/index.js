const express = require('express');
const router = express.Router();
const memoryRoutes = require('./memory.routes');
const uploadRoutes = require('./upload.routes');

// 回忆路由
router.use('/memories', memoryRoutes);

// 上传路由
router.use('/upload', uploadRoutes);

module.exports = router;