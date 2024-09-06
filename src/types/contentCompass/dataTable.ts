type ContentCompassRowData = {
  id: number;
  brand: string;
  product: string;
  retailer: string;
  ean: number;
};

export const aggregableKeys = [
  'productListed',
  'packshotMatch',
  'keywords',
  'images',
  'bulletpoints',
  'richContent',
  'video',
  'contentScore',
  'ratings',
  'reviews',
] as const;

type AggregableKeysUnion = (typeof aggregableKeys)[number];

export type ContentCompassRowCurrentValues = Record<
  AggregableKeysUnion,
  number | undefined
>;

export type ContentCompassRowPrevValues = {
  [key in keyof ContentCompassRowCurrentValues as `${key}Prev`]: ContentCompassRowCurrentValues[key];
};

export type ContentCompassRow = ContentCompassRowData &
  ContentCompassRowCurrentValues &
  ContentCompassRowPrevValues;
