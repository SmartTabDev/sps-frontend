import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CategoryProduct } from 'types/CategoryProduct';
import { DetailsTable } from '../components/DetailsTable';
import InfoBar from '../components/InfoBar';
import { matchMany, matchName } from '../utils/matchName';

type Props = {
  matchedProducts: any[];
};

const CategoryShareDetails: React.FC<Props> = ({ matchedProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState<CategoryProduct[]>(
    []
  );

  const {
    selectedCategoryId,
    selectedRetailerId,
    categoryShareDetails,
    categoryShareLoading,
  } = useSelector((state: RootState) => state.categoryShare);

  const {
    kpi: {
      categoryRetailers,
      categoryLinksCategories: categories = [],
      categoryLinks,
    },
  } = useSelector((state: RootState) => state.config);

  useEffect(() => {
    const currentProducts = categoryShareDetails.filter(
      (p) =>
        p.retailerid === selectedRetailerId &&
        p.categoryid === selectedCategoryId
    );
    setFilteredProducts(currentProducts);
  }, [categoryShareDetails, selectedRetailerId, selectedCategoryId]);

  let searchTerm;
  let retailer;
  let url;

  if (categoryShareDetails.length > 0) {
    searchTerm = matchName(categories, 'id', selectedCategoryId, 'name');
    retailer = matchName(categoryRetailers, 'id', selectedRetailerId, 'name');

    if (categoryLinks) {
      url = matchMany({
        items: categoryLinks,
        condictions: [
          {
            key: 'retailer.id',
            value: selectedRetailerId,
          },
          {
            key: 'category.id',
            value: selectedCategoryId,
          },
        ],
        resultKey: 'url',
      });
    }
  }

  return (
    <>
      <InfoBar
        filterName="Category"
        filterValue={searchTerm}
        retailer={retailer}
        result={`${matchedProducts.length || 0} products on the
        first page`}
        url={url}
      />
      <DetailsTable
        isLoading={categoryShareLoading}
        filteredProducts={filteredProducts}
        getChartFor="CategoryProduct"
        clientPositions={matchedProducts.map((mp: any) => mp.position - 1)}
      />
    </>
  );
};

export default CategoryShareDetails;
