import get from 'lodash/get';

export const matchName = (items: any[], itemKey: string, value: any, resultKey: string): string => {
  const item = items.find((p) => get(p, itemKey) === value);
  if (item) {
    return get(item, resultKey);
  }

  return '';
};

type Condiction = {
  key: string, value: any
}

type MatchMany = {
  items: any[];
  condictions: [Condiction, Condiction];
  resultKey: string;
}

// simple function to pass two conditions, and return first item that match
export const matchMany = (args: MatchMany): string => {
  const { items, condictions, resultKey } = args;
  const [first, second] = condictions;

  const filteredFirst = items.filter((p) => get(p, first.key) === first.value);
  const filteredSecond = filteredFirst.filter((p) => get(p, second.key) === second.value);

  const item = filteredSecond[0];

  if (item) {
    return get(item, resultKey);
  }

  return '';
};
