import React from 'react';
import { styled, css } from '@mui/system';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type InputProps = {
  valid?: boolean;
  error?: boolean;
} & TextFieldProps;

const StyledTextField = styled('div', {
  shouldForwardProp: (props) => props !== 'valid' && props !== 'error',
})<InputProps>`
  ${(props) => props.valid
    && css`
      label {
        color: #28a745;
      }

      label + div:before {
        color: #28a745;
        border-bottom-width: 2px;
      }
    `};

  ${(props) => props.error
    && css`
      label {
        color: #f00f00;
      }

      label + div:before {
        color: #f00f00;
        border-bottom-width: 2px;
      }
    `};
`;

const Input: React.FC<InputProps> = ({ error, valid, ...props }) => (
  <StyledTextField error={error} valid={valid}>
    <TextField {...props} />
  </StyledTextField>
);

export default Input;
