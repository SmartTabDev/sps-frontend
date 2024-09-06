import React, { useCallback, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { FilterOptionsState } from '@mui/material/useAutocomplete';
import truncate from 'truncate';
import { styled } from '@mui/system';
import CustomPopper from 'components/StyledPopper/StyledPopper';

const StyledTextField = styled(TextField)`
  .MuiFilledInput-root {
    box-sizing: border-box;
  }
`;

interface CustomProps<
  T,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, true, DisableClearable, FreeSolo> {
  initialOptions: (T | undefined)[];
  label?: string;
  selectAll: T;
  handleChange: (value: T[]) => void;
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

const SelectAllStateless = <
  T extends { name: string },
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  options,
  initialOptions,
  label,
  selectAll,
  noOptionsText,
  limitTags = 1,
  getOptionLabel,
  disableClearable = false,
  handleChange,
}: Props<T, DisableClearable, FreeSolo>): JSX.Element => {
  const [inputValue, setInputValue] = React.useState('');
  const allSelected = options.length === initialOptions.length;

  // Select all values on beginning
  // TODO: Add possibility to turn behaviour off
  useEffect(() => {
    handleChange(initialOptions as unknown as any[]);
  }, [handleChange, initialOptions]);

  const handleOnChange = useCallback(
    (_e, values: any[], reason: AutocompleteChangeReason) => {
      let result: any[] = [];

      if (reason === 'selectOption' || reason === 'removeOption') {
        const shouldSelectAll = Boolean(
          values.find((option) => option.name === selectAll.name)
        );

        if (shouldSelectAll) {
          if (allSelected === false) {
            result = initialOptions as any[];
          } else {
            result = [];
          }
        } else {
          result = values;
        }
      } else if (reason === 'clear') {
        result = [];
      }

      handleChange(result);
    },
    [handleChange, selectAll.name, allSelected, initialOptions]
  );

  const filter = createFilterOptions<any>();
  const filterOptions = (
    opts: any[],
    values: FilterOptionsState<any>
  ): any[] => {
    const filtered = filter(opts, values);
    return [selectAll, ...filtered];
  };

  return (
    <Autocomplete
      // eslint-disable-next-line max-len
      isOptionEqualToValue={(option, value) =>
        (option.name ?? '').toLowerCase() === (value.name ?? '').toLowerCase()
      }
      multiple
      limitTags={limitTags}
      options={initialOptions as unknown as any[]}
      value={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      // isOptionEqualToValue={getOptionSelected}
      noOptionsText={noOptionsText}
      filterOptions={filterOptions}
      onChange={handleOnChange}
      renderOption={(props, option: any, { selected }) => {
        const selectAllProps =
          option.name === selectAll.name ? { checked: allSelected } : {};
        const optionLabel =
          getOptionLabel && option.name ? getOptionLabel(option) : '';

        return (
          <li {...props} style={{ padding: '0 8px' }}>
            <Checkbox
              color="primary"
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
              {...selectAllProps}
            />
            {optionLabel}
          </li>
        );
      }}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <StyledTextField
          {...params}
          label={label}
          variant="outlined"
          size="small"
        />
      )}
      renderTags={(value: any[]) =>
        value.map((option: any, index: number) =>
          index === 0 ? (
            <span style={{ marginLeft: '4px' }} key={index}>
              {allSelected ? selectAll.name : truncate(option.name, 23)}
            </span>
          ) : null
        )
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

export default SelectAllStateless;
