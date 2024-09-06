import React, { useCallback } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

type Props = {
  value: boolean;
  setValue: (val: boolean) => void;
  label?: string;
  margin?: string;
};

const Active: React.FC<Props> = ({
  value,
  setValue,
  label = 'Active',
  margin,
}) => {
  const handleChange = useCallback(
    (_e, checked) => {
      setValue(checked);
    },
    [setValue]
  );

  return (
    <FormGroup style={{ margin }}>
      <FormControlLabel
        control={<Switch color="secondary" />}
        label={label}
        onChange={handleChange}
        checked={value}
      />
    </FormGroup>
  );
};

export default Active;
