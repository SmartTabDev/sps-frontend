import Typography from '@mui/material/Typography';
import React from 'react';
import { styled } from '@mui/system';
import FormatPrice from '../FormatPrice/FormatPrice';

export type DifferenceProps = {
  difference: number | undefined;
  percentage: string | undefined;
};

const DifferenceWrapper = styled('div')`
  text-align: center;
  font-size: 16px;
`;

const Percentage = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 14px;
`;

export const Difference: React.FC<DifferenceProps> = ({
  difference,
  percentage,
}) => {
  const mathSignResult = difference && Math.sign(difference);
  const sign = mathSignResult !== 0 && (mathSignResult === 1 ? '+' : '-');

  return (
    <div>
      <DifferenceWrapper>
        {mathSignResult !== 0 ? (
          <FormatPrice price={difference} showPlus size="small-medium" />
        ) : (
          <Typography style={{ fontSize: 16, fontWeight: 700 }}>0.00</Typography>
        )}
        {percentage && (
        <Percentage>
          {Number(percentage) !== 0 && sign}
          {percentage.replace('.', ',')}
          {' '}
          %
        </Percentage>
        )}
      </DifferenceWrapper>
    </div>
  );
};
