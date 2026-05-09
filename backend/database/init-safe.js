const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, 'memories.db');

console.log('开始安全初始化数据库...');

// 创建新数据库（如果不存在则创建，存在则打开）
const db = new Database(dbPath);

// 读取并执行 schema（使用 IF NOT EXISTS）
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);
console.log('数据库表结构已创建（如果不存在）');

// 检查是否已有数据
const existingCount = db.prepare('SELECT COUNT(*) as count FROM memories').get();

if (existingCount.count === 0) {
  // 读取并执行 seed 数据
  const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  db.exec(seed);
  console.log('测试数据已插入');
} else {
  console.log(`数据库已有 ${existingCount.count} 条记录，跳过插入`);
}

// 验证数据
const memoryCount = db.prepare('SELECT COUNT(*) as count FROM memories').get();
console.log(`当前共有 ${memoryCount.count} 条回忆记录`);

// 关闭数据库
db.close();
console.log('数据库初始化完成！');