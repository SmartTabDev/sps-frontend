import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

export function RememberMe({ value, disabled, onChange }: Props): JSX.Element {
  return (
    <FormControlLabel
      control={(
        <Checkbox
          color="primary"
          checked={value}
          name="rememberUser"
          onChange={() => onChange(!value)}
          disabled={disabled}
        />
      )}
      label="Remember me"
    />
  );
}
