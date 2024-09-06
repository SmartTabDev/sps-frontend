import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';

const StyledName = styled('span')`
  font-weight: bold;
  font-size: 14px;
  line-height: 40px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
`;

const StyledDetails = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledValueWrapper = styled('div')`
  font-weight: bold;
  font-size: 14px;
  line-height: 40px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
`;

const StyledValue = styled('span')`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledSlider = styled(Slider)`
  width: 100%;
`;

type Props = {
  name?: string;
  min?: number;
  max?: number;
  formatter?: (val: number) => string;
  handleChange: (val: [number, number]) => void;
  forceClear?: boolean;
  isLoading: boolean;
  loadingText: string;
  setForceClear?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomizedSlider: React.FC<Props> = ({
  min = 0,
  max = 0,
  name = 'Price Range',
  formatter = (val) => val.toString(),
  handleChange,
  forceClear,
  setForceClear,
  isLoading,
  loadingText,
}) => {
  const [value, setValue] = useState<[number, number]>([min, max]);
  const [minValue, maxValue] = value;

  useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  useEffect(() => {
    handleChange(value);
  }, [handleChange, value]);

  useEffect(() => {
    if (setForceClear && forceClear) {
      setForceClear(false);
      setValue([min, max]);
    }
  }, [forceClear, setForceClear, min, max]);

  if (isLoading) {
    return <>{loadingText}</>;
  }

  const renderRange = typeof minValue === 'number' && typeof maxValue === 'number';
  const marks = flatten(
    uniq([min, max])
      .filter((v) => Boolean(v))
      .map((v) => ({ value: v, label: <span>{formatter(v)}</span> })),
  );

  return renderRange ? (
    <div>
      <StyledDetails>
        <StyledName>{name}</StyledName>
        <StyledValueWrapper>
          {minValue === maxValue ? formatter(minValue) : null}
          {minValue !== maxValue ? (
            <>
              <StyledValue>{formatter(minValue)}</StyledValue>
              {' '}
              -
              {' '}
              <StyledValue>{formatter(maxValue)}</StyledValue>
            </>
          ) : null}
        </StyledValueWrapper>
      </StyledDetails>
      <StyledSlider
        min={min}
        max={max}
        getAriaLabel={(index: number) => (index === 0 ? 'Minimum' : 'Maximum')}
        value={[minValue, maxValue]}
        onChange={(_e: any, val: any) => setValue(val as [number, number])}
        marks={marks.length ? marks : undefined}
        disabled={min === max}
      />
    </div>
  ) : (
    <></>
  );
};

export default CustomizedSlider;
