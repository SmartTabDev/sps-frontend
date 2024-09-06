import React from 'react';
import Input from 'components/Input';
import { validate } from 'email-validator';

interface Props {
  value: string;
  onChange: (value : string) => void;
  disabled?: boolean;
}

export function EmailInput({ value, onChange, disabled }:Props): JSX.Element {
  const valid = value ? validate(value) : undefined;

  return (
    <Input
      valid={valid}
      error={valid === false}
      id="email"
      label="Email"
      type="email"
      variant="filled"
      fullWidth
      autoFocus
      inputProps={{ maxLength: 64 }}
      required
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
