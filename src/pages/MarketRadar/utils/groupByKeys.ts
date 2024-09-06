import { avg } from 'utils/calc/avg';
import { sum } from 'utils/calc/sum';
import { weightedAverage } from 'utils/calc/weightedAverage';

type Keys<T> = (keyof T)[];
export type GroupByKeyValueMap = { [key: string]: number };
export type GroupByKeysCalc = 'sum' | 'avg' | 'weightedAvg';

export function groupByKeys<T extends { value: number; weight?: number }>(
  data: T[],
  keys: Keys<T>,
  calc: GroupByKeysCalc = 'sum'
): GroupByKeyValueMap {
  const valueByKey: GroupByKeyValueMap = {};

  // Map to store the values to calculate for each key.
  const valuesToCalc = new Map<
    string,
    { values: number[]; weights: number[] }
  >();

  data.forEach((item) => {
    const key = keys.map((k) => item[k]).join('-');

    // Add the value and weight to the arrays of values and weights for the key, or create them if they don't exist.
    if (valuesToCalc.has(key)) {
      const { values, weights } = valuesToCalc.get(key) as {
        values: number[];
        weights: number[];
      };
      values.push(item.value);
      weights.push(item.weight || 1);
    } else {
      valuesToCalc.set(key, {
        values: [item.value],
        weights: [item.weight || 1],
      });
    }
  });

  // Calculations for each key and add it to the result object.
  valuesToCalc.forEach((vtc, vtck) => {
    switch (calc) {
      case 'sum':
        valueByKey[vtck] = sum(vtc.values);
        break;
      case 'avg':
        valueByKey[vtck] = avg(vtc.values);
        break;
      case 'weightedAvg':
        valueByKey[vtck] = weightedAverage(vtc.values, vtc.weights);
        break;
      default:
        throw new Error(`Unsupported calculation method: ${calc}`);
    }
  });

  return valueByKey;
}
