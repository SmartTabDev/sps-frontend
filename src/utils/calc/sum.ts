export function sum(values: number[]): number {
  return values.reduce((acc: number, curr: number) => acc + curr, 0);
}
