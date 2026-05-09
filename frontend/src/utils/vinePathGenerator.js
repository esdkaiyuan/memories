/**
 * 2D SVG藤蔓路径生成工具
 * 生成手绘风格的SVG路径，模拟自然藤蔓生长
 */

/**
 * 确定性伪随机数生成器（基于种子）
 * @param {number} seed - 种子值
 * @returns {number} 0-1之间的随机数
 */
const seededRandom = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 10000;
  return x - Math.floor(x);
};

/**
 * 生成手绘风格的藤蔓路径
 * @param {Array} memories - 回忆数组
 * @param {number} width - SVG宽度
 * @param {number} height - SVG高度
 * @returns {string} SVG path数据
 */
export const generateVinePath = (memories, width, height) => {
  if (!memories || memories.length === 0) {
    return '';
  }

  // 分段数基于记忆数量
  const segments = Math.max(10, memories.length * 2);
  const segmentHeight = height / segments;
  
  // 起点：底部中心
  let path = `M ${width / 2} ${height}`;
  
  for (let i = 1; i <= segments; i++) {
    const y = height - (i * segmentHeight);
    
    // 基础X位置（正弦波形成左右摆动）
    const baseX = width / 2 + Math.sin(i * 0.5) * (width * 0.3);
    
    // 添加手绘风格的随机偏移（±10px）- 使用确定性随机
    const noiseX = (seededRandom(i) - 0.5) * 20;
    const x = baseX + noiseX;
    
    // 计算控制点（使曲线更平滑自然）- 使用确定性随机
    const prevY = height - ((i - 1) * segmentHeight);
    const cp1x = baseX + (seededRandom(i * 2) - 0.5) * 30;
    const cp1y = prevY + segmentHeight * 0.5;
    const cp2x = x + (seededRandom(i * 3) - 0.5) * 30;
    const cp2y = y - segmentHeight * 0.5;
    
    // 添加贝塞尔曲线段
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
  }
  
  return path;
};

/**
 * 计算叶子在路径上的位置
 * @param {SVGPathElement} pathElement - SVG路径元素
 * @param {Array} memories - 回忆数组
 * @returns {Array} 叶子位置数组 [{x, y, memory}]
 */
export const calculateLeafPositions = (pathElement, memories) => {
  if (!pathElement || !memories || memories.length === 0) {
    return [];
  }

  const positions = [];
  const totalLength = pathElement.getTotalLength();
  
  // 验证路径长度
  if (totalLength === 0) {
    console.warn('Path length is 0, cannot calculate leaf positions');
    return [];
  }
  
  memories.forEach((memory, index) => {
    // 按时间顺序均匀分布在路径上
    const t = (index + 1) / (memories.length + 1);
    const point = pathElement.getPointAtLength(totalLength * t);
    
    // 添加轻微随机偏移，使叶子不完全在路径上 - 使用确定性随机
    const offsetX = (seededRandom(memory.id * 7) - 0.5) * 30; // ±15px
    const offsetY = (seededRandom(memory.id * 11) - 0.5) * 20; // ±10px
    
    positions.push({
      x: point.x + offsetX,
      y: point.y + offsetY,
      memory
    });
  });
  
  return positions;
};

/**
 * 获取路径总长度
 * @param {SVGPathElement} pathElement - SVG路径元素
 * @returns {number} 路径长度
 */
export const getPathLength = (pathElement) => {
  if (!pathElement) return 0;
  return pathElement.getTotalLength();
};
