import React from 'react';
import { styled } from '@mui/system';
import TableHead from '@mui/material/TableHead';

type Props = {
  borderColor?: string;
  fontWeight?: string;
  fontSize?: string;
  textUppercase?: boolean;
  display?: string;
  width?: string;
};

const CustomizedTableHead = styled(TableHead, {
  shouldForwardProp: (props) => props !== '$borderColor',
})<{
  $borderColor?: string;
  $fontWeight?: string;
  $fontSize?: string;
  $textUppercase?: boolean;
  $display?: string;
  $width?: string;
}>`
  th {
    font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
    font-size: ${({ $fontSize }) => $fontSize || '16px'};
    border-bottom: 1px solid
      ${({ theme, $borderColor }) => $borderColor || theme.palette.grey[400]};
    padding: 36px 30px 10px 30px;
    background: ${({ theme }) => theme.palette.common.white};
    ${({ $textUppercase }) => $textUppercase && 'text-transform: uppercase;'};
    ${({ $display }) => $display && `display: ${$display};`}
    ${({ $width }) => $width && `width: ${$width};`}
  }
`;

export const StyledTableHead: React.FC<Props> = ({
  children,
  borderColor,
  fontWeight,
  fontSize,
  textUppercase,
  display,
  width,
  ...props
}) => (
  <CustomizedTableHead
    $fontWeight={fontWeight && fontWeight}
    $fontSize={fontSize && fontSize}
    $borderColor={borderColor && borderColor}
    $textUppercase={textUppercase && textUppercase}
    $display={display && display}
    $width={width && width}
    {...props}
  >
    {children}
  </CustomizedTableHead>
);
