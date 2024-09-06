import React, { useMemo } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import RadioButton from 'components/RadioButton';
import { AlertType } from 'types/Notification';
import { ProductLink } from 'types/AppConfig';
import { useSelector } from 'react-redux';
import useExpandedFilters from 'hooks/useExpandedFilters';
import { UseAlertForm } from 'pages/Notifications/hooks/useAlertForm';
import { styled } from '@mui/system';
import SelectedProducts from '../../components/NotificationForm/components/Products/SelectedProducts/SelectedProducts';
import SelectedCategories from '../../components/NotificationForm/components/SelectedCategories/SelectedCategories';
import AllProducts from '../../components/NotificationForm/components/Products/AllProducts/AllProducts';
import {
  NotificationProductFilters,
  notificationProductFiltersInitialState,
} from '../../components/NotificationForm/components/Products/SelectedProducts/Filters';
import { UseCustomCategoriesFilters } from '../../hooks/useCustomCategoriesFilters';

type ProductsProps = {
  productLinks: ProductLink[];
  alertForm: UseAlertForm;
  customCategoriesFilters: UseCustomCategoriesFilters;
};

const StyledSelectsWrapper = styled('div')`
  background: ${({ theme }) => theme.palette.common.white};
  box-shadow: 0px 4px 4px rgba(82, 95, 129, 0.25),
    0px -1px 6px rgba(82, 95, 129, 0.15);
  border-radius: 10px;
  padding: 15px 20px 17px 20px;
`;

const Products: React.FC<ProductsProps> = ({
  productLinks,
  alertForm,
  customCategoriesFilters,
}) => {
  const { state: alertState, handleSet, cleanProductsValidation } = alertForm;
  const { alertType, variantLinks } = alertState.fields;

  // config
  const retailers = useSelector((state) => state.config.sps.retailers);
  const categories = useSelector((state) => state.config.sps.categories);
  const brands = useSelector((state) => state.config.sps.brands);

  // filters
  const { dispatch: filterDispatch, state: filterState } =
    useExpandedFilters<NotificationProductFilters>(
      notificationProductFiltersInitialState
    );

  const filteredProductLinks = useMemo(() => {
    const { selectedBrands, selectedCategories, search } = filterState;
    const brandNames = selectedBrands.map((r) => r.name);
    const categoryNames = selectedCategories.map((r) => r.name);
    const retailerNames = filterState.selectedRetailers.map((r) => r.name);

    const filtered = productLinks.filter((productLink) => {
      let getProduct = true;

      if (retailerNames.length && productLink.retailer) {
        getProduct = retailerNames.includes(productLink.retailer.name);
      }

      if (brandNames.length && getProduct === true && productLink.brand) {
        getProduct = brandNames.includes(productLink.brand.name);
      }

      if (categoryNames.length && getProduct === true && productLink.category) {
        getProduct = categoryNames.includes(productLink.category.name);
      }

      if (search.length && getProduct === true && productLink.product) {
        getProduct = productLink.product.name
          .toLowerCase()
          .includes(search.toLowerCase());
      }

      return getProduct;
    });

    return filtered;
  }, [productLinks, filterState]);

  return (
    <>
      <RadioGroup
        value={alertType}
        row
        sx={{
          marginBottom: '18px',
          justifyContent: 'center',
          width: '100%',
        }}
        onChange={(e) => {
          handleSet({
            key: 'alertType',
            value: (e.target as HTMLInputElement).value as AlertType,
          });
          cleanProductsValidation();
        }}
      >
        <RadioButton
          label="Track all my products"
          value="all"
          sx={{ mr: '80px' }}
        />
        <RadioButton
          label="Track selected products"
          value="product"
          sx={{ mr: '80px' }}
        />
        <RadioButton label="Custom categories" value="category" />
      </RadioGroup>
      <StyledSelectsWrapper>
        {alertType === 'category' && (
          <SelectedCategories
            retailers={retailers}
            categories={categories}
            brands={brands}
            alertForm={alertForm}
            customCategoriesFilters={customCategoriesFilters}
          />
        )}
        {alertType === 'product' && (
          <SelectedProducts
            products={filteredProductLinks}
            retailers={retailers}
            categories={categories}
            brands={brands}
            filterDispatch={filterDispatch}
            filterState={filterState}
            selectedProducts={variantLinks}
            setSelectedProducts={(value) =>
              handleSet({ key: 'variantLinks', value })
            }
          />
        )}
        {alertType === 'all' && <AllProducts products={productLinks} />}
      </StyledSelectsWrapper>
    </>
  );
};

export default Products;
