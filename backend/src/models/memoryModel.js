const db = require('../config/database');

// 获取所有回忆（支持分页和筛选）
const findAll = (page = 1, limit = 100, filters = {}) => {
  let sql = 'SELECT * FROM memories WHERE 1=1';
  const params = [];

  // 应用筛选条件
  if (filters.category) {
    sql += ' AND category = ?';
    params.push(filters.category);
  }
  if (filters.mood) {
    sql += ' AND mood = ?';
    params.push(filters.mood);
  }
  if (filters.from) {
    sql += ' AND memory_date >= ?';
    params.push(filters.from);
  }
  if (filters.to) {
    sql += ' AND memory_date <= ?';
    params.push(filters.to);
  }

  // 获取总数
  const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
  const total = db.prepare(countSql).get(...params).total;

  // 添加排序和分页
  sql += ' ORDER BY memory_date ASC';
  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, (page - 1) * limit);

  const memories = db.prepare(sql).all(...params);

  // 为每个回忆附加媒体文件
  for (const mem of memories) {
    mem.media = db.prepare('SELECT * FROM media WHERE memory_id = ?').all(mem.id);
  }

  return { memories, total, page: Number(page), limit: Number(limit) };
};

// 根据 ID 获取单个回忆
const findById = (id) => {
  const memory = db.prepare('SELECT * FROM memories WHERE id = ?').get(id);
  if (memory) {
    memory.media = db.prepare('SELECT * FROM media WHERE memory_id = ?').all(memory.id);
  }
  return memory;
};

// 创建新回忆
const create = (data) => {
  const { title, content, memory_date, mood, category, color, is_public, sort_order } = data;
  const sql = `
    INSERT INTO memories (title, content, memory_date, mood, category, color, is_public, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = db.prepare(sql).run(
    title, content, memory_date, mood || 'neutral', category || 'general',
    color || '#4CAF50', is_public !== undefined ? is_public : 1, sort_order || 0
  );
  return findById(result.lastInsertRowid);
};

// 更新回忆
const update = (id, data) => {
  const { title, content, memory_date, mood, category, color, is_public, sort_order } = data;
  const sql = `
    UPDATE memories
    SET title = ?, content = ?, memory_date = ?, mood = ?, category = ?, color = ?,
        is_public = ?, sort_order = ?, updated_at = datetime('now','localtime')
    WHERE id = ?
  `;
  db.prepare(sql).run(
    title, content, memory_date, mood, category, color, is_public, sort_order, id
  );
  return findById(id);
};

// 删除回忆
const remove = (id) => {
  const memory = findById(id);
  if (memory) {
    db.prepare('DELETE FROM memories WHERE id = ?').run(id);
  }
  return memory;
};

// 添加媒体文件
const addMedia = (memoryId, fileData) => {
  const { file_name, file_path, file_type, file_size } = fileData;
  const sql = `
    INSERT INTO media (memory_id, file_name, file_path, file_type, file_size)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = db.prepare(sql).run(memoryId, file_name, file_path, file_type, file_size || 0);
  return db.prepare('SELECT * FROM media WHERE id = ?').get(result.lastInsertRowid);
};

// 删除媒体文件
const removeMedia = (id) => {
  const media = db.prepare('SELECT * FROM media WHERE id = ?').get(id);
  if (media) {
    db.prepare('DELETE FROM media WHERE id = ?').run(id);
  }
  return media;
};

// 获取媒体文件
const findMediaById = (id) => {
  return db.prepare('SELECT * FROM media WHERE id = ?').get(id);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  addMedia,
  removeMedia,
  findMediaById
};