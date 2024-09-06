// hand-picked colors
const colors = [
  '#F2E14C',
  '#F2724A',
  '#98020B',
  '#4BD9EC',
  '#286DCB',
  '#9B51E0',
  '#00CDC1',
  '#27AE60',
  '#7028CB',
  '#D04850',
  '#2D9CDB',
  '#E2A5F9',
  '#F2994A',
  '#BB6BD9',
  '#006B2E',
  '#01B9D1',
  '#F2C94C',
  '#4BECE2',
  '#6FCF97',
  '#199771',
  '#98338E',
  '#487BB8',
  '#532500',
  '#DBFF00',
  '#00FF19',
  '#FF00C7',
  '#92B0FF',
  '#00F0FF',
  '#FFC875',
  '#75FFCD',
];

const getRandomColor = (index: number): string => {
  const color = colors[index];
  return color || '#8e7847';
};

export default getRandomColor;
