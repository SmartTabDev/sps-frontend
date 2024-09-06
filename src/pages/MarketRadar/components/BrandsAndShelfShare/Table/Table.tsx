import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/system/Stack';
import { UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import { TopBrandsTableRow } from 'pages/MarketRadar/hooks/useBrandsAndShelfShare';
import { formatPercentage } from 'utils/formatPercentage';

type TopBrandsTableProps = {
  data: TopBrandsTableRow[];
};

const TopBrandsTable: React.FC<TopBrandsTableProps> = ({ data = [] }) => {
  return (
    <Stack spacing="12px">
      <UnifyCardTitle sx={{ fontWeight: 500, fontSize: '14px' }}>
        Top 3 brands
      </UnifyCardTitle>
      <TableContainer sx={{ maxHeight: '600px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">Retailer</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Brand</TableCell>
              <TableCell align="right">% Share</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              ({ brandname, retailername, categoryname, share, isOdd }) => {
                return (
                  <TableRow
                    key={`${retailername}-${categoryname}-${brandname}`}
                    sx={{
                      background: isOdd ? 'rgb(241, 246, 253)' : '',
                    }}
                  >
                    <TableCell sx={{ border: 'none' }}>
                      {retailername}
                    </TableCell>
                    <TableCell sx={{ border: 'none' }}>
                      {categoryname}
                    </TableCell>
                    <TableCell sx={{ border: 'none' }}>{brandname}</TableCell>
                    <TableCell sx={{ border: 'none', textAlign: 'right' }}>
                      {formatPercentage(share)}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TopBrandsTable;
