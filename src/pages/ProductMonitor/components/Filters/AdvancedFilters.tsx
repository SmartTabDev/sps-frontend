import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Line } from 'components/Line/Line';
import { styled } from '@mui/system';
import Select from 'components/Select';
import SelectAll from 'components/SelectAll/SelectAll';
import {
  ProductMonitorFeature,
  ProductMonitorProductFeature,
} from 'pages/ProductMonitor/types';
import uniqBy from 'lodash/uniqBy';
import FieldWrapper from 'components/FieldWrapper/FieldWrapper';
import AdvancedFilterRow from './AdvancedFilterRow.styled';

type Props = {
  initialFeatures: ProductMonitorFeature[] | undefined;
  filteredFeaturesRows: ProductMonitorFeature[] | undefined;
  setFilteredFeaturesRows: React.Dispatch<React.SetStateAction<ProductMonitorFeature[]>>;
  filteredFeatures: ProductMonitorFeature[];
  setFilteredFeatures: React.Dispatch<React.SetStateAction<ProductMonitorFeature[]>>;
};

const StyledWrapper = styled('div')`
  margin-top: 30px;
`;

type RowProps = {
  row: ProductMonitorFeature;
  setFilteredFeatures: React.Dispatch<React.SetStateAction<ProductMonitorFeature[]>>;
  setFilteredFeaturesRows: React.Dispatch<React.SetStateAction<ProductMonitorFeature[]>>;
  filteredFeaturesRows: ProductMonitorFeature[];
};

const Row: React.FC<RowProps> = ({
  row,
  setFilteredFeatures,
  filteredFeaturesRows,
  setFilteredFeaturesRows: _setFilteredFeaturesRows,
}) => {
  const handleValueChange = useCallback(
    (value: ProductMonitorProductFeature[]) => {
      const index = filteredFeaturesRows.findIndex(
        (feature) => feature.id === row.id,
      );

      if (filteredFeaturesRows) {
        const oldFeature = filteredFeaturesRows[index];
        const initialValues = row.values;

        if (oldFeature) {
          const { id, name } = oldFeature;

          // filter initial values by selected ones
          const newFeatureNames = value.map((v) => v.value);
          const newValues = initialValues.filter((v) => newFeatureNames.includes(v.value));
          const newFeature = {
            id,
            name,
            values: newValues.length ? newValues : initialValues,
          };

          const newFeatures = filteredFeaturesRows.map((f) => (f.id === row.id ? newFeature : f));

          setFilteredFeatures(newFeatures);
        }
      }
    },
    [row, filteredFeaturesRows, setFilteredFeatures],
  );

  // show only unique filter values
  const uniqueRowValues = useMemo(() => uniqBy(row.values, 'value'), [row.values]);

  return (
    <>
      {row.values ? (
        <SelectAll<ProductMonitorProductFeature, true, false>
          options={uniqueRowValues}
          getOptionLabel={(option) => option.value}
          // getOptionSelected={(option, value) => option.value === value.value}
          syncChange={handleValueChange}
          selectAllLabel="All"
          label="Value"
          optionNameKey="value"
          clearOnBlur
          clearOnEscape
          disableClearable
        />
      ) : (
        <div />
      )}
    </>
  );
};

const AdvancedFilters: React.FC<Props> = ({
  initialFeatures = [],
  filteredFeaturesRows = [],
  setFilteredFeaturesRows,
  setFilteredFeatures,
  filteredFeatures: _filteredFeatures,
}) => {
  const [addFeatureValue, setAddFeatureValue] = useState<string | null>(null);
  const addedFeatures = useMemo(
    () => filteredFeaturesRows.map((row) => row.name),
    [filteredFeaturesRows],
  );

  const featuresNames = useMemo(() => initialFeatures.map((f) => f.name), [
    initialFeatures,
  ]);
  const availableFeatures = useMemo(
    () => featuresNames.filter((o) => !addedFeatures.includes(o)),
    [featuresNames, addedFeatures],
  );

  const handleAddFilterChange = useCallback(
    (_e, value) => {
      const isAdded = filteredFeaturesRows.find((r) => r.name === value);
      const feature = initialFeatures.find((r) => r.name === value);

      if (isAdded) {
        if (setFilteredFeaturesRows) {
          setFilteredFeaturesRows(
            filteredFeaturesRows.map((r) => (r.name === value ? { ...r, name: value } : r)),
          );
        }
      } else if (feature && filteredFeaturesRows) {
        if (setFilteredFeaturesRows) {
          setFilteredFeaturesRows([...filteredFeaturesRows, feature]);
        }
      }

      setAddFeatureValue(value);
    },
    [initialFeatures, filteredFeaturesRows, setFilteredFeaturesRows],
  );

  // reset add filter input value
  useEffect(() => {
    setAddFeatureValue(null);
  }, [addFeatureValue]);

  return (
    <StyledWrapper>
      <Line height={1} background="rgba(82, 95, 129, 0.3)" />
      <FieldWrapper $marginBottomSize="medium" $marginTopSize="medium">
        {filteredFeaturesRows.map((row, index) => (
          <AdvancedFilterRow key={index}>
            <Select<string, false, true, true>
              label="Filter"
              style={{ width: '100%' }}
              disableClearable
              options={featuresNames}
              value={row.name}
              disabled
              variant="outlined"
            />
            <Row
              row={row}
              setFilteredFeaturesRows={setFilteredFeaturesRows}
              filteredFeaturesRows={filteredFeaturesRows}
              setFilteredFeatures={setFilteredFeatures}
            />
          </AdvancedFilterRow>
        ))}
        {initialFeatures.length !== filteredFeaturesRows.length ? (
          <AdvancedFilterRow>
            <Select<string, false, true, true>
              label="Add a filter"
              style={{ width: '100%' }}
              clearOnBlur
              clearOnEscape
              options={featuresNames}
              onChange={handleAddFilterChange}
              // getOptionSelected={(option, value) => option === value}
              disableClearable
              value={addFeatureValue as string | undefined}
              filterOptions={(fields) => fields.filter((f) => availableFeatures.includes(f))}
              variant="outlined"
            />
          </AdvancedFilterRow>
        ) : null}
      </FieldWrapper>
      <Line height={1} background="#E4E6EC" />
    </StyledWrapper>
  );
};

export default AdvancedFilters;
