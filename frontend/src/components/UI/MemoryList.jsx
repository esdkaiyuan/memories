import { formatDateChinese, getRelativeTime } from '../../utils/dateUtils';
import { MOODS, CATEGORIES } from '../../utils/constants';

const MemoryList = ({ memories, onEdit, onDelete }) => {
  const getMoodInfo = (mood) => {
    return MOODS.find(m => m.value === mood) || MOODS[4];
  };

  const getCategoryInfo = (category) => {
    return CATEGORIES.find(c => c.value === category) || CATEGORIES[5];
  };

  if (memories.length === 0) {
    return (
      <div style={styles.empty}>
        <p>还没有回忆，点击上方按钮添加第一个回忆吧！</p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {memories.map(memory => {
        const moodInfo = getMoodInfo(memory.mood);
        const categoryInfo = getCategoryInfo(memory.category);

        return (
          <div key={memory.id} style={styles.item}>
            <div style={styles.itemHeader}>
              <div style={styles.itemTitle}>
                <span style={{
                  ...styles.moodBadge,
                  backgroundColor: moodInfo.color
                }}>
                  {moodInfo.label}
                </span>
                <h3 style={styles.title}>{memory.title}</h3>
              </div>
              <div style={styles.itemActions}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onEdit(memory)}
                >
                  编辑
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(memory.id)}
                >
                  删除
                </button>
              </div>
            </div>

            <p style={styles.content}>
              {memory.content.length > 150
                ? `${memory.content.substring(0, 150)}...`
                : memory.content
              }
            </p>

            <div style={styles.itemFooter}>
              <span style={styles.date}>
                📅 {formatDateChinese(memory.memory_date)}
              </span>
              <span style={styles.category}>
                🏷️ {categoryInfo.label}
              </span>
              <span style={styles.time}>
                {getRelativeTime(memory.created_at)}
              </span>
              {memory.media && memory.media.length > 0 && (
                <span style={styles.mediaCount}>
                  📷 {memory.media.length} 张照片
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    padding: '20px',
    borderBottom: '1px solid #E0E0E0',
    transition: 'background-color 0.2s ease'
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  itemTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  moodBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: '500'
  },
  title: {
    fontSize: '18px',
    color: '#333',
    margin: 0
  },
  itemActions: {
    display: 'flex',
    gap: '8px'
  },
  content: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '12px'
  },
  itemFooter: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    fontSize: '13px',
    color: '#999'
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  mediaCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  empty: {
    padding: '40px',
    textAlign: 'center',
    color: '#999',
    fontSize: '16px'
  }
};

export default MemoryList;