import React, { useEffect, useState } from 'react';
import LoaderWrapper from 'components/LoaderWrapper';
import LinearLoader from 'components/LinearLoader';
import { styled } from '@mui/system';
import { Product } from 'types/Product';
import { Row, TableView } from 'types/SPSTable';
import NoData from 'components/NoData';
import { ProductComparisonView } from 'reducers/productComparison/productComparison';
import { includeLowerCase } from 'utils/includeLowerCase';
import { buildSPSTable } from '../../processing/buildSPSTable';
import FnTable from '../../ProductComparisonTable';

const StyledLoaderWrapper = styled(LoaderWrapper)`
  margin-top: 30px;
`;

const StyledWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$elementsSize',
})<{ $elementsSize?: number }>`
  height: calc(
    100vh - 180px
      ${({ $elementsSize }) => ($elementsSize ? ` - ${$elementsSize}px` : '')}
  );
  background-image: linear-gradient(
    45deg,
    #ffffff 25%,
    #f6f7f8 25%,
    #f6f7f8 50%,
    #ffffff 50%,
    #ffffff 75%,
    #f6f7f8 75%,
    #f6f7f8 100%
  );
  background-size: 2.83px 2.83px;
  .TopRightGrid_ScrollWrapper {
    &::after {
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.palette.grey[400]};
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .ReactVirtualized__Grid {
      background: white !important;
    }
  }
  .ReactVirtualized__Grid {
    &:focus {
      outline: none;
    }
  }
`;

type ContentProps = {
  isLoading: boolean;
  data: Product[];
  noDataText: string;
  filter?: string;
  view: TableView;
  dates: string[];
  showBy?: ProductComparisonView;
  handleOpenModal?: () => void;
  elementsSize?: number;
};

const Wrapper: React.FC<ContentProps> = ({
  isLoading,
  data,
  noDataText,
  filter,
  view,
  dates,
  showBy = 'Product',
  handleOpenModal,
  elementsSize = 0,
}): JSX.Element => {
  const [table, setTable] = useState<Row[]>([]);
  const [filteredTable, setFilteredTable] = useState<Row[]>([]);
  const [isTableBuilding, setTableBuilding] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading === false) {
      setTableBuilding(true);
      const newList = buildSPSTable({
        view,
        data,
        dates,
        showBy,
      });

      setTable(newList);
      setTableBuilding(false);
    } else {
      setTableBuilding(true);
    }
  }, [isLoading, data, view, dates, showBy]);

  useEffect(() => {
    let finalTable: Row[] = table;
    if (filter) {
      const [topRow, ...rows] = table;
      if (topRow) {
        const index = showBy === 'Product' ? 0 : 1;
        finalTable = [
          topRow,
          ...rows.filter((row) => {
            if (row.length && row[index]) {
              const productName = String(row[index]?.data);
              return includeLowerCase(productName, filter);
            }

            return false;
          }),
        ];
      }
      setFilteredTable(finalTable);
    } else {
      setFilteredTable(table);
    }
  }, [filter, table, showBy]);

  if (isTableBuilding) {
    return (
      <StyledLoaderWrapper>
        <LinearLoader width={300} text="Building your data table" />
      </StyledLoaderWrapper>
    );
  }

  if (filteredTable.length <= 1) {
    return (
      <NoData show={Boolean(filteredTable.length <= 1)} text={noDataText} />
    );
  }

  return (
    <StyledWrapper $elementsSize={elementsSize}>
      {table.length > 0 ? (
        <FnTable
          list={filteredTable}
          handleOpenModal={handleOpenModal}
          isDense={false}
          isIndex={false}
          showBy={showBy}
          key={showBy}
        />
      ) : (
        <></>
      )}
    </StyledWrapper>
  );
};

export default Wrapper;
