export const weightedAverage = (nums: number[], weights: number[]): number => {
  const [sum, weightSum] = weights.reduce(
    (acc: [number, number], w: number, i: number) => {
      acc[0] += nums[i]! * w;
      acc[1] += w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};
