import React from 'react';
import ActionSearchField from 'components/ActionSearchField/ActionSearchField';
import { styled } from '@mui/system';

const StyledSearchWrapper = styled('div')`
  display: flex;
  margin-left: auto;
`;

type Props = {
  onChange: (val: any) => void;
  onSubmit: (val: any) => void;
  onClear: () => void;
  value: string;
  isDisabled: boolean;
};

const SearchFilter: React.FC<Props> = ({
  onChange,
  onSubmit,
  onClear,
  value,
  isDisabled,
}) => {
  return (
    <StyledSearchWrapper>
      <ActionSearchField
        value={value}
        label="Search"
        onChange={onChange}
        onClear={onClear}
        onSubmit={onSubmit}
        id="search"
        disabled={isDisabled}
      />
    </StyledSearchWrapper>
  );
};

export default SearchFilter;
