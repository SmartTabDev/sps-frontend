import React from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { TableContainer } from '@mui/material';
import TableCell from '@mui/material/TableCell';

const StyledAttributesTable = styled(Table)`
  table-layout: auto;
  margin-top: 12px;
  width: auto;
`;

const AttributeTd = styled(TableCell)`
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: none;
`;

const AttributeNameTd = styled(AttributeTd)`
  padding-right: 20px;
`;

export const AttributesTable: React.FC = ({ children }) => (
  <TableContainer>
    <StyledAttributesTable>
      <TableBody>{children}</TableBody>
    </StyledAttributesTable>
  </TableContainer>
);

const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  font-size: 14px;
  line-height: 1.2;
`;

const Name = styled(Typography)`
  color: ${({ theme }) => theme.palette.tableIconsInactive};
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
`;

export type AttributesTableRowProps = {
  name: string;
  value?: string | number | React.ReactElement;
};

export const AttributesTableRow: React.FC<AttributesTableRowProps> = ({
  name,
  value,
}) =>
  value ? (
    <TableRow>
      <AttributeNameTd padding="none">
        <Name>{name}:</Name>
      </AttributeNameTd>
      <AttributeTd padding="none">
        <Value>{value}</Value>
      </AttributeTd>
    </TableRow>
  ) : (
    <></>
  );
