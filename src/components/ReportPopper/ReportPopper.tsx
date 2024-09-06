import React from 'react';
import { styled, css } from '@mui/system';
// mui
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';
// components
import Close from 'components/Close';
import ActionHeaderButton from 'components/ActionHeaderButton/ActionHeaderButton';

const StyledCloseWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  justify-content: flex-end;
  left: 0;
  padding-top: 15px;
  position: sticky;
  top: 0;
  width: 100%;
`;

const StyledCloseIconWrapper = styled('div')`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.common.white};
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  cursor: pointer;
  display: flex;
`;

const StyledPaper = styled(Paper, {
  shouldForwardProp: (props) => props !== '$listLength',
})<{ $listLength: number }>`
  border-radius: 5px;
  width: 328px;
  padding: 0 15px 15px 15px;
  box-shadow: 0px 4px 9px rgba(82, 95, 129, 0.35);
  max-height: 379px;
  position: relative;
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.palette.common.white};

  ${({ $listLength }) =>
    $listLength > 5 &&
    css`
      overflow-y: scroll;
    `}
`;

const StyledWrapper = styled('div')`
  margin-top: 5px;
`;

const StyledChildrenWrapper = styled('div')`
  margin-top: 5px;
`;

type Props = {
  listLength: number;
  isLoading: boolean;
};

const emptyListMessage = `You will be able to download monthly reports when enough data has been accumulated.`;

const ReportPopper: React.FC<Props> = ({ children, listLength, isLoading }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType = 'bottom-end') =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledWrapper>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
            popperOptions={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0.5],
                  },
                },
              ],
            }}
            sx={{
              zIndex: 3,
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <StyledPaper $listLength={listLength}>
                  <StyledCloseWrapper>
                    <StyledCloseIconWrapper onClick={handleClose}>
                      <Close />
                    </StyledCloseIconWrapper>
                  </StyledCloseWrapper>
                  <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
                </StyledPaper>
              </Fade>
            )}
          </Popper>
          <>
            <div>
              <ActionHeaderButton
                tooltipProps={{
                  title:
                    isLoading === false && listLength === 0
                      ? emptyListMessage
                      : 'Export report',
                }}
                iconButtonProps={{
                  onClick: handleClick('bottom-end'),
                }}
                ActiveIcon={DownloadSharpIcon}
                activeIconProps={{
                  sx: { transform: 'translateY(2px)' },
                }}
              />
            </div>
          </>
        </div>
      </ClickAwayListener>
    </StyledWrapper>
  );
};

export default ReportPopper;
