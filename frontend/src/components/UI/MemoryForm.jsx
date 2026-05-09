import { useState, useEffect } from 'react';
import { MOODS, CATEGORIES, DEFAULT_COLORS } from '../../utils/constants';

const MemoryForm = ({ memory, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    memory_date: '',
    mood: 'neutral',
    category: 'general',
    color: '#4CAF50',
    is_public: 1
  });

  useEffect(() => {
    if (memory) {
      setFormData({
        title: memory.title || '',
        content: memory.content || '',
        memory_date: memory.memory_date || '',
        mood: memory.mood || 'neutral',
        category: memory.category || 'general',
        color: memory.color || '#4CAF50',
        is_public: memory.is_public !== undefined ? memory.is_public : 1
      });
    }
  }, [memory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 自动设置颜色
    if (name === 'category' && DEFAULT_COLORS[value]) {
      setFormData(prev => ({
        ...prev,
        color: DEFAULT_COLORS[value]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.formTitle}>
        {memory ? '编辑回忆' : '添加新回忆'}
      </h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>标题 *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="给这个回忆起个名字"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>内容 *</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          style={styles.textarea}
          placeholder="写下你的回忆..."
          rows={4}
        />
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>日期 *</label>
          <input
            type="date"
            name="memory_date"
            value={formData.memory_date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>心情</label>
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            style={styles.select}
          >
            {MOODS.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.label}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>类别</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.select}
          >
            {CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>颜色</label>
          <div style={styles.colorPicker}>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              style={styles.colorInput}
            />
            <span style={styles.colorValue}>{formData.color}</span>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>可见性</label>
          <select
            name="is_public"
            value={formData.is_public}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              is_public: parseInt(e.target.value)
            }))}
            style={styles.select}
          >
            <option value={1}>公开</option>
            <option value={0}>私密</option>
          </select>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button type="submit" className="btn btn-primary">
          {memory ? '保存修改' : '添加回忆'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          取消
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formTitle: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '8px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    padding: '12px',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    fontSize: '16px'
  },
  textarea: {
    padding: '12px',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '100px'
  },
  select: {
    padding: '12px',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#FFFFFF'
  },
  colorPicker: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  colorInput: {
    width: '50px',
    height: '40px',
    padding: '2px',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  colorValue: {
    fontSize: '14px',
    color: '#666'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  }
};

export default MemoryForm;