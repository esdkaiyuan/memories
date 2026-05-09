const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, 'memories.db');

// 删除现有数据库（如果存在）
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('已删除现有数据库');
}

// 创建新数据库
const db = new Database(dbPath);

// 读取并执行 schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);
console.log('数据库表结构已创建');

// 读取并执行 seed 数据
const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
db.exec(seed);
console.log('测试数据已插入');

// 验证数据
const memoryCount = db.prepare('SELECT COUNT(*) as count FROM memories').get();
console.log(`已插入 ${memoryCount.count} 条回忆记录`);

// 关闭数据库
db.close();
console.log('数据库初始化完成！');