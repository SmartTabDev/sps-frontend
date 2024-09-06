import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Edit from 'pages/Notifications/icons/Edit/Edit';

type Props = {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  error: string | undefined;
  handleValidate: (value: string | undefined) => void;
};

const Description: React.FC<Props> = ({
  value = '',
  setValue,
  error = false,
  handleValidate,
}) => {
  const handleChange = useCallback(
    (event) => {
      const val = event.target.value;
      setValue(val);

      handleValidate(value);
    },
    [setValue, handleValidate, value],
  );

  const handleBlur = useCallback(() => {
    handleValidate(value);
  }, [value, handleValidate]);

  return (
    <FormControl variant="filled" fullWidth margin="dense">
      <TextField
        label="Description"
        id="description"
        fullWidth
        size="small"
        onChange={handleChange}
        value={value}
        error={Boolean(error)}
        inputProps={{ maxLength: 250 }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Edit />
            </InputAdornment>
          ),
        }}
        multiline
        minRows={4}
        onBlur={handleBlur}
        variant="filled"
      />
      <FormHelperText id="description" error={Boolean(error)}>
        Max 250 characters including spaces
      </FormHelperText>
    </FormControl>
  );
};

export default Description;
