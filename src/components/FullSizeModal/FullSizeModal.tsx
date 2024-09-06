import React, { useContext } from 'react';
import { styled } from '@mui/system';
import Modal, { ModalProps } from '@mui/material/Modal';
import moment from 'moment';
import { MenuContext } from 'contexts/MenuContext';
import { NAV } from 'config-global';
import Header, { ActionHeader, HeaderProps } from '../Page/Header';

const StyledModal = styled(Modal)`
  width: calc(100% - 24px * 2);
  margin-left: auto;
`;

const StyledModalContent = styled('div')`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  outline: 0;
  box-sizing: border-box;
  position: absolute;
  overflow-y: auto;
`;

type Props = {
  headerProps: HeaderProps;
};

export type FullSizeModalProps = ModalProps & Props;

const FullSizeModal: React.FC<FullSizeModalProps> = ({
  children,
  open,
  onClose,
  headerProps,
}) => {
  const { isMenuOpen } = useContext(MenuContext);
  const { date = moment(Date.now()), ...remainingProps } = headerProps;
  const headerPropsExtended: HeaderProps = {
    date,
    showYear: true,
    ...remainingProps,
    // eslint-disable-next-line
    NavWrapper: ActionHeader,
    onBackButtonClick: () => (onClose ? onClose({}, 'backdropClick') : null),
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 1300,
        flexGrow: 1,
        width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
        ...(!isMenuOpen && {
          width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
        }),
      }}
    >
      <StyledModalContent>
        <Header {...headerPropsExtended} />
        {children}
      </StyledModalContent>
    </StyledModal>
  );
};

export default FullSizeModal;
