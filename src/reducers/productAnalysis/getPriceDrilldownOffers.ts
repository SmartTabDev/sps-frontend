import getDimensionKeys from 'utils/cube/getDimensionKeys';
import uniq from 'lodash/uniq';

const getPriceDrilldownOffers = (details: any, range: any) => {
  const detailsData = details.rawData().map(getDimensionKeys);
  const rangeData = range.rawData().map(getDimensionKeys);
  const dates = uniq(detailsData.map((item: any) => item.rundate));
  const lastRun = dates.shift();

  const currentDetails = detailsData.filter((d: any) => d.rundate === lastRun);

  const drilldownOffers = currentDetails.map((item: any) => {
    const rangeDetail = rangeData.find(
      (rangeItem: any) => rangeItem.retailername === item.retailername
    );

    let minPrice = 0;
    let maxPrice = 0;

    if (rangeDetail) {
      minPrice = rangeDetail.minPrice;
      maxPrice = rangeDetail.maxPrice;
    }

    return {
      productName: item.pageProductName,
      goToShopUrl: item.url,
      available: item.available,
      price: item.price,
      retailer: item.retailername,
      minPrice,
      maxPrice,
    };
  });

  return drilldownOffers;
};

export default getPriceDrilldownOffers;
