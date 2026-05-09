const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memoryController');

// 获取所有回忆
router.get('/', memoryController.getAll);

// 获取单个回忆
router.get('/:id', memoryController.getById);

// 创建新回忆
router.post('/', memoryController.create);

// 更新回忆
router.put('/:id', memoryController.update);

// 删除回忆
router.delete('/:id', memoryController.remove);

module.exports = router;