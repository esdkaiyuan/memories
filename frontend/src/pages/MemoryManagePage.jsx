import { useState } from 'react';
import useMemories from '../hooks/useMemories';
import MemoryForm from '../components/UI/MemoryForm';
import MemoryList from '../components/UI/MemoryList';

const MemoryManagePage = () => {
  const {
    memories,
    loading,
    error,
    createMemory,
    updateMemory,
    deleteMemory
  } = useMemories();

  const [editingMemory, setEditingMemory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    try {
      await createMemory(data);
      setShowForm(false);
    } catch (error) {
      console.error('创建失败:', error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateMemory(editingMemory.id, data);
      setEditingMemory(null);
      setShowForm(false);
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这个回忆吗？')) {
      try {
        await deleteMemory(id);
      } catch (error) {
        console.error('删除失败:', error);
      }
    }
  };

  const handleEdit = (memory) => {
    setEditingMemory(memory);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingMemory(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div className="loading-spinner" style={styles.spinner}></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <p>错误: {error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>管理回忆</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + 添加回忆
        </button>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
          <MemoryForm
            memory={editingMemory}
            onSubmit={editingMemory ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div style={styles.listContainer}>
        <MemoryList
          memories={memories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '28px',
    color: '#333'
  },
  formContainer: {
    marginBottom: '24px',
    padding: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  loading: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px'
  },
  spinner: {
    width: '40px',
    height: '40px'
  },
  error: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#F44336'
  }
};

export default MemoryManagePage;