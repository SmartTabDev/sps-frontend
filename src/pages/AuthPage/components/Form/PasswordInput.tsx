import React, { useState, useCallback } from 'react';
import Input from 'components/Input';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  helperText?: string | null;
  error?: boolean;
}

export function PasswordInput({
  value,
  onChange,
  disabled,
  label = 'Password',
  helperText,
  error,
}: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Input
      valid={value.length > 0 && error === false}
      error={error === true}
      id="password"
      label={label}
      type={showPassword ? 'text' : 'password'}
      variant="filled"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" variant="standard">
            <IconButton
              type="button"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              size="large"
            >
              {showPassword ? (
                <Visibility style={{ fontSize: 16 }} />
              ) : (
                <VisibilityOff style={{ fontSize: 16 }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      required
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      helperText={helperText}
    />
  );
}
