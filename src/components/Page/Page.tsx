import React, { MouseEventHandler, useContext } from 'react';
import moment from 'moment';
import Fade from '@mui/material/Fade';
import NavVertical from 'components/minimals/nav/NavVertical';
import { Box } from '@mui/system';
import NavMini from 'components/minimals/nav/NavMini';
import { NAV } from 'config-global';
import { MenuContext } from 'contexts/MenuContext';
import PageWrapper from './PageWrapper';
import Header from './Header';
import Overlay from './Overlay.styled';
import ModviseAppBar from './AppBar/AppBar';

const Nav = () => {
  const { isMenuOpen } = useContext(MenuContext);

  return !isMenuOpen ? <NavMini /> : <NavVertical />;
};

const Main: React.FC = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
        ...(!isMenuOpen && {
          width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
        }),
        fontFamily: 'Lato',
      }}
    >
      {children}
    </Box>
  );
};

type Props = {
  title: string;
  renderNav?: () => React.ReactNode;
  navMargin?: string;
  date?: moment.Moment;
  overlay?: boolean;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  isLoading?: boolean;
  NavWrapper?: React.FC;
  onBackButtonClick?: () => void;
  scrollable?: boolean;
  titleDateFilter?: boolean;
  titleDateFromToFilter?: boolean;
  onDateChange?: (date: moment.Moment) => void;
};

const Page: React.FC<Props> = ({
  children,
  title,
  renderNav,
  navMargin,
  date,
  overlay = false,
  onOverlayClick,
  isLoading = false,
  NavWrapper,
  onBackButtonClick,
  scrollable,
  titleDateFilter,
  titleDateFromToFilter,
  onDateChange,
}) => {
  return (
    <PageWrapper>
      <ModviseAppBar />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          pb: scrollable ? '12px' : null,
        }}
      >
        <Nav />
        <Main>
          <Header
            title={title}
            date={date}
            titleDateFilter={titleDateFilter}
            renderNav={renderNav}
            navMargin={navMargin}
            showYear
            isLoading={isLoading}
            NavWrapper={NavWrapper}
            titleDateFromToFilter={titleDateFromToFilter}
            onBackButtonClick={onBackButtonClick}
            onDateChange={onDateChange}
          />
          {children}
          <Fade in={overlay}>
            <div>
              <Overlay onClick={onOverlayClick} />
            </div>
          </Fade>
        </Main>
      </Box>
    </PageWrapper>
  );
};

export default Page;
