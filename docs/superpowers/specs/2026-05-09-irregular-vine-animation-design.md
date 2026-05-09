# 不规则螺旋藤蔓动画重构设计文档

**日期**: 2026-05-09  
**主题**: 将规则圆柱螺旋藤蔓改为不规则螺旋向上，节点改为叶子形状

## 1. 项目概述

### 1.1 目标
将当前回忆录应用的3D藤蔓动画从规则的圆柱螺旋改为不规则螺旋向上生长，同时将记忆节点从几何体改为程序化生成的叶子形状，增强自然感和有机视觉效果。

### 1.2 核心改动
- 重写螺旋曲线算法，实现不规则螺旋（半径变化、旋转密度变化、路径偏移）
- 记忆节点改为随机散布在藤蔓周围
- 节点形状从几何体改为程序化生成的叶子
- 性能优化：降低采样率、预计算曲线

## 2. 技术方案

### 2.1 不规则螺旋算法

#### 2.1.1 IrregularHelixCurve 类
继承自 THREE.Curve，实现以下不规则特性：

**参数设计**：
- `baseRadius`: 基础半径（柱子半径）
- `height`: 柱子高度
- `turns`: 螺旋圈数
- `seed`: 随机种子（保证可重复性）
- `radiusVariation`: 半径变化幅度（默认 0.3，即 ±30%）
- `turnDensityVariation`: 旋转密度变化（默认 0.4）
- `pathOffset`: 路径偏移幅度（默认 0.15）

**算法逻辑**：
```javascript
getPoint(t) {
  // 1. 基础角度
  const baseAngle = this.turns * 2 * Math.PI * t;
  
  // 2. 旋转密度变化（噪声函数）
  const densityNoise = noise2D(t * 5, this.seed) * this.turnDensityVariation;
  const angle = baseAngle * (1 + densityNoise);
  
  // 3. 半径动态变化
  const radiusNoise = noise2D(t * 8, this.seed + 100) * this.radiusVariation;
  const currentRadius = this.baseRadius * (1 + radiusNoise);
  
  // 4. 路径偏移
  const offsetX = noise2D(t * 6, this.seed + 200) * this.pathOffset;
  const offsetZ = noise2D(t * 6, this.seed + 300) * this.pathOffset;
  
  // 5. 最终坐标
  const x = (currentRadius + offsetX) * Math.cos(angle);
  const y = t * this.height - this.height / 2;
  const z = (currentRadius + offsetZ) * Math.sin(angle);
  
  return new THREE.Vector3(x, y, z);
}
```

#### 2.1.2 节点位置计算 - 随机散布

**策略**：
- 基于时间参数 t 获取曲线上的基础位置
- 使用记忆ID作为种子生成确定性随机偏移
- 散布半径：0.3 单位
- 三个维度都有轻微偏移

**实现**：
```javascript
export const calculateMemoryPosition = (memory, memories, pillarRadius, height) => {
  // 1. 计算时间参数 t
  const dates = memories.map(m => new Date(m.memory_date).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const memoryDate = new Date(memory.memory_date).getTime();
  const t = maxDate === minDate ? 0.5 : (memoryDate - minDate) / (maxDate - minDate);
  
  // 2. 创建不规则螺旋曲线
  const turns = Math.max(2, Math.ceil(memories.length / 10));
  const seed = memory.id || 0;
  const curve = new IrregularHelixCurve(pillarRadius, height, turns, seed);
  
  // 3. 获取基础位置
  const basePosition = curve.getPoint(t);
  
  // 4. 添加随机偏移（基于记忆ID的确定性随机）
  const scatterRadius = 0.3;
  const randomAngle = ((memory.id * 7919) % 360) * Math.PI / 180;
  const randomDistance = ((memory.id * 6271) % 100) / 100 * scatterRadius;
  const offsetY = ((memory.id * 5431) % 100) / 100 * 0.1 - 0.05;
  
  return new THREE.Vector3(
    basePosition.x + Math.cos(randomAngle) * randomDistance,
    basePosition.y + offsetY,
    basePosition.z + Math.sin(randomAngle) * randomDistance
  );
};
```

### 2.2 叶子节点设计

#### 2.2.1 MemoryLeaf 组件

**叶子几何体生成**：
- 使用 THREE.Shape 和贝塞尔曲线绘制叶子轮廓
- 使用 ExtrudeGeometry 给叶子添加厚度（0.01）
- 基于记忆ID生成独特的叶子形态（长度、宽度、曲率变化）

**参数范围**：
- 长度：0.15 - 0.25
- 宽度：0.08 - 0.14
- 曲率：0 - 0.3

**颜色映射**：
```javascript
const moodColors = {
  happy: '#7CB342',     // 明亮的绿色
  sad: '#64B5F6',       // 淡蓝色
  excited: '#FF7043',   // 橙红色
  calm: '#AED581',      // 柔和的绿色
  neutral: '#9E9E9E'    // 灰色
};
```

**动画效果**：
- 风吹摆动：`rotation.z = sin(time * 2 + id) * 0.1`
- 悬停放大：scale 从 1 到 1.5
- 悬停发光：emissiveIntensity 动态变化

### 2.3 性能优化

#### 2.3.1 曲线预计算
- 使用 useMemo 缓存曲线对象
- 种子值基于记忆数量，相同数据生成相同路径

#### 2.3.2 降低几何体精度
- TubeGeometry 的 tubularSegments: 200 → 100
- 减少约 50% 顶点数

#### 2.3.3 依赖优化
- Vine 组件的 useEffect 只监听 `memories.length`
- 避免不必要的重新渲染

## 3. 文件修改清单

### 3.1 需要修改的文件

1. **frontend/src/utils/spiralCurve.js**
   - 新增 `IrregularHelixCurve` 类
   - 重写 `calculateMemoryPosition` 函数
   - 保留旧的 `HelixCurve` 类（注释标记为 deprecated）

2. **frontend/src/components/Scene3D/Vine.jsx**
   - 导入 `IrregularHelixCurve`
   - 更新曲线创建逻辑（使用种子值）
   - 降低 tubularSegments（200→100）
   - 优化 useEffect 依赖

3. **frontend/src/components/Scene3D/MemoryLeaf.jsx** (新建)
   - 完全重写的叶子节点组件
   - 程序化生成叶子几何体
   - 实现风吹摆动动画
   - 保留交互逻辑

4. **frontend/src/components/Scene3D/MemoryScene.jsx**
   - 导入 `MemoryLeaf` 替代 `MemoryNode`
   - 更新组件引用

5. **frontend/src/utils/constants.js** (可选)
   - 添加叶子相关配置参数

### 3.2 不需要修改的文件
- Pillar.jsx - 保持动态高度逻辑
- Particles.jsx - 粒子效果
- SceneLighting.jsx - 灯光系统
- MemoryDetail.jsx - 详情弹窗
- 所有后端文件
- 其他 UI 组件

## 4. 实施步骤

### 阶段1：核心算法实现
1. 创建 `IrregularHelixCurve` 类
2. 实现噪声函数驱动的不规则性
3. 测试曲线生成效果

### 阶段2：节点改造
1. 创建 `MemoryLeaf.jsx` 组件
2. 实现叶子几何体生成
3. 添加动画和交互

### 阶段3：集成与优化
1. 更新 `Vine.jsx` 使用新曲线
2. 更新 `MemoryScene.jsx` 引用新组件
3. 性能测试

### 阶段4：测试验证
1. 验证生长动画流畅度
2. 检查节点位置随机性
3. 测试交互功能
4. 不同记忆数量下的表现

## 5. 预期效果

### 5.1 视觉效果
- 藤蔓像真实植物一样自然缠绕向上
- 每片叶子形态各异，随风轻轻摆动
- 整体呈现有机、自然的生长感
- 保持原有的时间轴概念

### 5.2 性能指标
- 顶点数减少约 50%
- 保持 60fps 流畅动画
- 曲线计算只在必要时执行

### 5.3 用户体验
- 保留所有原有交互（悬停、点击、查看详情）
- 视觉更自然、更有生机
- 加载和动画无明显延迟

## 6. 风险与缓解

### 6.1 潜在风险
1. **性能问题**：不规则计算可能影响帧率
   - 缓解：预计算 + 降低采样率
   
2. **叶子形状不理想**：程序化生成可能产生奇怪形状
   - 缓解：调整贝塞尔曲线控制点，增加参数范围测试
   
3. **节点位置过于分散**：随机散布可能导致节点远离藤蔓
   - 缓解：限制散布半径为 0.3，确保节点在可视范围内

### 6.2 回滚方案
- 保留旧的 `HelixCurve` 类和 `MemoryNode` 组件
- 如需回滚，只需恢复 import 语句

## 7. 验收标准

- [ ] 藤蔓呈现不规则螺旋向上生长
- [ ] 节点显示为叶子形状，每片叶子形态独特
- [ ] 节点在藤蔓周围随机散布
- [ ] 生长动画流畅（60fps）
- [ ] 悬停和点击交互正常工作
- [ ] 不同记忆数量下表现正常（5-50个记忆）
- [ ] 页面刷新后节点位置保持一致（确定性随机）
