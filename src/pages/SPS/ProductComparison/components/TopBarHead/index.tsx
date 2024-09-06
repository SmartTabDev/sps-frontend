import React from 'react';
import { styled } from '@mui/system';
import TextButtonComponent from 'components/TextButton/index';
import moment from 'moment';
import pluralize from 'pluralize';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import FormatTimeframe, { FormatTimeframeDate } from 'components/FormatTimeframe/FormatTimeframe';
import Legend from '../Legend';
import { ReactComponent as Repeat } from './repeat.svg';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const Summary = styled(Box, {
  shouldForwardProp: (props) => props !== '$leftSideWidth',
})<{ $leftSideWidth?: string }>`
  width: ${({ $leftSideWidth = '100%' }) => $leftSideWidth};
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const Actions = styled(Box)`
  display flex;
`;

const Date = styled(FormatTimeframeDate)`
  margin-right: 60px;
`;

const Amounts = styled('div')`
  display: flex;
`;

const StyledTypography = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const StyledIcon = styled(Repeat)`
  width: 19px;
  height: 16px;
  margin-right: 10px;
  padding-right: 0 !important;
`;

type Props = {
  showButton?: boolean;
  showAmounts?: boolean;
  onButtonClick?: (value: boolean) => void;
  buttonText?: string;
};

const TopBarHead: React.FC<Props> = ({
  showButton = true,
  onButtonClick,
  buttonText = 'Select filters',
  showAmounts = true,
}) => {
  const startDate = useSelector(
    (state: RootState) => state.productComparison.startDate,
  );
  const endDate = useSelector(
    (state: RootState) => state.productComparison.endDate,
  );
  const selectedRetailers = useSelector(
    (state: RootState) => state.productComparison.selectedRetailers,
  );
  const selectedProducts = useSelector(
    (state: RootState) => state.productComparison.selectedProducts,
  );

  const retailersAmount = selectedRetailers.length;

  return (
    <>
      <Wrapper>
        <Summary>
          <Date variant="h4">
            <FormatTimeframe start={moment(startDate)} end={moment(endDate)} />
          </Date>
          <Amounts>
            <Legend
              data={selectedProducts}
              textComponent={StyledTypography}
              decoration="Line"
            />
            {showAmounts ? (
              <StyledTypography>
                <>
                  in
                  {' '}
                  {retailersAmount}
                  {' '}
                  {pluralize('Retailer', retailersAmount)}
                </>
              </StyledTypography>
            ) : null}
          </Amounts>
        </Summary>
        {showButton === true && onButtonClick ? (
          <Actions>
            <TextButtonComponent onClick={() => onButtonClick(showButton)}>
              <StyledIcon />
              {buttonText}
            </TextButtonComponent>
          </Actions>
        ) : null}
      </Wrapper>
    </>
  );
};

export default TopBarHead;
