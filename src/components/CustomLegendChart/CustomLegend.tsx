import React, { useCallback, useEffect, useReducer } from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import TextButton from 'components/TextButton';
import Legend from './Legend';
import { LegendAction, LegendState } from './types';

const ButtonsWrapper = styled('div')`
  margin-right: 25px;
  margin-bottom: 5px;
`;

const StyledTypography = styled(Typography)`
  font-size: 14px;
`;

const LegendWrapper = styled('div')`
  margin-top: 25px;
`;

const StyledDivider = styled('span')`
  margin: 0 7px;
`;

type Props = {
  echarts?: echarts.ECharts;
  data: { name: string }[];
  showData: boolean;
};

const initialState: LegendState = { items: [] };

function reducer(state: LegendState, action: LegendAction) {
  switch (action.type) {
    case 'load':
      return { ...state, items: action.payload.items };
    case 'toggle':
      return {
        ...state,
        items: state.items.map((i) => (action.payload.name === i.name
          ? { ...i, isSelected: !i.isSelected }
          : i)),
      };
    case 'selectAll':
      return {
        ...state,
        items: state.items.map((i) => ({ ...i, isSelected: true })),
      };
    case 'deselectAll':
      return {
        ...state,
        items: state.items.map((i) => ({ ...i, isSelected: false })),
      };
    default:
      return state;
  }
}

const CustomLegend: React.FC<Props> = ({ echarts, data, showData }): JSX.Element => {
  const [{ items }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'load',
      payload: { items: data.map((i) => ({ ...i, isSelected: true })) },
    });
  }, [data]);

  const handleRetailerClick = useCallback(
    (name: string) => {
      if (echarts) {
        echarts.dispatchAction({
          type: 'legendToggleSelect',
          name,
        });
        dispatch({
          type: 'toggle',
          payload: { name },
        });
      }
    },
    [echarts],
  );

  const handleSelectAll = useCallback(() => {
    if (echarts) {
      echarts.dispatchAction({
        type: 'legendAllSelect',
      });
      dispatch({
        type: 'selectAll',
      });
    }
  }, [echarts]);

  const handleDeselectAll = useCallback(() => {
    if (echarts) {
      const names = items.map((i) => i.name);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < names.length; i++) {
        const name = names[i];

        echarts.dispatchAction({
          type: 'legendUnSelect',
          name,
        });
      }

      dispatch({
        type: 'deselectAll',
      });
    }
  }, [echarts, items]);

  return (
    <>
      {items && items.length ? (
        <LegendWrapper>
          <Legend
            data={items}
            textComponent={StyledTypography}
            decoration="Point"
            handleClick={handleRetailerClick}
            showData={showData}
          >
            <ButtonsWrapper>
              <TextButton onClick={handleSelectAll}>Select all</TextButton>
              <StyledDivider>
                |
              </StyledDivider>
              <TextButton onClick={handleDeselectAll}>Deselect all</TextButton>
            </ButtonsWrapper>
          </Legend>
        </LegendWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomLegend;
