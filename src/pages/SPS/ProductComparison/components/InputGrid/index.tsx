import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { styled } from '@mui/system';
import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
// mui
import Typography from '@mui/material/Typography';
// components
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import SelectAllStateless from 'components/SelectAll/SelectAllStateless';
import Switcher from 'components/Switcher';
import Button from 'components/Button';
import TextButton from 'components/TextButton';
import { QUERY_DATE_FORMAT } from 'components/FormatDate/FormatDate';
// @types
import { ConfigProduct, ConfigRetailer } from 'types/AppConfig';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setDate,
  setInitialForm,
  setSelectedRetailers,
} from 'reducers/productComparison/actions';
import {
  ProductComparisonView,
  DateRange,
} from 'reducers/productComparison/productComparison';
import { ConfigContext } from 'contexts/ConfigContext';
import ProductSelect from './components/ProductSelect';

const InputGridWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 300px));
  gap: 25px;

  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(auto-fill, minmax(0, 300px));
  }
`;

const InputName = styled(Typography)`
  font-size: 16px;
  line-height: 40px;
  color: ${({ theme }) => theme.palette.common.black};
  font-weight: 600;
`;

const InputNameFiller = styled('div')`
  height: 40px;
`;

const InputFiller = styled('div')`
  height: 45px;
  display: flex;
  align-items: center;
`;

const StyledButtons = styled('div')`
  position: absolute;
  right: 25px;
  bottom: 30px;

  button:first-of-type {
    margin-right: 40px;
    color: ${({ theme }) => theme.palette.grey[400]};
  }
`;

const StyledSwitcherOption = styled('span')`
  font-weight: 600;
  margin-left: 25px;
`;

type Props = {
  onButtonClick: () => void;
  cb: (value: boolean) => void;
  isDisabled: boolean;
  setGroupBy: (option: ProductComparisonView) => void;
};

const InputGrid: React.FC<Props> = ({
  onButtonClick,
  cb,
  isDisabled,
  setGroupBy,
}) => {
  const dispatch = useDispatch();
  const { configId } = useContext(ConfigContext);
  const [filteredProducts, setFilteredProducts] = useState<ConfigProduct[]>([]);
  const selectedRetailers = useSelector(
    (state: RootState) => state.productComparison.selectedRetailers
  );
  const { showBy, showByOptions, selectedProducts } = useSelector(
    (state: RootState) => state.productComparison
  );
  const startDate = useSelector(
    (state: RootState) => state.productComparison.startDate
  );
  const endDate = useSelector(
    (state: RootState) => state.productComparison.endDate
  );

  const products = useSelector((state: RootState) => state.config.sps.products);

  const retailers = useSelector(
    (state: RootState) => state.config.sps.retailers
  );

  const handleRetailerChange = useCallback(
    (value) => dispatch(setSelectedRetailers(value)),
    [dispatch]
  );

  const SelectAll = useMemo(
    () => ({
      name: 'All',
      url: '',
      id: -1,
    }),
    []
  );

  const getFilteredProducts = useCallback((products: ConfigProduct[]) => {
    const result = uniqBy(products, 'name');
    const sortedResult = result.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();

      if (textA < textB) return -1;

      return textA > textB ? 1 : 0;
    });

    return sortedResult;
  }, []);

  const resetForm = useCallback(() => {
    dispatch(setInitialForm());
    setFilteredProducts([]);
  }, [dispatch]);

  const filterSelected = useCallback(
    (p: ConfigProduct) =>
      !selectedProducts.filter(Boolean).find((sp) => sp.id === p.id),
    [selectedProducts]
  );

  useEffect(() => {
    const list = getFilteredProducts(products);
    setFilteredProducts(list);
  }, [products]);

  // reset on config change
  useEffect(() => {
    if (configId) {
      resetForm();
    }

    return () => {
      resetForm();
    };
  }, [configId]);

  return (
    <InputGridWrapper>
      <div>
        <InputName>Timeframe</InputName>
        {startDate || endDate ? (
          <>
            <DateRangePicker
              setDateRange={(dateRange: DateRange) => {
                dispatch(setDate(dateRange));
              }}
              startDate={moment(startDate, QUERY_DATE_FORMAT)}
              endDate={moment(endDate, QUERY_DATE_FORMAT)}
            />
          </>
        ) : null}
      </div>
      <div>
        <InputName>Products</InputName>
        <ProductSelect
          index={0}
          filteredProducts={filteredProducts.filter(filterSelected)}
          value={selectedProducts[0]}
        />
        <ProductSelect
          index={1}
          filteredProducts={filteredProducts.filter(filterSelected)}
          value={selectedProducts[1]}
        />
        <ProductSelect
          index={2}
          filteredProducts={filteredProducts.filter(filterSelected)}
          value={selectedProducts[2]}
        />
      </div>
      {retailers.length ? (
        <div>
          <InputName>Retailers</InputName>
          <SelectAllStateless<ConfigRetailer, false, false>
            getOptionLabel={(option) => option.name}
            options={selectedRetailers}
            initialOptions={retailers}
            selectAll={SelectAll}
            label="Select retailer"
            handleChange={handleRetailerChange}
            limitTags={1}
          />
        </div>
      ) : null}
      <div>
        <InputNameFiller />
        <InputFiller>
          <Switcher<ProductComparisonView>
            active={showBy}
            options={showByOptions}
            action={(option) => setGroupBy(option)}
            title={<StyledSwitcherOption>Show by:</StyledSwitcherOption>}
          />
        </InputFiller>
      </div>
      <StyledButtons>
        <TextButton onClick={() => cb(false)}>Cancel</TextButton>
        <Button
          disabled={isDisabled}
          onClick={() => {
            cb(false);
            onButtonClick();
          }}
          size="medium"
        >
          Compare
        </Button>
      </StyledButtons>
    </InputGridWrapper>
  );
};

export default InputGrid;
