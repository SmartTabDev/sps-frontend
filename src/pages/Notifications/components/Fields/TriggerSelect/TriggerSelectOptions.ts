export type TriggerOption =
  | {
      name: string;
      value: string;
    }
  | null
  | undefined;

export const TriggerSelectOptions = [
  { name: 'Price jumps by', value: 'jumpsBy' },
  { name: 'Price drops by', value: 'dropsBy' },
  { name: 'Price lower than', value: 'lowerThan' },
  { name: 'Price higher than', value: 'higherThan' },
  { name: 'Any price change by', value: 'anyChange' },
];
