import Select from 'components/Select';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FieldWrapper from 'components/FieldWrapper/FieldWrapper';
import React, { useCallback } from 'react';
import upperFirst from 'lodash/upperFirst';
import toLower from 'lodash/toLower';

const icon = <CheckBoxOutlineBlankIcon />;
const checkedIcon = <CheckBoxIcon />;

type SelectFilterProps<T> = {
  options: T[];
  onChange: any;
  value: T[];
  label: string;
  properCase?: boolean;
};

const SelectFilter = <T extends { name: string }>({
  options,
  onChange,
  value,
  label,
  properCase,
}: SelectFilterProps<T>): JSX.Element => {
  const renderOption = useCallback(
    (props, option: { name: string }, { selected }: any) => (
      <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          checked={selected}
          color="primary"
        />
        {properCase ? upperFirst(toLower(option.name)) : option.name}
      </li>
    ),
    [properCase],
  );

  return (
    <FieldWrapper $marginTopSize="small">
      <Select<T, true, undefined, undefined>
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={renderOption}
        label={label}
        multiple
        limitTags={1}
        renderTags={(val) => val.map((option) => (
          <span style={{ marginLeft: '4px' }} key={option.name}>
            {option.name}
          </span>
        ))}
        onChange={onChange}
        value={value}
      />
    </FieldWrapper>
  );
};

export default SelectFilter;
