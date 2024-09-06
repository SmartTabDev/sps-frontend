type CubeProduct<T> = {
  [K in keyof T as `Category_Products.${K & string}`]: T[K];
};

export type CategoryProduct = {
  available: boolean;
  createdat: string;
  imgurl: string;
  categoryid: number;
  categoryname: string;
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

export type CubeCategoryProduct = CubeProduct<CategoryProduct>;

export type CategoryProductDimensions = keyof CategoryProduct;
