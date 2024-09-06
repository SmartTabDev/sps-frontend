import { styled } from '@mui/system';

export const DatePickerWrapper = styled('div')`
  position: absolute;
  top: -20px;
  color: ${({ theme }) => theme.palette.primary.main};

  .SingleDatePickerInput {
    border: none;
    width: 0;
    height: 0;

    > *:not(.SingleDatePicker_picker) {
      opacity: 0;
      pointer-events: none;
    }
  }
`;
