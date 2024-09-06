import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
  [key: string]: any;
};

const StyledFormControlLabel = styled(FormControlLabel)`
  background: ${({ theme }) => theme.palette.common.black};
  padding: 0 10px 0 0;
  border-radius: 5px 5px 0px 0px;
  margin: 0;

  span {
    color: ${({ theme }) => theme.palette.common.white};
    text-transform: uppercase;
    font-size: 14px;
    line-height: 16px;
  }
`;

const StyledCheckbox = styled(Checkbox)({
  root: {
    padding: '5px 9px 5px 9px',
  },
});

const FilledCheckbox: React.FC<Props> = ({ ...props }) => (
  <StyledFormControlLabel
    control={<StyledCheckbox {...props as any} />}
    label="primary"
  />
);

export default FilledCheckbox;
