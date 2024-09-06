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

const NotificationName: React.FC<Props> = ({
  value, setValue, error, handleValidate,
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
    <FormControl variant="filled" fullWidth>
      <TextField
        label="Notification name"
        id="notification-name"
        fullWidth
        size="small"
        value={value}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Edit />
            </InputAdornment>
          ),
          required: true,
        }}
        error={Boolean(error)}
        onBlur={handleBlur}
        variant="filled"
      />
      <FormHelperText id="notification-name" error={Boolean(error)}>
        {error}
        {!error
          && `Mandatory. This name will be used in the email subject you
        will receive from us`}
      </FormHelperText>
    </FormControl>
  );
};

export default NotificationName;
