import React, { useCallback } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert, CameraAlt } from '@mui/icons-material';
import { Box } from '@mui/system';

type ChartMenuProps = {
  chartInstance: echarts.ECharts | null;
};

export const ChartMenu: React.FC<ChartMenuProps> = (props) => {
  const { chartInstance } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const CHART_MENU_CONTAINER_ID = 'chart-menu-container';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScreenshot = useCallback(() => {
    if (chartInstance !== null) {
      const base64DataUrl = chartInstance.getDataURL({
        type: 'png',
      });

      const chartMenuEl = document.getElementById(CHART_MENU_CONTAINER_ID);
      if (chartMenuEl !== null) {
        const downloadLinkEl = document.createElement('a');
        downloadLinkEl.href = base64DataUrl;
        downloadLinkEl.download = 'eye-level-chart.png';
        chartMenuEl.appendChild(downloadLinkEl);
        downloadLinkEl.click();
      }
    }
    handleClose();
  }, [chartInstance]);

  return (
    <Box id={CHART_MENU_CONTAINER_ID}>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleScreenshot}>
          <CameraAlt sx={{ mr: 1 }} />
          Screenshot
        </MenuItem>
      </Menu>
    </Box>
  );
};
