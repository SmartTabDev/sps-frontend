import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Select from 'components/Select';
import moment from 'moment';
import SelectDay from '../SelectDay/SelectDay';

type Props = {
  date: moment.Moment | null;
  setDate: (value: moment.Moment | null) => void;
  start?: boolean;
  minDate: moment.Moment | null;
  maxDate: moment.Moment | null;
};

const startOptions = [
  { name: 'Now', value: 0 },
  { name: 'On date', value: 1 },
];

const endOptions = [
  { name: 'Never', value: 0 },
  { name: 'On date', value: 1 },
];

const Date: React.FC<Props> = ({ date, setDate, start, minDate, maxDate }) => {
  const [optionIndex, setOptionIndex] = useState<number>(0);
  const isDisabled = optionIndex === 0;

  useEffect(() => {
    if (date) {
      setOptionIndex(1);
    }
  }, [date]);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1 }}
      sx={{ marginTop: '20px' }}
    >
      <Grid item xs={6}>
        <Select<{ name: string; value: number }, false, true, false>
          options={start ? startOptions : endOptions}
          getOptionLabel={(option) => `${option.name}`}
          label={start ? 'Starts' : 'Ends'}
          value={(start ? startOptions : endOptions)[optionIndex]}
          blurOnSelect
          disableClearable
          onChange={(_e, val) => {
            if (val.value === 0) {
              setDate(null);
            }
            setOptionIndex(val.value);
          }}
          margin="dense"
        />
      </Grid>
      <Grid item xs={6}>
        <SelectDay
          value={date}
          setValue={setDate}
          isDisabled={isDisabled}
          minDate={minDate || undefined}
          maxDate={maxDate || undefined}
        />
      </Grid>
    </Grid>
  );
};

export default Date;
