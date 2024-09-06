import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, FormGroup, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Clear } from '@mui/icons-material';
import { styled } from '@mui/system';
import Input from '../Input/index';

export type ActionSearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (filter: string) => void;
  onClear: () => void;
  label: string;
  id: string;
  disabled: boolean;
};

const disableRippleProps = {
  disableFocusRipple: true,
  disableRipple: true,
  disableTouchRipple: true,
};

const StyledInput = styled(Input)``;
const StyledButton = styled(Button)``;
const StyledSearchIcon = styled(SearchIcon)``;

const StyledFormGroup = styled(FormGroup)`
  ${StyledSearchIcon} {
    color: #525f81;
  }

  ${StyledInput} {
    width: 220px;
    margin-left: auto;
    color: #525f81;

    .MuiOutlinedInput-root {
      > fieldset {
        border-color: rgba(82, 95, 129, 0.5);
      }
    }

    input {
      font-size: 14px;
      font-weight: 500;

      &::placeholder {
        color: #525f81;
        opacity: 1;
        font-size: 14px;
        font-weight: 500;
      }
    }

    fieldset {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      top: -5px;
    }
  }

  ${StyledButton} {
    border-color: rgba(82, 95, 129, 0.5);
    border-left-color: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 40px;
    left: -1px;
    min-width: 50px;

    &:hover {
      background: rgba(115, 165, 231, 0.25);
      border-color: #447eeb;
    }
  }

  &:hover {
    ${StyledInput} {
      .MuiOutlinedInput-root:hover {
        > fieldset {
          border-color: rgba(82, 95, 129, 0.5);
        }
      }
    }
  }

  :focus-within {
    ${StyledSearchIcon} {
      color: #447eeb;
    }

    ${StyledInput} {
      .MuiOutlinedInput-root:hover {
        > fieldset {
          border-color: #447eeb;
        }
      }
    }

    ${StyledButton} {
      border-color: #447eeb;

      &:hover {
        ${StyledSearchIcon} {
          color: #525f81;
        }
      }

      &:active {
        background: #447eeb;

        ${StyledSearchIcon} {
          color: #ffffff;
        }
      }
    }
  }
`;

const ActionSearchField = ({
  id,
  label,
  value,
  onChange,
  onClear,
  onSubmit,
  disabled,
}: ActionSearchFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: val } = e.target;
    onChange(val);
  };

  return (
    <StyledFormGroup row>
      <StyledInput
        id={id}
        placeholder={label}
        onChange={handleChange}
        fullWidth
        type="text"
        value={value}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onSubmit(value);
          }
        }}
        InputLabelProps={{
          sx: {
            fontSize: '14px',
            fontWeight: 500,
          },
        }}
        InputProps={{
          sx: {
            height: '40px',
          },
          endAdornment: value ? (
            <InputAdornment
              position="end"
              sx={{
                marginLeft: '2px',
              }}
            >
              <IconButton edge="end" {...disableRippleProps} onClick={onClear}>
                <Clear
                  sx={{
                    fontSize: 18,
                    color: '#525F81',
                  }}
                />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        variant="outlined"
        size="small"
      />
      <StyledButton
        variant="outlined"
        {...disableRippleProps}
        disabled={disabled}
        onClick={() => onSubmit(value)}
        disableElevation
      >
        <StyledSearchIcon
          sx={{
            fontSize: 18,
          }}
        />
      </StyledButton>
    </StyledFormGroup>
  );
};

export default ActionSearchField;
