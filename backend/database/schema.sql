-- 回忆表
CREATE TABLE IF NOT EXISTS memories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    content     TEXT    NOT NULL,
    memory_date TEXT    NOT NULL,              -- ISO 8601 日期格式：'2024-06-15'
    mood        TEXT    DEFAULT 'neutral',     -- 'happy','sad','excited','calm','neutral'
    category    TEXT    DEFAULT 'general',     -- 'travel','family','work','milestone','general'
    color       TEXT    DEFAULT '#4CAF50',     -- 节点颜色（十六进制）
    is_public   INTEGER DEFAULT 1,            -- 0=私密, 1=公开
    sort_order  INTEGER DEFAULT 0,            -- 手动排序覆盖
    created_at  TEXT    DEFAULT (datetime('now','localtime')),
    updated_at  TEXT    DEFAULT (datetime('now','localtime'))
);

-- 媒体附件表
CREATE TABLE IF NOT EXISTS media (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    memory_id   INTEGER NOT NULL,
    file_name   TEXT    NOT NULL,              -- 原始文件名
    file_path   TEXT    NOT NULL,              -- 服务器存储路径
    file_type   TEXT    NOT NULL,              -- 'image/jpeg', 'image/png', 'video/mp4'
    file_size   INTEGER DEFAULT 0,            -- 字节数
    created_at  TEXT    DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (memory_id) REFERENCES memories(id) ON DELETE CASCADE
);

-- 性能索引
CREATE INDEX IF NOT EXISTS idx_memories_date ON memories(memory_date);
CREATE INDEX IF NOT EXISTS idx_memories_category ON memories(category);
CREATE INDEX IF NOT EXISTS idx_media_memory ON media(memory_id);