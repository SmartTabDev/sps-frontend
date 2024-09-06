import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { FilterOptionsState } from '@mui/material/useAutocomplete';
import truncate from 'truncate';
import CustomPopper from 'components/StyledPopper/StyledPopper';

interface CustomProps<
  T,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, true, DisableClearable, FreeSolo> {
  label?: string;
  optionNameKey: keyof T;
  selectAllLabel: string;
  syncChange: (value: T[]) => void;
  options: any[];
}

type Props<
  T,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = Omit<
  CustomProps<T, DisableClearable, FreeSolo>,
  'renderInput' | 'renderTags' | 'renderOption' | 'onChange'
>;

const SelectAllAutocomplete = <
  T,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
    options,
    label,
    selectAllLabel,
    noOptionsText,
    limitTags = 1,
    syncChange,
    getOptionLabel,
    // getOptionSelected,
    optionNameKey,
    disableClearable = false,
  }: Props<T, DisableClearable, FreeSolo>): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>(options);
  const [inputValue, setInputValue] = React.useState('');
  const allSelected = options.length === selectedOptions.length;
  const selectAllOption = { name: selectAllLabel, value: 'select-all' };

  useEffect(() => {
    setSelectedOptions(options);
  }, [options]);

  useEffect(() => {
    syncChange(selectedOptions);
  }, [syncChange, selectedOptions]);

  const handleToggleOption = useCallback(
    (val: T[]) => {
      setSelectedOptions(val);
    },
    [setSelectedOptions],
  );

  const handleClearOptions = useCallback(() => {
    setSelectedOptions([]);
  }, [setSelectedOptions]);

  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        setSelectedOptions(options);
      } else {
        handleClearOptions();
      }
    },
    [setSelectedOptions, handleClearOptions, options],
  );

  const handleChange = useCallback(
    (
      _event: React.ChangeEvent<any>,
      val: T[],
      reason: AutocompleteChangeReason,
    ) => {
      if (reason === 'selectOption' || reason === 'removeOption') {
        const selectAll = val.find(
          (option) => (option as any).value === 'select-all',
        );

        if (selectAll) {
          if (allSelected === false) {
            handleSelectAll(!allSelected);
            let result = [];
            result = options.filter((el) => (el as any).value !== 'select-all');
            syncChange(result);
          } else {
            handleClearOptions();
          }
        } else {
          handleToggleOption(val);
        }
      } else if (reason === 'clear') {
        handleClearOptions();
      }
    },
    [
      allSelected,
      handleSelectAll,
      handleToggleOption,
      handleClearOptions,
      syncChange,
      options,
    ],
  );

  return (
    <Autocomplete
      multiple
      limitTags={limitTags}
      options={options}
      value={selectedOptions}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel as any}
      // isOptionEqualToValue={getOptionSelected}
      noOptionsText={noOptionsText}
      filterOptions={
        ((values: any[], state: FilterOptionsState<T>): any => {
          const filter = createFilterOptions<T>();

          if (options.length >= 0) {
            const filtered = filter(values, state);
            return [selectAllOption, ...filtered];
          }
          const filtered = filter(values, state);
          return [...filtered].filter(Boolean);
        }) as any
      }
      onChange={handleChange as any}
      renderOption={
        ((
          props: any,
          option: T,
          { selected }: AutocompleteRenderOptionState,
        ) => {
          const selectAllProps = options.length >= 0 && (option as any).value === 'select-all'
            ? { checked: allSelected }
            : {};
          const optionLabel = getOptionLabel ? getOptionLabel(option) : '';
          return (
            <li {...props}>
              <Checkbox
                color="primary"
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
                {...selectAllProps}
              />
              {optionLabel === 'select-all' ? selectAllLabel : optionLabel}
            </li>
          );
        }) as any
      }
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} label={label} variant="outlined" size="small" />
      )}
      renderTags={
        ((value: T[]) => value.map((option: T, index: number) => (index === 0 ? (
          <span style={{ marginLeft: '4px' }} key={index}>
            {allSelected || selectedOptions.length === 0
              ? selectAllLabel
              : truncate(option[optionNameKey] as any, 23)}
          </span>
        ) : null))) as any
      }
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getLimitTagsText={(more: number) => (allSelected ? '' : `+${more}`)}
      disableClearable={disableClearable}
      PopperComponent={CustomPopper}
    />
  );
};

export default SelectAllAutocomplete;
