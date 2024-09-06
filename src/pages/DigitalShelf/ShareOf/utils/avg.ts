const avg = (data: number[] = []) => (data.reduce((a, b) => a + b, 0) / data.length) || 0;

export default avg;
