const Database = require('better-sqlite3');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, '../../database/memories.db');

// 创建数据库连接
const db = new Database(dbPath, {
  verbose: process.env.NODE_ENV === 'development' ? console.log : null
});

// 启用外键约束
db.pragma('foreign_keys = ON');

module.exports = db;