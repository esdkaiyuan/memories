const multer = require('multer');
const path = require('path');
const fs = require('fs');
const memoryModel = require('../models/memoryModel');

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    // 确保上传目录存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 允许的文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('不支持的文件类型'), false);
  }
};

// 配置上传
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// 上传单个文件
const uploadSingle = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请选择文件' });
    }

    try {
      const { memory_id } = req.body;
      if (!memory_id) {
        return res.status(400).json({ success: false, message: '请提供回忆ID' });
      }

      // 检查回忆是否存在
      const memory = memoryModel.findById(memory_id);
      if (!memory) {
        return res.status(404).json({ success: false, message: '回忆不存在' });
      }

      // 保存文件信息到数据库
      const fileData = {
        file_name: req.file.originalname,
        file_path: `/uploads/${req.file.filename}`,
        file_type: req.file.mimetype,
        file_size: req.file.size
      };

      const media = memoryModel.addMedia(memory_id, fileData);
      res.status(201).json({ success: true, data: media });
    } catch (err) {
      next(err);
    }
  });
};

// 删除媒体文件
const removeMedia = (req, res, next) => {
  try {
    const media = memoryModel.findMediaById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: '媒体文件不存在' });
    }

    // 删除文件
    const filePath = path.join(__dirname, '../..', media.file_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 从数据库删除记录
    memoryModel.removeMedia(req.params.id);
    res.json({ success: true, message: '媒体文件已删除' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadSingle,
  removeMedia
};