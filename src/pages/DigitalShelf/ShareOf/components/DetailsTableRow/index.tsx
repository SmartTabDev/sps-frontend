import React, { useContext, useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import MainCell from 'components/Table/MainCell';
import CollapseButton from 'components/CollapseButton';
import { KeywordProduct } from 'types/KeywordProduct';
import { StyledTableRow } from 'components/Table/StyledTableRow';
import CollapseCell from 'components/Table/CollapseCell';
import { getSearchShareProductOverTime } from 'api/KPI/SearchShare/getSearchShareProductOverTime';
import { KeywordHistory } from 'components/Charts/KeywordHistory';
import { CategoryProduct } from 'types/CategoryProduct';
import { getCategoryShareProductOverTime } from 'api/KPI/CategoryShare/getCategoryShareProductOverTime';
import { ConfigContext } from 'contexts/ConfigContext';
import { CheckCircleOutline } from '@mui/icons-material';

const DetailsTableRow: React.FC<{
  el: KeywordProduct | CategoryProduct;
  $isGroupOdd: boolean;
  $isLast: boolean;
  getChartFor: 'KeywordProduct' | 'CategoryProduct';
  $isHighlighted: boolean;
}> = ({ el, $isLast, $isGroupOdd, getChartFor, $isHighlighted }) => {
  const { regionCode } = useContext(ConfigContext);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.cubeAccessToken);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [chart, setChart] = useState<{ [key: string]: number }[]>([]);

  useEffect(() => {
    let fn: any;

    switch (getChartFor) {
      case 'KeywordProduct':
        fn = getSearchShareProductOverTime;
        break;
      case 'CategoryProduct':
        fn = getCategoryShareProductOverTime;
        break;
      default:
        break;
    }
    const getData = async () => {
      if (typeof fn === 'function') {
        const data = await fn(token, regionCode, el);
        return data;
      }

      return [];
    };

    if (isOpen === true) {
      getData().then((data) => {
        setChart(data);
      });
    }
  }, [dispatch, token, el, isOpen, getChartFor, regionCode]);

  return (
    <>
      <StyledTableRow
        $isFirst={false}
        $isLast={$isLast}
        $isGroupOdd={$isGroupOdd}
        $noMiddleBorder
        $isOpen={isOpen}
      >
        <TableCell>{el.position}</TableCell>
        <TableCell
          sx={{
            svg: {
              fill: '#F2994A',
              width: '20px',
              display: 'inherit',
            },
          }}
        >
          {$isHighlighted ? (
            <>
              <CheckCircleOutline />
            </>
          ) : (
            ''
          )}
        </TableCell>
        <MainCell>
          <Link href={el.producturl} target="_blank">
            {el.name}
          </Link>
        </MainCell>
        <TableCell />

        <TableCell>
          <CollapseButton
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          />
        </TableCell>
      </StyledTableRow>

      <StyledTableRow $isLast={$isLast} $isGroupOdd={false}>
        <CollapseCell
          style={{
            boxShadow:
              'inset  0px 4px 4px rgba(0, 0, 0, 0.15),inset 0px -2px 5px rgba(0, 0, 0, 0.2)',
          }}
          colSpan={5}
          height={350}
          isOpen={isOpen}
          timeOut={300}
        >
          <KeywordHistory
            XAxisData={chart.map((item) => Object.keys(item))}
            data={chart.map((item) => Object.values(item)).flat()}
          />
        </CollapseCell>
      </StyledTableRow>
    </>
  );
};

export default DetailsTableRow;
