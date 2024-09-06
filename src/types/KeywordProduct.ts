type CubeProduct<T> = {
  [K in keyof T as `Keyword_Products.${K & string}`]: T[K];
};

export type KeywordProduct = {
  available: boolean;
  createdat: string;
  imgurl: string;
  keywordid: number;
  keywordname: string;
  keywordurl: string;
  name: string;
  oldprice: number;
  position: number;
  price: number;
  retailerid: number;
  retailername: string;
  rundate: string;
  url: string;
  producturl: string;
};

export type CubeKeywordProduct = CubeProduct<KeywordProduct>;

export type KeywordProductDimensions = keyof KeywordProduct;
