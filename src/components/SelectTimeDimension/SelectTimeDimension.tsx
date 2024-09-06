import React, { useCallback } from 'react';
import Select from 'components/Select';
import { TimeDimension } from 'types/Cube';

type Props = {
  timeDimension: TimeDimension;
  handleTimeDimensionChange: (value: TimeDimension) => void;
};

const timeAggregationOptions: TimeDimension[] = [
  { name: 'This week' },
  { name: 'Last week' },
  { name: 'This month' },
  { name: 'Last month' },
  { name: 'This year' },
  { name: 'Last year' },
];

const SelectTimeDimension: React.FC<Props> = ({
  timeDimension,
  handleTimeDimensionChange,
}) => {
  const handleTimeAggregationChange = useCallback(
    (_, value) => {
      handleTimeDimensionChange(value as TimeDimension);
    },
    [handleTimeDimensionChange]
  );

  return (
    <Select<TimeDimension, false, true, false>
      options={timeAggregationOptions}
      getOptionLabel={(option) =>
        typeof option !== 'string' ? option.name : option
      }
      label="Time Aggregation"
      value={timeDimension}
      blurOnSelect
      disableClearable
      variant="outlined"
      onChange={handleTimeAggregationChange}
    />
  );
};

export default SelectTimeDimension;
