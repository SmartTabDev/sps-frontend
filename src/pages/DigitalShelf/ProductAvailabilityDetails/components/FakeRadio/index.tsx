import React from 'react';
import { styled } from '@mui/system';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const StyledIconWrapper = styled('div')`
  color: ${({ theme }) => theme.palette.primary.main};

  svg {
    font-size: 20px;
  }
`;
const FakeRadio: React.FC<{ active: boolean }> = ({ active }) => (
  <StyledIconWrapper>
    {active ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
  </StyledIconWrapper>
);

export default FakeRadio;
