import React, { useState, useEffect } from 'react';
import TextButton from 'components/TextButton';
import { ActionProps } from 'pages/Notifications/types';
import { styled } from '@mui/system';
import ActionDialog from 'components/ActionDialog/ActionDialog';
import { useHistory } from 'react-router';

const StyledSecondaryAction = styled('span')`
  margin-right: 30px;
`;

const SecondaryAction: React.FC<ActionProps> = ({ action }) => {
  const [dialog, setDialog] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (redirect) {
      if (action?.handleClick) {
        const { handleClick } = action;
        handleClick();
      }

      if (action?.redirectTo) {
        history.push(action?.redirectTo);
      }
    }
  }, [redirect, history, action]);

  if (!action) {
    return null;
  }

  const { text } = action;

  return (
    <>
      <ActionDialog
        isOpen={dialog}
        handleClose={() => {
          setDialog(false);
        }}
        onDangerButtonClick={() => {
          setRedirect(true);
        }}
        title="Warning"
        color="danger"
        description="Are you sure you want to leave the page? The changes you made will not be saved."
        dangerButtonText="Leave"
      />
      <StyledSecondaryAction>
        <TextButton
          size="medium"
          onClick={() => {
            setDialog(true);
          }}
        >
          {text}
        </TextButton>
      </StyledSecondaryAction>

    </>
  );
};

export default SecondaryAction;
