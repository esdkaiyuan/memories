import { useRef, useState, useEffect, useMemo } from 'react';
import { generateVinePath, calculateLeafPositions } from '../../utils/vinePathGenerator';
import MemoryLeaf from './MemoryLeaf';
import MemoryDetail from '../UI/MemoryDetail';

const VineScene = ({ memories = [] }) => {
  const svgRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [growthProgress, setGrowthProgress] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(null);

  // 生成藤蔓路径（使用固定尺寸）
  const vinePath = useMemo(() => {
    if (memories.length === 0) return '';
    
    // 使用SVG viewBox的固定尺寸
    return generateVinePath(memories, 800, 600);
  }, [memories]);

  // 获取路径长度并启动生长动画
  useEffect(() => {
    if (svgRef.current && vinePath && vinePath.length > 0) {
      const pathElement = svgRef.current.querySelector('.vine-path');
      if (pathElement) {
        try {
          const length = pathElement.getTotalLength();
          if (length > 0) {
            setPathLength(length);
            
            // 延迟100ms后启动生长动画
            setTimeout(() => {
              setGrowthProgress(1);
            }, 100);
          }
        } catch (error) {
          console.error('Error getting path length:', error);
        }
      }
    }
  }, [vinePath]);

  // 计算叶子初始位置（从顶部随机分布）
  const leafPositions = useMemo(() => {
    if (memories.length === 0) return [];
    
    // 为每个记忆生成随机的顶部起始位置
    return memories.map((memory, index) => {
      const seed = memory.id || 0;
      // 水平位置：在SVG宽度范围内随机分布（50px - 750px）
      const x = 50 + ((seed * 47) % 700);
      // 垂直位置：都在顶部上方（-50px），等待动画开始
      const y = -50;
      
      return { x, y, memory };
    });
  }, [memories]);

  // 处理叶子点击
  const handleLeafClick = (memory) => {
    setSelectedMemory(memory);
  };

  // 处理叶子悬停
  const handleLeafHover = (memory) => {
    // 可以在这里添加悬停提示等
  };

  if (memories.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>暂无回忆，去添加一些美好时光吧！</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        style={styles.svg}
      >
        {/* 背景装饰 - 光点 */}
        {[...Array(8)].map((_, i) => (
          <circle
            key={`light-${i}`}
            cx={100 + (i * 100)}
            cy={50 + (i % 3) * 150}
            r="3"
            fill="rgba(255, 255, 255, 0.6)"
            style={{
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}

        {/* 藤蔓路径 */}
        <path
          className="vine-path"
          d={vinePath}
          fill="none"
          stroke="#2d5a27"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength * (1 - growthProgress),
            transition: 'stroke-dashoffset 3s ease-in-out'
          }}
        />

        {/* 叶子节点 */}
        {leafPositions.map(({ x, y, memory }) => (
          <MemoryLeaf
            key={memory.id}
            memory={memory}
            position={{ x, y }}
            onHover={handleLeafHover}
            onClick={handleLeafClick}
          />
        ))}
      </svg>

      {/* 详情弹窗 */}
      {selectedMemory && (
        <div style={styles.modal}>
          <MemoryDetail
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
          />
        </div>
      )}

      {/* 交互提示 */}
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
    backgroundColor: '#1A1A1A',
    position: 'relative'
  },
  emptyContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '500px',
    backgroundColor: '#1A1A1A'
  },
  emptyText: {
    color: '#999',
    fontSize: '18px'
  },
  svg: {
    width: '100%',
    height: '600px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    display: 'block'
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000
  },
  instructions: {
    textAlign: 'center',
    marginTop: '16px',
    color: '#666',
    fontSize: '14px'
  }
};

export default VineScene;
