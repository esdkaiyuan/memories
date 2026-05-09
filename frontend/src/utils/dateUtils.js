import dayjs from 'dayjs';

// 格式化日期
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

// 格式化为中文日期
export const formatDateChinese = (date) => {
  return dayjs(date).format('YYYY年MM月DD日');
};

// 获取相对时间
export const getRelativeTime = (date) => {
  const now = dayjs();
  const target = dayjs(date);
  const diffDays = now.diff(target, 'day');

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  return `${Math.floor(diffDays / 365)}年前`;
};

// 计算两个日期之间的天数
export const daysBetween = (date1, date2) => {
  return Math.abs(dayjs(date1).diff(dayjs(date2), 'day'));
};

// 获取年份
export const getYear = (date) => {
  return dayjs(date).year();
};

// 获取月份
export const getMonth = (date) => {
  return dayjs(date).month() + 1;
};

// 判断是否为同一天
export const isSameDay = (date1, date2) => {
  return dayjs(date1).isSame(dayjs(date2), 'day');
};