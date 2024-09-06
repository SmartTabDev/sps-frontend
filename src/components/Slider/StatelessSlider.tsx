import React, { useMemo, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';
import uniq from 'lodash/uniq';

const StyledDetails = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
margin-top: 10px;
`;

const StyledValueWrapper = styled('div')`
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
`;

const StyledValue = styled('span')`
  color: ${({ theme }) => theme.palette.primary.main};
`;

type Props = {
  name: React.ReactNode;
  min: number;
  max: number;
  valueMin?: number;
  valueMax?: number;
  formatter?: (val: number) => string;
  handleChange: (val: number[]) => void;
};

const defaultFormatter = (val: string | number) => val.toString();

const StatelessSlider: React.FC<Props> = ({
  name,
  min,
  max,
  valueMin,
  valueMax,
  formatter = defaultFormatter,
  handleChange,
}) => {
  const range = useMemo(() => [valueMin || min, valueMax || max], [
    min,
    max,
    valueMin,
    valueMax,
  ]);
  const [minValue, maxValue] = range;

  const handleOnChange = useCallback(
    (_event, value: number | number[]) => {
      if (typeof value === 'number') {
        handleChange([value]);
      } else {
        handleChange(value);
      }
    },
    [handleChange],
  );

  const marks = useMemo(
    () => uniq([min, max])
      .filter((v): v is number => typeof v === 'number')
      .map((v) => ({
        value: v,
        label: formatter(v),
      })),
    [min, max, formatter],
  );

  const formatedMinValue = useMemo(() => (minValue !== undefined ? formatter(minValue) : ''), [formatter, minValue]);
  const formatedMaxValue = useMemo(() => (maxValue !== undefined ? formatter(maxValue) : ''), [formatter, maxValue]);

  // eslint-disable-next-line eqeqeq
  if (minValue == undefined || maxValue == undefined) {
    return null;
  }

  return (
    <div>
      <StyledDetails>
        {name}
        <StyledValueWrapper>
          {minValue === maxValue ? formatedMinValue : null}
          {minValue !== maxValue ? (
            <>
              <StyledValue>{formatedMinValue}</StyledValue>
              {' '}
              -
              {' '}
              <StyledValue>{formatedMaxValue}</StyledValue>
            </>
          ) : null}
        </StyledValueWrapper>
      </StyledDetails>
      <StyledSlider
        min={min}
        max={max}
        value={range}
        getAriaLabel={(index: number) => (index === 0 ? 'Minimum' : 'Maximum')}
        onChange={handleOnChange}
        marks={marks && marks.length ? marks : undefined}
        // disabled={minValue !== 0 && maxValue !== 0 && minValue === maxValue}
      />
    </div>
  );
};

export default StatelessSlider;
