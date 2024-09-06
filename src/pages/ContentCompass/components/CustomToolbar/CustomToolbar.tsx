import * as React from 'react';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from '@mui/x-data-grid-premium';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
