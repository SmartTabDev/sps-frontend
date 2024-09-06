import React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
  [key: string]: any;
};

const RadioButton: React.FC<Props> = ({ label, ...props }) => (
  <FormControlLabel
    value="top"
    control={<Radio color="primary" />}
    labelPlacement="end"
    label={label}
    {...props}
  />
);

export default RadioButton;
