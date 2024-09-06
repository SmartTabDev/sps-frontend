import React from 'react';
import Amount from 'pages/Notifications/icons/Amount/Amount';
import Percentage from 'pages/Notifications/icons/Percentage/Percentage';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { TriggerValueTypeOption } from 'types/Notification';

export const TriggerValueTypes: TriggerValueTypeOption[] = [
  { name: 'amount', value: 'amount' },
  { name: 'percent', value: 'percent' },
];

const StyledTextField = styled(TextField)`
  > div {
    height: 51px;
    margin-top: 8px;
    justify-content: center;
    padding-left: 0 !important;
    padding-top: 4px !important;
  }

  input {
    display: none;
  }
`;

export type TriggerValueTypeSelectProps = {
  value: TriggerValueTypeOption | undefined;
  setValue: (trigger: TriggerValueTypeOption | undefined) => void;
  disabled?: boolean;
};

const TriggerValueTypeSelect: React.FC<TriggerValueTypeSelectProps> = ({
  value,
  setValue,
  disabled,
}) => (
  <Autocomplete<TriggerValueTypeOption, false, true, false>
    defaultValue={TriggerValueTypes[0]}
    options={TriggerValueTypes}
    renderOption={(props, option) => (
      <li {...props} style={{ display: 'flex', justifyContent: 'center' }}>
        {option.value === 'amount' ? <Amount /> : <Percentage />}
      </li>
    )}
    getOptionLabel={(option) => option.name}
    value={value}
    blurOnSelect
    disableClearable
    openOnFocus
    onChange={(_e, val) => {
      setValue(val);
    }}
    isOptionEqualToValue={(item, val) => item.name === val.name}
    disabled={disabled}
    renderInput={(params) => {
      const val = (params.inputProps as any).value;
      const Icon: React.ReactNode = val === 'amount' ? <Amount /> : <Percentage />;

      return (
        <StyledTextField
          {...params}
          variant="filled"
          size="small"
          placeholder=""
          label=""
          InputProps={{
            ...params.InputProps,
            startAdornment: Icon,
          }}
        />
      );
    }}
  />
);

export default TriggerValueTypeSelect;
