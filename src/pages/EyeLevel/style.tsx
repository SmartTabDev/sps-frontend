import { styled } from '@mui/material/styles';
import { Tab } from '@mui/material';
import { getTrendColorByData } from 'utils/colors/getNumberColor';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

// ----------------------------------------------------------------------
type StyledSummaryItemProps = {
  smallPercent: number;
};

export const StyledSummaryItem = styled('div')<StyledSummaryItemProps>(
  ({ smallPercent, theme }) => ({
    flex: '1 1 0%',
    minWidth: 124,
    marginLeft: '48px',
    textAlign: 'center' as const,
    justifyContent: 'center',
    '& .smallPercent': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: getTrendColorByData(smallPercent),
      borderColor: getTrendColorByData(smallPercent),
      width: '34px',
      height: '34px',
      position: 'absolute',
      borderRadius: '50%',
      border: '2px solid',
      top: 0,
      left: 'calc(50% + 38px)',
      '> span:first-child': {
        color: 'inherit',
        fontSize: '14px',
        lineHeight: 1,
        fontWeight: 500,
      },
      '> span:last-child': {
        fontSize: '10px',
        lineHeight: 1,
      },
      '> .no-change': {
        fontSize: '16px !important',
      },
    },
    '> div': {
      position: 'relative',
      color: theme.palette.blueGrey[400],
      '> h3': {
        fontWeight: 700,
        color: theme.palette.blueGrey[400],
        fontSize: '44px',
        margin: '0',
        '> span': {
          color: theme.palette.blueGrey[400],
          fontSize: '26px',
        },
      },
    },
    '> p': {
      textTransform: 'uppercase',
      margin: '0',
      color: theme.palette.blueGrey[400],
      marginTop: '8px',
    },
  })
);

export const StyledSpan = styled('span')`
  min-width: 100px;
`;

export const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '500',
  textTransform: 'none',
  minWidth: 'unset',
  minHeight: 'unset',
  padding: 0,
  margin: '0 5px',
  fontSize: '11px',
  '&.Mui-selected, &:hover': {
    fontWeight: 700,
  },
}));

export const StyledAccordion = styled(MuiAccordion)(({ expanded, theme }) => ({
  minWidth: 'fit-content',
  borderTop: 0,
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root': {
    boxShadow: !expanded
      ? `0px 0px 4px -1px ${theme.palette.grey[300]}`
      : `0px 4px 7px 0px ${theme.palette.grey[300]}`,
  },
}));

export const StyledAccordionSummary = styled(MuiAccordionSummary)(
  ({ theme }) => ({
    flexDirection: 'row-reverse',
    padding: '0 34px 0 17px',
    justifyContent: 'flex-end',
    boxShadow: `0px 4px 7px 0px ${theme.palette.grey[300]}`,
    '& .MuiAccordionSummary-expandIconWrapper': {
      width: 20,
      svg: {
        width: 20,
      },
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
      margin: '6px 0 6px 13px',
      color: theme.palette.blueGrey[400],
      '& >div >span': {
        fontWeight: '500',
        fontSize: 14,
      },
    },
  })
);

export const StyledAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    padding: '13px 34px 13px 17px',
    color: theme.palette.blueGrey[400],
    background: theme.palette.grey[50],
  })
);
