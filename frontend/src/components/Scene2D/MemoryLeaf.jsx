import { useState, useMemo } from 'react';

const MemoryLeaf = ({ memory, position, onHover, onClick }) => {
  const [hovered, setHovered] = useState(false);

  // 基于记忆ID生成叶子参数（确定性随机）
  const seed = memory.id || 0;
  const width = 15 + ((seed * 3571) % 100) / 100 * 10; // 15-25px
  const height = 25 + ((seed * 2903) % 100) / 100 * 15; // 25-40px
  const curve = ((seed * 4211) % 100) / 100 * 0.3; // 弯曲度 0-0.3

  // 叶子路径（手绘风格）
  const leafPath = useMemo(() => {
    return `
      M 0,0
      Q ${width * 0.5},${height * 0.3} ${width * (1 + curve)},${height * 0.7}
      Q ${width * 0.5},${height * 0.9} 0,${height}
      Q -${width * 0.5},${height * 0.9} -${width * (1 + curve)},${height * 0.7}
      Q -${width * 0.5},${height * 0.3} 0,0
    `;
  }, [width, height, curve]);

  // 心情颜色映射
  const moodColors = useMemo(() => ({
    happy: '#7CB342',    // 明亮绿
    sad: '#64B5F6',      // 淡蓝
    excited: '#FF7043',  // 橙红
    calm: '#AED581',     // 柔和绿
    neutral: '#9E9E9E'   // 灰色
  }), []);

  const fillColor = memory.color || moodColors[memory.mood] || moodColors.neutral;

  // 飘落动画参数（基于ID，使每片叶子飘落不同）
  const fallDuration = 8 + ((seed % 7) * 1.5); // 8-18秒，缓慢飘落
  const fallDelay = `${(seed % 20) * 0.5}s`; // 0-9.5秒延迟，随机出现
  
  // 随机水平漂移（-100px到100px）
  const driftX = ((seed * 37) % 200) - 100;
  
  // 随机旋转角度（0-720度，多圈旋转）
  const rotation = (seed * 137) % 720;

  return (
    <g
      className="leaf-node"
      transform={`translate(${position.x}, ${position.y})`}
      onMouseEnter={() => {
        setHovered(true);
        onHover && onHover(memory);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => onClick && onClick(memory)}
      style={{ 
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      {/* 飘落动画组 - 包裹整个叶子 */}
      <g 
        style={{
          animation: hovered ? 'none' : `leafFall ${fallDuration}s ease-in-out infinite`,
          animationDelay: fallDelay,
          '--drift-x': `${driftX}px`,
          '--rotation': `${rotation}deg`,
          transformOrigin: 'center center'
        }}
        className={hovered ? 'leaf-hovered' : ''}
      >
        {/* 叶子主体 */}
        <path
          d={leafPath}
          fill={fillColor}
          stroke="#2d5a27"
          strokeWidth="1"
          opacity={hovered ? 0.9 : 0.7}
          transform={`scale(${hovered ? 1.3 : 1})`}
          style={{
            transition: 'all 0.3s ease',
            transformOrigin: 'center',
            filter: hovered ? 'brightness(1.2)' : 'none'
          }}
        />
        
        {/* 叶脉（细节） */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2={height}
          stroke="#1a3d17"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </g>
    </g>
  );
};

export default MemoryLeaf;
