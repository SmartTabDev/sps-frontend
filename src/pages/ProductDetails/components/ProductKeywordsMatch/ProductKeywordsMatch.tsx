import React from 'react';
import { TableHeaderCell } from 'components/TableCell/TableCell';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { Typography, Box } from '@mui/material';
import LinearLoader from 'components/LinearLoader';
import { StyledTableCell } from './styles';
import KeywordList, { Keyword } from './components/KeywordList/KeywordList';

interface ProductKeywordMatchProps {
  productName: string;
  keywords: Keyword[];
  loading?: boolean;
}

const ProductKeywordMatch = ({
  productName,
  keywords,
  loading,
}: ProductKeywordMatchProps) => {
  return (
    <UnifyCard>
      <UnifyCardTitle tooltipProps={{ title: 'lorem ipsum' }}>
        Product keywords match
      </UnifyCardTitle>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={300}
        >
          <LinearLoader width={300} />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell $left>Product</TableHeaderCell>
                <TableHeaderCell $left>Title keywords match</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell width="40%">
                  <Typography fontSize="12px" fontWeight={600}>
                    {productName}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell width="60%">
                  <KeywordList keywords={keywords} />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </UnifyCard>
  );
};

export default ProductKeywordMatch;
