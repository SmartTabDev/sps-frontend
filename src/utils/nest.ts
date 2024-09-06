import _ from "lodash";

export interface Nest<T> {
  [x: string]: Nest<T> | T[];
}

const nest = <T>(data: T[], keys: string[]): Nest<T> => {
  if (!keys.length) return data as any;
  const [first, ...rest] = keys;

  const group = _.groupBy(data, first);
  const result = _.mapValues(group, (value) => nest(value, rest));

  return result;
};

export default nest;
