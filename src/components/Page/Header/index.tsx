import React, { ReactNode } from 'react';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { ChevronLeftSharp } from '@mui/icons-material';
import { FormatShortDate } from '../../FormatDate/FormatDate';
import SingleDayPicker from '../../SingleDayPicker/SingleDayPicker';
import Title from '../Title/Title.styled';

const DefaultNavWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: revert;
  z-index: 3;
  margin-top: 70px;
`;

export const ActionHeader = styled(DefaultNavWrapper)`
  box-shadow: 0 4px 16px 0 #00000026, 0px -2px 0px 0px #00000005;
  margin: 72px 24px 24px 24px;
  padding: 10px 0;
  border-radius: 10px;
  width: calc(100% - 24px * 2);
  background: white;
`;

const Navigation = styled(Box)<{ $margin?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin: ${({ $margin }) => $margin || '0 20px 0 20px'};
  flex-grow: 1;
  flex-wrap: wrap;
`;

const StyledDate = styled(Typography)`
  line-height: 40px;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 35px;
  font-weight: 600;
  font-size: 16px;

  &:empty {
    display: none;
  }
`;

export type HeaderProps = {
  title: string;
  date?: moment.Moment | null;
  showYear?: boolean;
  titleDateFilter?: boolean;
  renderNav?: () => ReactNode;
  navMargin?: string;
  onDateChange?: (date: moment.Moment) => void;
  isLoading?: boolean;
  NavWrapper?: React.FC;
  onBackButtonClick?: () => void;
  titleDateFromToFilter?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title,
  date,
  titleDateFilter = false,
  showYear,
  navMargin,
  renderNav,
  onDateChange,
  isLoading,
  NavWrapper = DefaultNavWrapper,
  onBackButtonClick,
  titleDateFromToFilter = false,
}) => (
  <NavWrapper>
    <Navigation $margin={navMargin}>
      <Box flexDirection="row" display="flex" alignItems="center">
        {onBackButtonClick && (
          <ChevronLeftSharp
            onClick={onBackButtonClick}
            sx={{
              mr: '3px',
              fill: '#3B455E',
              cursor: 'pointer',
              fontSize: '30px',
            }}
          />
        )}
        <Title variant="h4">
          {isLoading ? <Skeleton width={115} height={40} /> : title}
        </Title>
        <Stack
          spacing="24px"
          direction="row"
          alignItems="center"
          sx={{ ml: '28px' }}
        >
          {moment.isMoment(date) &&
            !titleDateFromToFilter &&
            !titleDateFilter && (
              <StyledDate variant="h4">
                <FormatShortDate year={showYear}>{date}</FormatShortDate>
              </StyledDate>
            )}
          {date && titleDateFilter && (
            <SingleDayPicker onDateChange={onDateChange} date={moment(date)} />
          )}
          {date && titleDateFromToFilter && (
            <>
              <SingleDayPicker
                onDateChange={onDateChange}
                date={moment(date)}
              />
              <Box>vs</Box>
              <SingleDayPicker
                onDateChange={onDateChange}
                date={moment(date).subtract(7, 'days')}
              />
            </>
          )}
        </Stack>
      </Box>
      {renderNav ? renderNav() : ''}
    </Navigation>
  </NavWrapper>
);

export default Header;
