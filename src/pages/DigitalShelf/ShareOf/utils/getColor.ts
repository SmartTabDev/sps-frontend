const colors = [
  {
    min: 0, max: 24.99, background: 'rgba(115, 165, 231, 0.25)',
  },
  {
    min: 25, max: 49.99, background: 'rgba(115, 165, 231, 0.45)',
  },
  {
    min: 50, max: 74.99, background: 'rgba(115, 165, 231, 0.65)',
  },
  {
    min: 75, max: 100, background: 'rgba(115, 165, 231, 0.9)',
  },
];

// eslint-disable-next-line max-len
export const getColor = (value: number | undefined): { background: string, color: string } | null => {
  if (value !== undefined) {
    const data = colors.find(({ min, max }) => value >= min && value <= max);

    if (data) {
      return {
        background: data.background,
        color: '#3B455E',
      };
    }
  }

  return null;
};
