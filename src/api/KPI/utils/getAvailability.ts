import { AvailabilityStatus } from "reducers/productAvailability";
import { Product } from "types/Product";

type AvailabilityProduct = Product & { count: number };
const getAvailability = (data: AvailabilityProduct[]) => {
  const inStock = data.find(({ available }) => available === true)?.count || 0;
  const outOfStock =
    data.find(
      ({ available, ispageavailable }) =>
        available === false && ispageavailable === true
    )?.count || 0;
  const voidProducts =
    data.find(({ ispageavailable }) => ispageavailable === false)?.count || 0;
  const all = inStock + outOfStock + voidProducts;

  return {
    inStock,
    outOfStock,
    void: voidProducts,
    all,
  };
};

export const getAvailabilityStatus = ({
  available,
  ispageavailable,
}: Product): AvailabilityStatus => {
  const inStock = Boolean(available);
  const outOfStock = available === false && ispageavailable === true;

  if (inStock) {
    return "inStock";
  }

  if (outOfStock) {
    return "outOfStock";
  }

  return "void";
};

export default getAvailability;
