import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { KeywordProduct } from 'types/KeywordProduct';
import { DetailsTable } from '../components/DetailsTable';
import InfoBar from '../components/InfoBar';
import { matchMany, matchName } from '../utils/matchName';

type Props = {
  matchedProducts: any[];
};

const SearchShareDetails: React.FC<Props> = ({ matchedProducts = [] }) => {
  const [filteredProducts, setFilteredProducts] = useState<KeywordProduct[]>(
    []
  );

  const {
    searchShareDetails,
    searchShareDetails: products,
    searchShareLoading,
    selectedKeywordId,
    selectedRetailerId,
  } = useSelector((state: RootState) => state.searchShare);

  const {
    kpi: { searchRetailers, keywords = [], keywordLinks },
  } = useSelector((state: RootState) => state.config);

  let searchTerm;
  let retailer;
  let url;

  if (searchShareDetails.length > 0) {
    searchTerm = matchName(keywords, 'id', selectedKeywordId, 'name');
    retailer = matchName(searchRetailers, 'id', selectedRetailerId, 'name');

    if (keywordLinks) {
      url = matchMany({
        items: keywordLinks,
        condictions: [
          {
            key: 'retailer.id',
            value: selectedRetailerId,
          },
          {
            key: 'name',
            value: searchTerm,
          },
        ],
        resultKey: 'url',
      });
    }
  }

  useEffect(() => {
    const currentProducts = products.filter(
      (p) =>
        p.retailerid === selectedRetailerId && p.keywordid === selectedKeywordId
    );

    setFilteredProducts(currentProducts);
  }, [products, selectedRetailerId, selectedKeywordId]);

  return (
    <>
      <InfoBar
        filterName="Search term"
        filterValue={searchTerm}
        retailer={retailer}
        result={`${matchedProducts.length || 0} products on the
        first page`}
        url={url}
      />
      <DetailsTable<KeywordProduct>
        isLoading={searchShareLoading}
        filteredProducts={filteredProducts}
        getChartFor="KeywordProduct"
        clientPositions={matchedProducts.map((mp: any) => mp.position - 1)}
      />
    </>
  );
};

export default SearchShareDetails;
