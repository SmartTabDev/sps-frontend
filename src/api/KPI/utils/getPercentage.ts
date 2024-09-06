const getPercentage = (all: number, value: number) => {
  return Math.round((value / all) * 100);
};

export default getPercentage;
