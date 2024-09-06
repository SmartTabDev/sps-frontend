import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { ProductMonitorCellData } from 'pages/ProductMonitor/types';
import { styled, css } from '@mui/system';
import { ArrowDown, ArrowUp, Ban } from 'pages/SPS/components/Table/icons';
import IconsGrid from 'pages/SPS/components/Table/components/IconsGrid';
import BaseLink from 'components/BaseLink/BaseLink';
import { CellWrapper } from './CellWrapper';

interface Props {
  handleHover: (index?: number) => void;
  rowIndex: number;
  cell: ProductMonitorCellData;
}

interface TextProps {
  change?: 'higher' | 'lower' | null;
  isNA?: boolean;
}

const Text = styled('div', {
  shouldForwardProp: (prop) => prop !== 'change' && prop !== 'isNA',
})`
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  position: relative;
  color: #3b455e;

  ${({ change }: TextProps) =>
    change === 'higher' &&
    css`
      color: #28a745;
      font-weight: 700;
    `}

  ${({ change }: TextProps) =>
    change === 'lower' &&
    css`
      color: #eb5757;
      font-weight: 700;
    `}
`;

export const CellPrice: React.FC<Props> = ({ cell, rowIndex, handleHover }) => (
  <CellWrapper
    onMouseEnter={() => handleHover(rowIndex)}
    onMouseLeave={() => handleHover(undefined)}
    className={`row-index-${rowIndex}`}
    isOdd={rowIndex % 2 === 0}
    center
  >
    {cell === undefined ? (
      <Skeleton width={80} />
    ) : (
      <>
        {cell === null ? (
          <Text isNA>NA</Text>
        ) : (
          <>
            {typeof cell === 'object' && (
              <>
                <Text change={cell.change}>
                  <BaseLink href={cell.url} style={{ color: 'inherit' }}>
                    {cell.price}
                  </BaseLink>
                  <IconsGrid>
                    <div>
                      {cell.change === 'higher' && (
                        <ArrowUp title="Price change since previous run" />
                      )}
                      {cell.change === 'lower' && (
                        <ArrowDown title="Price change since previous run" />
                      )}
                    </div>
                    <div>
                      {!cell.available && <Ban title="Not available" />}
                    </div>
                  </IconsGrid>
                </Text>
              </>
            )}
            {['string', 'number'].includes(typeof cell) && <Text>{cell}</Text>}
          </>
        )}
      </>
    )}
  </CellWrapper>
);
