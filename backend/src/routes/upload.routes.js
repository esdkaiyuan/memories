const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// 上传文件
router.post('/', uploadController.uploadSingle);

// 删除媒体文件
router.delete('/:id', uploadController.removeMedia);

module.exports = router;