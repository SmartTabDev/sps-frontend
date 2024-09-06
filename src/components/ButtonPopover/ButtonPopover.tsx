import * as React from 'react';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/system';
import Button from '../Button';

type Props = {
  buttonText: string;
};

export const StyledButtonOption = styled('p')`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  padding: 14px;
  margin: 0;

  &:hover {
    background: rgb(59 69 94 / 10%);
  }
`;

const ButtonPopover: React.FC<Props> = ({ buttonText, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = anchorEl ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        size="medium"
      >
        {buttonText}
      </Button>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            paddingTop: '16px',
            marginTop: '0',
            width: '110px',
            boxShadow: '0px 4px 9px rgba(82, 95, 129, 0.35)',
          },
          sx: {
            borderRadius: (theme) => `0 0 10px 10px`,
          },
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default ButtonPopover;
