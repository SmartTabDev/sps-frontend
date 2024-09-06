import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RecapCardValues } from 'components/Recaps/utils/types';

type Props = {
  title: string;
  values: RecapCardValues[];
};

const TopProductTitle = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  text-transform: uppercase;
  letter-spacing: 1px;

  &::after {
    display: block;
    content: '';
    width: 160px;
    margin-top: 13px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(82, 95, 129, 0.3);
  }
`;

const TopProductValueText = styled(Typography)`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  display: flex;
  height: 21px;
  margin-bottom: 20px;
  white-space: nowrap;
`;

const TopProductValue = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.common.black};
  display: flex;
  height: 21px;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledGrid = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 25px;
`;

const Side = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TopProduct: React.FC<Props> = ({ title, values }) => {
  const leftGrid = values.map((v) => v.value);
  const rightGrid = values.map((v) => v.name);

  return (
    <StyledBox component="div">
      <TopProductTitle>{title}</TopProductTitle>
      <StyledGrid>
        <Side>
          {leftGrid.map((item, key) => (
            <TopProductValue key={key}>{item}</TopProductValue>
          ))}
        </Side>
        <Side>
          {rightGrid.map((item, key) => (
            <TopProductValueText key={key}>{item}</TopProductValueText>
          ))}
        </Side>
      </StyledGrid>
    </StyledBox>
  );
};

export default TopProduct;
