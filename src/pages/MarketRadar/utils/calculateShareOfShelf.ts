export interface ShareOfShelf {
  formattedRetailer: string;
  formattedCategory: string;
  brand: string;
  category: string;
  retailer: string;
  value: number;
}

export function calculateShareOfShelf(shares: ShareOfShelf[]): {
  retailer: string;
  category: string;
  brand: string;
  value: number;
  share: number;
}[] {
  // Group shares by retailer, category, and brand
  const groupedShares = shares.reduce((acc, curr) => {
    const key = `${curr.retailer}-${curr.category}-${curr.brand}`;
    if (!acc[key]) {
      acc[key] = {
        retailer: curr.retailer,
        category: curr.category,
        brand: curr.brand,
        value: 0,
      };
    }
    acc[key]!.value += curr.value;
    return acc;
  }, {} as Record<string, { retailer: string; category: string; brand: string; value: number }>);

  // Calculate total value for each retailer-category pair
  const totalByRetailerCategory = Object.values(groupedShares).reduce(
    (acc, curr) => {
      const key = `${curr.retailer}-${curr.category}`;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += curr.value;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate share for each retailer-category-brand combination
  return Object.values(groupedShares).map((groupedShare) => {
    const key = `${groupedShare.retailer}-${groupedShare.category}`;
    const total = totalByRetailerCategory[key]!;
    const share = (groupedShare.value / total) * 100;

    return {
      ...groupedShare,
      share,
    };
  });
}
