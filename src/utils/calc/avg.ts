export function avg(values: number[]): number {
  return (
    values.reduce((acc: number, curr: number) => acc + curr, 0) / values.length
  );
}
