import { IconButton } from '@mui/material';
import React from 'react';
import DownloadIcon from '@mui/icons-material/DownloadSharp';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { useTheme } from '@mui/material/styles';

interface ExcelDownloadButtonProps {
  gridApiRef: React.MutableRefObject<GridApiPremium>;
}

export const ExcelDownloadButton = ({
  gridApiRef,
}: ExcelDownloadButtonProps) => {
  const { palette } = useTheme();
  const downloadExcelFile = () => {
    gridApiRef.current.exportDataAsExcel();
  };
  return (
    <IconButton onClick={downloadExcelFile}>
      <DownloadIcon sx={{ fontSize: '18px', color: palette.blueGrey[400] }} />
    </IconButton>
  );
};
