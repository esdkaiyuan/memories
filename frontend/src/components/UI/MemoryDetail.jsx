import { formatDateChinese } from '../../utils/dateUtils';
import { MOODS, CATEGORIES } from '../../utils/constants';

const MemoryDetail = ({ memory, onClose }) => {
  const getMoodInfo = (mood) => {
    return MOODS.find(m => m.value === mood) || MOODS[4];
  };

  const getCategoryInfo = (category) => {
    return CATEGORIES.find(c => c.value === category) || CATEGORIES[5];
  };

  const moodInfo = getMoodInfo(memory.mood);
  const categoryInfo = getCategoryInfo(memory.category);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>{memory.title}</h3>
        <button style={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>

      <div style={styles.meta}>
        <span style={{
          ...styles.badge,
          backgroundColor: moodInfo.color
        }}>
          {moodInfo.label}
        </span>
        <span style={styles.category}>
          {categoryInfo.label}
        </span>
        <span style={styles.date}>
          {formatDateChinese(memory.memory_date)}
        </span>
      </div>

      <p style={styles.content}>{memory.content}</p>

      {memory.media && memory.media.length > 0 && (
        <div style={styles.mediaSection}>
          <p style={styles.mediaTitle}>📷 附件</p>
          <div style={styles.mediaList}>
            {memory.media.map((media, index) => (
              <div key={index} style={styles.mediaItem}>
                <span style={styles.mediaName}>{media.file_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.footer}>
        <span style={styles.time}>
          创建于 {memory.created_at}
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '20px',
    minWidth: '300px',
    maxWidth: '400px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    fontFamily: 'Microsoft YaHei, sans-serif',
    transform: 'scale(0.9)',
    transition: 'transform 0.3s ease'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  title: {
    fontSize: '20px',
    color: '#333',
    margin: 0,
    flex: 1
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#999',
    cursor: 'pointer',
    padding: '4px',
    marginLeft: '12px'
  },
  meta: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '12px'
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: '500'
  },
  category: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    backgroundColor: '#E0E0E0',
    color: '#666'
  },
  date: {
    fontSize: '13px',
    color: '#999',
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '16px',
    maxHeight: '150px',
    overflow: 'auto'
  },
  mediaSection: {
    marginBottom: '16px'
  },
  mediaTitle: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px'
  },
  mediaList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  mediaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    backgroundColor: '#F5F5F5',
    borderRadius: '4px'
  },
  mediaName: {
    fontSize: '12px',
    color: '#666'
  },
  footer: {
    borderTop: '1px solid #E0E0E0',
    paddingTop: '12px'
  },
  time: {
    fontSize: '12px',
    color: '#999'
  }
};

export default MemoryDetail;