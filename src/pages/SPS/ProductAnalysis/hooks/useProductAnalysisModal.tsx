import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useProductAnalysisModal = ({
  openAction,
}: {
  openAction: () => void;
}): {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
} => {
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
    dispatch(openAction());
  }, [dispatch, openAction]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
  };
};
