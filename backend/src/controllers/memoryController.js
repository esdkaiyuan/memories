const memoryModel = require('../models/memoryModel');

// 获取所有回忆
const getAll = (req, res, next) => {
  try {
    const { page = 1, limit = 100, category, mood, from, to } = req.query;
    const filters = { category, mood, from, to };
    const result = memoryModel.findAll(page, limit, filters);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// 获取单个回忆
const getById = (req, res, next) => {
  try {
    const memory = memoryModel.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ success: false, message: '回忆不存在' });
    }
    res.json({ success: true, data: memory });
  } catch (err) {
    next(err);
  }
};

// 创建新回忆
const create = (req, res, next) => {
  try {
    const { title, content, memory_date } = req.body;
    if (!title || !content || !memory_date) {
      return res.status(400).json({ success: false, message: '标题、内容和日期为必填项' });
    }
    const memory = memoryModel.create(req.body);
    res.status(201).json({ success: true, data: memory });
  } catch (err) {
    next(err);
  }
};

// 更新回忆
const update = (req, res, next) => {
  try {
    const existing = memoryModel.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: '回忆不存在' });
    }
    const memory = memoryModel.update(req.params.id, req.body);
    res.json({ success: true, data: memory });
  } catch (err) {
    next(err);
  }
};

// 删除回忆
const remove = (req, res, next) => {
  try {
    const memory = memoryModel.remove(req.params.id);
    if (!memory) {
      return res.status(404).json({ success: false, message: '回忆不存在' });
    }
    res.json({ success: true, message: '回忆已删除' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};