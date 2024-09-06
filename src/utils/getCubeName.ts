export type CubeTableName =
  | 'Variants'
  | 'Runs'
  | 'Products'
  | 'Keyword_Products'
  | 'Category_Products'
  | 'Features'
  | 'ProductFeatures'
  | 'Offers'
  | 'PriceChanges'
  | 'Sellers'
  | 'RRP_Variants';

const getCubeName = (
  tableName: CubeTableName,
  project:
    | 'kpi'
    | 'prm'
    | 'ceneo'
    | 'idealo'
    | 'allegro'
    | 'shopee'
    | 'aggregations'
    | 'oam_aggregations'
    | '' = '',
  withoutStage = false
): string => {
  const { REACT_APP_CUBE_JS_STAGE = 'prod' } = process.env;

  return `${tableName}${project ? `_${project}` : ''}${
    withoutStage ? '' : `_${REACT_APP_CUBE_JS_STAGE}`
  }`;
};

export default getCubeName;
