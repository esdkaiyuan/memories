// 心情选项
export const MOODS = [
  { value: 'happy', label: '开心', color: '#FFD700' },
  { value: 'sad', label: '难过', color: '#87CEEB' },
  { value: 'excited', label: '兴奋', color: '#FF6347' },
  { value: 'calm', label: '平静', color: '#98FB98' },
  { value: 'neutral', label: '中性', color: '#D3D3D3' }
];

// 类别选项
export const CATEGORIES = [
  { value: 'travel', label: '旅行' },
  { value: 'family', label: '家庭' },
  { value: 'work', label: '工作' },
  { value: 'milestone', label: '里程碑' },
  { value: 'friendship', label: '友情' },
  { value: 'general', label: '其他' }
];

// 默认颜色
export const DEFAULT_COLORS = {
  travel: '#2196F3',
  family: '#E91E63',
  work: '#607D8B',
  milestone: '#FF9800',
  friendship: '#673AB7',
  general: '#4CAF50'
};

// 3D 场景配置
export const SCENE_CONFIG = {
  pillar: {
    radius: 0.5,
    height: 10,
    segments: 32
  },
  vine: {
    radius: 0.03,
    tubularSegments: 200,
    radialSegments: 8,
    turns: 3
  },
  node: {
    radius: 0.12,
    widthSegments: 8,
    heightSegments: 8
  },
  camera: {
    position: [5, 5, 5],
    fov: 50
  }
};