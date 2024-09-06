import React, { ReactNode, useContext } from 'react';
import { Stack, styled } from '@mui/system';
import { ErrorMessageWithErrorBoundary } from 'hoc/withErrorBoundary';
import TextButton from 'components/TextButton';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import MarketplaceContext from 'pages/Marketplaces/MarketplaceContext';
import { Marketplace } from 'reducers/auth/auth';
import { MenuContext } from 'contexts/MenuContext';
import { NAV } from 'config-global';

const Header = styled('div')`
  display: flex;
  align-items: baseline;
`;

const StyledTextButton = styled(TextButton)`
  svg {
    font-size: 16px;
  }

  a {
    color: inherit;
  }
`;

const StyledModal = styled(Modal)`
  background: ${({ theme }) => theme.palette.common.white};
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1300;
  outline: none;
`;

type BackToMarketplacesBtnProps = {
  marketplace: Marketplace;
};

const BackToMarketplacesBtn: React.FC<BackToMarketplacesBtnProps> = ({
  marketplace,
}) => (
  <StyledTextButton icon="FaArrowLeft">
    <Link to={`/marketplaces/${marketplace}`}>Back</Link>
  </StyledTextButton>
);

interface Props {
  children?: ReactNode;
}

export const MarketplacePopup: React.FC<Props> = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const { marketplace } = useContext(MarketplaceContext);

  return (
    <div ref={rootRef}>
      <StyledModal
        open
        hideBackdrop
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(!isMenuOpen && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          }),
          ml: 'auto',
          pt: '72px',
        }}
      >
        <>
          <ErrorMessageWithErrorBoundary>
            <Stack spacing="24px" alignItems="stretch" mx="24px">
              <Header>
                {marketplace && (
                  <BackToMarketplacesBtn marketplace={marketplace} />
                )}
              </Header>
              {children}
            </Stack>
          </ErrorMessageWithErrorBoundary>
        </>
      </StyledModal>
    </div>
  );
};
