import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

type Props = {
  value: number | string | null;
  setValue: (trigger: number | string | null) => void;
  max?: number;
  min?: number;
  disabled?: boolean;
  error: boolean;
};

const TriggerValue: React.FC<Props> = ({
  value,
  setValue,
  min,
  max,
  disabled,
  error = false,
}) => {
  const handleChange = useCallback(
    (event) => {
      let val = Number(event.target.value);
      if (max && val > max) val = max;
      if (min && val < min) val = min;

      if (val === 0) {
        setValue(null);
      } else {
        setValue(val);
      }
    },
    [setValue, min, max],
  );

  return (
    <FormControl variant="outlined" fullWidth>
      <TextField
        label="Value"
        id="value"
        fullWidth
        size="small"
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        error={error}
        sx={{ marginTop: '8px' }}
        inputProps={{
          ...(max ? { max } : {}),
          ...(min ? { min } : {}),
          type: 'number',
        }}
        variant="outlined"
      />
    </FormControl>
  );
};

export default TriggerValue;
