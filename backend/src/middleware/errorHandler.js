// 错误处理中间件
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Multer 错误
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: '文件大小超过限制（最大10MB）'
      });
    }
    return res.status(400).json({
      success: false,
      message: `上传错误: ${err.message}`
    });
  }

  // 数据库错误
  if (err.message && err.message.includes('SQLITE')) {
    return res.status(500).json({
      success: false,
      message: '数据库错误'
    });
  }

  // 默认服务器错误
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
};

module.exports = errorHandler;