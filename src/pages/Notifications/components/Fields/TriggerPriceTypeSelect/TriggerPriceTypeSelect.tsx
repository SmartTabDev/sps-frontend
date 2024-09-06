import React from 'react';
import Select from 'components/Select';

const options = [{ name: 'RRP', value: 'rrp' }];

export type TriggerPriceTypeOption = {
  name: string;
  value: string;
};

type Props = {
  value: TriggerPriceTypeOption | undefined;
  setValue: (trigger: TriggerPriceTypeOption | undefined) => void;
};

const TriggerPriceTypeSelect: React.FC<Props> = ({ value, setValue }) => (
  <Select<TriggerPriceTypeOption, false, true, false>
    defaultValue={options[0]}
    options={options}
    getOptionLabel={(option) => `${option.name}`}
    value={value}
    blurOnSelect
    disableClearable
    onChange={(_e, val) => {
      setValue(val);
    }}
    margin="dense"
    isOptionEqualToValue={(item, val) => item.name === val.name}
    variant="outlined"
  />
);

export default TriggerPriceTypeSelect;
