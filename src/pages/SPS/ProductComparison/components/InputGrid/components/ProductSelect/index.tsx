import React from 'react';
import { styled } from '@mui/system';
import Select from 'components/Select';
import { setSelectedProducts } from 'reducers/productComparison/actions';
import { ConfigProduct } from 'types/AppConfig';
import { useDispatch } from 'react-redux';

const StyledSelectWrapper = styled('div')`
  min-width: 300px;
  margin-bottom: 24px;
`;

type OptionProps = { $nameLength: number };

const StyledSelectRow = styled('span', {
  shouldForwardProp: (props) => props !== '$nameLength',
})<OptionProps>`
  padding-left: 6px;
  line-height: 16px;
  ${({ $nameLength }) =>
    $nameLength > 70 && 'font-size: 12px; line-height:14px;'}
`;

const renderOption = (index: number, props: any, option: ConfigProduct) => (
  <li {...props} key={`${props.key}-${index}`}>
    <StyledSelectRow $nameLength={option.name.length}>
      {option.name}
    </StyledSelectRow>
  </li>
);

type Props = {
  filteredProducts: ConfigProduct[];
  value?: ConfigProduct;
  index: number;
};

const ProductSelect: React.FC<Props> = ({
  filteredProducts,
  value = '',
  index,
}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <StyledSelectWrapper>
      <Select<ConfigProduct, false, false, true>
        options={filteredProducts}
        disableCloseOnSelect
        getOptionLabel={(option) =>
          typeof option !== 'string' ? option.name : option
        }
        label="Type in product"
        renderOption={(props, option) => renderOption(index, props, option)}
        freeSolo
        onChange={(_, val) =>
          dispatch(setSelectedProducts({ value: val, index }))
        }
        value={value}
        blurOnSelect
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        variant="outlined"
      />
    </StyledSelectWrapper>
  );
};

export default ProductSelect;
