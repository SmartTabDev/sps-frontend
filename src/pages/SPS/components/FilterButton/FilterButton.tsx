import React from 'react';
import { styled } from '@mui/system';
import ButtonBase from '@mui/material/ButtonBase';
import FilterListIcon from '@mui/icons-material/FilterList';

const Button = styled(ButtonBase)`
  width: 32px;
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  left: -32px;
  top: 32px;
  transform: translateY(-50%);
  height: 62px;
  box-shadow: 0px 4px 9px rgba(82, 95, 129, 0.35);
  clip-path: inset(0px 0px -10px -15px);
  background: ${({ theme }) => theme.palette.common.white};
`;

type Props = {
  onClick: () => void;
};

const FilterButton: React.FC<Props> = ({ onClick }) => (
  <Button onClick={onClick} disableRipple>
    <FilterListIcon />
  </Button>
);

export default FilterButton;
