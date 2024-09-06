import React from 'react';
import { styled } from '@mui/system';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CustomPopper from 'components/StyledPopper/StyledPopper';

interface CustomProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  label?: string;
  margin?: TextFieldProps['margin'];
  variant?: TextFieldProps['variant'];
}

type Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = Omit<CustomProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>;

const StyledTextField = styled(TextField)``;

const Select = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
    label,
    options,
    margin,
    variant = 'filled',
    ...props
  }: Props<T, Multiple, DisableClearable, FreeSolo>): JSX.Element => (
    <Autocomplete
      {...props}
      openOnFocus
      options={options}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          variant={variant}
          size="small"
          placeholder=""
          label={label}
          margin={margin}
        />
      )}
      PopperComponent={CustomPopper}
    />
  );

export default Select;
