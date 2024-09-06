import React from 'react';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { StyledTableHead } from 'components/Table/StyledTableHead';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import DetailsTableRow from 'pages/DigitalShelf/ShareOf/components/DetailsTableRow';

type Props<T> = {
  filteredProducts: T[];
  isLoading: boolean;
  getChartFor: 'KeywordProduct' | 'CategoryProduct';
  clientPositions: number[];
};

export const DetailsTable = <T,>({
  filteredProducts,
  isLoading,
  getChartFor,
  clientPositions,
}: Props<T>): JSX.Element => {
  if (isLoading) {
    return <FullWidthLinearLoader width={300} text="Building your table" />;
  }
  return (
    <TableContainer style={{ maxHeight: 'calc(100vh - 160px)' }}>
      <Table stickyHeader aria-label="spanning table">
        <colgroup>
          <col width="5%" />
          <col width="1%" />
          <col width="34%" />
          <col width="50%" />
          <col width="10%" />
        </colgroup>
        <StyledTableHead>
          <TableRow>
            <TableCell style={{ paddingRight: 0 }}>Rank</TableCell>
            <TableCell />
            <TableCell>Product</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {filteredProducts.map((el: any, index: number) => (
            <DetailsTableRow
              $isLast={index + 1 === filteredProducts.length}
              $isGroupOdd={index % 2 === 0}
              $isHighlighted={clientPositions.includes(index)}
              el={el}
              key={index}
              getChartFor={getChartFor}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
