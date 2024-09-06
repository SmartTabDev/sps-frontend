import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import useTableOrder from 'hooks/useTableOrder';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import { PATH_DASHBOARD } from 'routes/paths';
import DatePicker from 'components/DatePicker/DatePicker';
import { useProductDescriptionQuery } from 'api/hooks/useProductDescriptionQuery';
import { useProductImageStatQuery } from 'api/hooks/useProductImageStatQuery';
import { useProductKeywordsQuery } from 'api/hooks/useProductKeywordsQuery';
import { useProductStatQuery } from 'api/hooks/useProductStatQuery';
import ImagesSection from './components/ImagesSection/ImagesSection';
import ProductInfo from './components/ProductInfo';
import ProductRadarChart from './components/ProductRadarChart/ProductRadarChart';
import {
  productRadarChartDataMock,
  totalReviewsMock,
} from './components/ProductRadarChart/mocks';
import DataTable from './components/DataTable/DataTable';
import ProductKeywordMatch from './components/ProductKeywordsMatch/ProductKeywordsMatch';
import { convertProductImagesStatRetailersToImagesRatingSummaries } from './utils/convertProductImagesStatRetailersToImagesRatingSummaries';
import { loadingRetailerImagesRatingSummaries } from './components/ImagesTable/utils/loadingRetailerImagesRatingSummaries';
import { convertProductKeywordsToKeywords } from './utils/convertProductKeywordsToKeywords';
import { convertProductDescriptionFromApiToProductInfo } from './utils/convertProductDescriptionApiToProductInfo';
import { convertProductStatToContentCompassRows } from './utils/convertProductStatToDataTableRows';
import { loadingDataTableRows } from './components/DataTable/loadingCellRows';

interface ProductDetailsLocationState {
  productDetailsDate: Date;
}

const ProductDetails: React.FC = () => {
  const history = useHistory();
  const location = useLocation<ProductDetailsLocationState>();
  const dashboardPath = PATH_DASHBOARD.contentModule.contentCompass;
  const goToDashboard = () => history.push(dashboardPath, location.state);
  const productDetailsDate = moment(
    location.state?.productDetailsDate || new Date()
  );
  const [date, setDate] = useState(productDetailsDate);
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const { id: productId } = useParams<{ id: string }>();
  const { handleOrderChange, orderType } = useTableOrder('retailer');
  const { data: productDescriptionData } = useProductDescriptionQuery({
    productId,
    date: formattedDate,
  });
  const contentCompassProductInfo =
    convertProductDescriptionFromApiToProductInfo(
      productDescriptionData?.data,
      productId
    );

  const { data: productStatData, isLoading: isLoadingProductStat } =
    useProductStatQuery({ productId, date: formattedDate });
  const dataTableRows = convertProductStatToContentCompassRows(
    productStatData?.data || { retailers: [] }
  );

  const { data: productKeywordsData, isLoading: isProductKeywordsLoading } =
    useProductKeywordsQuery({
      productId,
      date: formattedDate,
    });
  const keywords = convertProductKeywordsToKeywords(
    productKeywordsData?.data.keywords || ''
  );

  const { data: productImageStatData, isLoading: isLoadingProductImageStat } =
    useProductImageStatQuery({
      productId,
      date: formattedDate,
    });
  const retailerImagesRatingSummaries =
    convertProductImagesStatRetailersToImagesRatingSummaries(
      productImageStatData?.data.retailers || []
    );

  const sortedRatingSummaries =
    orderType === 'asc'
      ? retailerImagesRatingSummaries
      : [...retailerImagesRatingSummaries].reverse();

  return (
    <>
      <Page
        onBackButtonClick={goToDashboard}
        title="Product Details"
        NavWrapper={ActionHeader}
        renderNav={() => (
          <Box sx={{ width: 'fit-content' }}>
            <DatePicker
              initialDate={productDetailsDate}
              onDateChangeCallback={setDate}
            />
          </Box>
        )}
        scrollable
      >
        <Stack spacing="24px" alignItems="stretch" mx="24px">
          <Stack direction="row" alignItems="stretch" spacing="13px">
            <Box width="100%">
              <ProductInfo product={contentCompassProductInfo} />
            </Box>
            <Box>
              <ProductRadarChart
                data={productRadarChartDataMock}
                totalReviews={totalReviewsMock}
                isLoading // TODO: loading status from api
              />
            </Box>
          </Stack>
          <DataTable
            loading={isLoadingProductStat}
            rows={isLoadingProductStat ? loadingDataTableRows : dataTableRows}
          />
          <ProductKeywordMatch
            loading={isProductKeywordsLoading}
            keywords={keywords}
            productName={productKeywordsData?.data.name || ''}
          />
          <ImagesSection
            isLoading={isLoadingProductImageStat}
            referenceImageUrls={productImageStatData?.data.refs || []}
            retailerImagesRatingSummaries={
              isLoadingProductImageStat
                ? loadingRetailerImagesRatingSummaries
                : sortedRatingSummaries
            }
            handleImagesTableOrderChange={handleOrderChange}
            imagesTableOrderType={orderType}
          />
        </Stack>
      </Page>
    </>
  );
};

export default ProductDetails;
