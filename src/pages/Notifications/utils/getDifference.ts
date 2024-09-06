import differenceBy from 'lodash/differenceBy';

type Difference<T> = {
  added: T[];
  removed: T[];
};

const getDifference = <T>(currentState: T[], oldState: T[], key: keyof T): Difference<T> => {
  const added = differenceBy<T, T>(currentState, oldState, (data) => data[key]);
  const removed = differenceBy<T, T>(oldState, currentState, (data) => data[key]);

  return {
    added,
    removed,
  };
};

export default getDifference;
