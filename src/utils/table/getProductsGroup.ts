import { Product } from "types/Product";

const getProductsGroup = (products: Product[]) => {
  const groupArray: { id: number }[] = [];
  products.forEach(({ productid: id }) => {
    if (!groupArray.some((el) => el.id === id)) {
      groupArray.push({ id });
    }
  });

  return groupArray;
};

export default getProductsGroup;
