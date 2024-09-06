import { Theme } from '@mui/material/styles';

const createDataGridOverrides = (theme: Theme) => ({
  root: {
    border: 0,
    boxShadow:
      '0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15)',
    borderRadius: theme.shape.borderRadius * 2.5,
    borderColor: 'transparent',
    color: '#525f81',

    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within':
      {
        outline: 'none',
      },

    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
      outline: 'none',
    },

    '& .MuiDataGrid-columnHeaderTitleContainer': {
      padding: 0,
    },

    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },

    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: '700',
      fontSize: '14px',
    },

    '& .MuiDataGrid-cell': {
      borderBottom: 'none',
      fontWeight: '600',
    },

    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
      paddingTop: '4px',
      paddingBottom: '4px',
    },

    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
      paddingTop: '6px',
      paddingBottom: '6px',
    },

    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
      paddingTop: '8px',
      paddingBottom: '8px',
    },

    '.MuiDataGrid-row.Mui-hovered, .MuiDataGrid-row:hover': {
      backgroundColor: '#DCE8F9',
    },

    '& .MuiDataGrid-groupingCriteriaCell.MuiBox-root': {
      marginLeft: '0px',
    },

    '& .MuiDataGrid-groupingCriteriaCellToggle': {
      marginRight: '8px',
    },

    '.featuredRow .MuiDataGrid-cell': {
      backgroundColor: '#F1F6FD',
      color: '#3B455E',
    },
  },
});

export default function DataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: createDataGridOverrides(theme),
    },
    MuiDataGridPremium: {
      styleOverrides: createDataGridOverrides(theme),
    },
  };
}
