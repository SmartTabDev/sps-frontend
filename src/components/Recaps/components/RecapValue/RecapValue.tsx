import Symbol from 'components/Recaps/components/Symbol/Symbol';
import { NA } from 'components/Recaps/RecapCard.styled';
import React from 'react';
import { Box, styled } from '@mui/system';
import Typography from '@mui/material/Typography';

export const Value = styled(Typography)`
  font-size: 36px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  display: flex;
  align-items: baseline;
  line-height: 1;
`;

type RecapValueType = {
  value: string | number | undefined;
  marginTop?: string | number;
};

const RecapValue: React.FC<RecapValueType> = ({
  value,
  marginTop = '12px',
}) => {
  const isPercentage = String(value).includes('%');
  const finalRecapValue = String(value).replace('%', '');
  const isNA = value === undefined || value === null;

  return (
    <Box sx={{ marginTop }}>
      {isNA ? <NA>N/A</NA> : null}
      {!isNA && finalRecapValue ? (
        <Value>
          {finalRecapValue}
          {isPercentage ? (
            <Symbol $size="22px" $weight={500}>
              %
            </Symbol>
          ) : null}
        </Value>
      ) : null}
    </Box>
  );
};

export default RecapValue;
