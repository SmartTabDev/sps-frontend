import React from 'react';
import { styled } from '@mui/system';
import PanelTitle from 'components/PanelTitle';
import Panel from 'components/Panel';
import { TotalsUnavailable } from 'reducers/productAvailability';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

const StyledDataBox = styled(Panel)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 0px;
  max-height: 300px;
  background-color: ${({ theme }) => theme.palette.common.white};
  width: 100%;
`;

const StyledTableCell = styled(TableCell)`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  border: none;
`;

const StyledPanelTitle = styled(PanelTitle)`
  text-align: left;
  padding-bottom: 5px;
`;

const StyledTableHead = styled(TableHead)`
  th {
    font-weight: bold;
    bottom-border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  }
`;

type Props = {
  data: TotalsUnavailable[];
  isLoading: boolean;
};

const TotalUnavailable: React.FC<Props> = ({ data, isLoading }) => (
  <StyledDataBox>
    {isLoading ? (
      <LoaderWrapper>
        <LinearLoader width={300} />
      </LoaderWrapper>
    ) : (
      <>
        <StyledPanelTitle>Recent unavailable products</StyledPanelTitle>
        <TableContainer>
          <Table aria-label="simple table">
            <StyledTableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Retailer</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {data.map(
                ({ productname, retailername, categoryname, url }, index) => (
                  <TableRow key={index}>
                    <StyledTableCell style={{ fontWeight: 700 }}>
                      <Link href={url} target="_blank">
                        {productname}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{retailername}</StyledTableCell>
                    <StyledTableCell>{categoryname}</StyledTableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )}
  </StyledDataBox>
);

export default TotalUnavailable;
