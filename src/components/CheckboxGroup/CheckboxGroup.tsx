import React, { useCallback, useMemo } from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

interface CheckboxItem extends Object {
  name: string;
}

type PrimaryCheckboxProps = {
  name: string;
  checked: FormControlLabelProps['checked'];
  onChange: CheckboxProps['onChange'];
};

const PrimaryCheckbox: React.FC<PrimaryCheckboxProps> = ({
  name,
  checked,
  onChange,
}) => (
  <FormControlLabel
    control={(
      <Checkbox
        color="primary"
        value={name}
        checked={checked}
        onChange={onChange}
      />
    )}
    label={name}
  />
);

type Props = {
  options: CheckboxItem[];
  value: CheckboxItem[];
  onChange: (value: CheckboxItem[]) => void;
};

const MemoizedCheckbox = React.memo(PrimaryCheckbox);

// eslint-disable-next-line max-len
const removeItems = (items: CheckboxItem[], names: string[]) => items.filter((o) => !names.find((n) => n === o.name));

const CheckboxGroup: React.FC<Props> = ({ onChange, options, value }) => {
  const handleChange = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, optionItem, checked: boolean) => {
      let result: CheckboxItem[] = [];

      if (optionItem.name === 'All') {
        if (checked) {
          result = removeItems(value, [optionItem.name]);
        } else {
          result = options;
        }
      } else if (optionItem.name !== 'All') {
        if (checked) {
          result = removeItems(value, [optionItem.name, 'All']);
        } else {
          result = [...value, optionItem];
        }
      }

      onChange(result);
    },
    [onChange, value, options],
  );

  const checkedNames = useMemo(() => value.map((v) => v.name), [value]);

  return (
    <div>
      {options.map((item) => {
        const { name } = item;
        const key = `checkbox-group-item-${name}`;
        const checked = checkedNames.includes(name);

        return (
          <MemoizedCheckbox
            name={name}
            checked={checked}
            onChange={(e) => handleChange(e, item, checked)}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
