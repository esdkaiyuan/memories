import { useEffect } from 'react';
import VineScene from '../components/Scene2D/VineScene';
import useMemories from '../hooks/useMemories';

const HomePage = () => {
  const { memories, loading, error } = useMemories();

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
        <h1 style={styles.title}>我的回忆录</h1>
        <p style={styles.subtitle}>
          {memories.length} 个回忆，记录着美好时光
        </p>
      </div>
      <div style={styles.sceneContainer}>
        <VineScene memories={memories} />
      </div>
      <div style={styles.instructions}>
        <p>🍃 悬停查看叶子 | 👆 点击查看详情</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    backgroundColor: '#1A1A1A'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '32px',
    color: '#FFFFFF',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#999'
  },
  sceneContainer: {
    flex: 1,
    minHeight: '500px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
  },
  instructions: {
    textAlign: 'center',
    marginTop: '16px',
    color: '#666',
    fontSize: '14px'
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

export default HomePage;