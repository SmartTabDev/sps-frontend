export type TableView = 'Daily' | 'Hourly';

export type TableTimeframe = {
  from: string;
  to: string;
};

export type Kind = 'date' | 'date-hour' | 'retailer' | 'price' | 'product';

export type Row = (Cell | undefined)[];

export type RowMeta = {
  isFirst?: boolean;
  isLast?: boolean;
  isOdd?: boolean;
};

export interface PriceCell {
  data: string;
  kind: 'price';
  meta: {
    originalDate?: string;
    originalPrice?: string;
    available: boolean | null;
    isNA: boolean;
    isHigher: boolean;
    isLower: boolean;
    isOdd?: boolean;
    regularPrice?: number;
    isHighest?: boolean;
    rrp?: number;
    productid?: number;
    retailerid?: string;
  };
}

export interface ProductCell {
  data: string | number;
  kind: 'product';
  meta?: {
    isFirst?: boolean;
    isLast?: boolean;
    isOdd?: boolean;
    textSize?: string;
    productname?: string;
    productid?: number;
  };
}

export interface RetailerCell {
  data: string | number;
  kind: 'retailer';
  meta?: {
    url?: string;
    isFirst?: boolean;
    isLast?: boolean;
    isOdd?: boolean;
    textSize?: string;
    productname?: string;
    retailername?: string;
    productid?: number;
    retailerid?: string;
  };
}

export interface DateCell {
  data: string;
  kind: 'date';
}

export interface DateHourCell {
  data: string;
  kind: 'date-hour';
  meta: {
    originalDate?: string;
    monthNumber: number;
    day: number;
    isFirstDate: boolean;
    isLastDate: boolean;
  };
}

export type Cell =
  | PriceCell
  | RetailerCell
  | DateCell
  | DateHourCell
  | ProductCell;

export type DataItem = {
  available: boolean;
  createdAt: string;
  date: string;
  price: string;
  productname: string;
  retailername: string;
  regularprice: string;
  url: string;
  formattedDate: string;
  _day: number;
};
