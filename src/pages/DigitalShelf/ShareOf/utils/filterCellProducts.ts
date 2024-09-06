const filterCellProducts = ({
  items,
  searchOfKey,
  searchOfValue,
  retailerId,
}: {
  items: any[];
  searchOfKey: "categoryid" | "keywordid";
  searchOfValue?: number;
  retailerId?: number;
}) =>
  items.filter(
    (item) =>
      item[searchOfKey] === searchOfValue && item.retailerid === retailerId
  );

export default filterCellProducts;
