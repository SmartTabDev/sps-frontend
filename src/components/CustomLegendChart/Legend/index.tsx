import React, { useCallback } from 'react';
import { styled } from '@mui/system';
import LegendLine, { LineStyles } from 'components/LegendLine';
import { Circle } from 'components/Circle/Circle';
import { Point } from 'components/Point/Point';
import getRandomColor from 'utils/colors/getRandomColor';
import { LegendStateItem } from '../types';

const StyledWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const LegendItemWrapper = styled('span', {
  shouldForwardProp: (props) => props !== '$clickable',
})<{ $clickable: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'initial')};
`;

const TextWrapper = styled('span', {
  shouldForwardProp: (props) => props !== '$color' && props !== '$withMargin',
})<{ $color?: string; $withMargin?: boolean }>`
  display: inline-block;
  margin-right: ${({ $withMargin }) => ($withMargin ? '5px' : '0px')};
  color: ${({ $color }) => $color || 'inherit'};
`;

const StyledCircle = styled(Circle)`
  margin-right: 10px;
`;

const StyledPoint = styled(Point)`
  margin-right: 10px;
  background: black;
`;

type Props = {
  data: LegendStateItem[];
  textComponent: React.ComponentType;
  decoration: 'Line' | 'Circle' | 'Point';
  handleClick?: (item: string) => void;
  showData: boolean;
};

const LegendItem: React.FC<
  Props & {
    name?: string;
    isSelected: boolean;
    index: number;
  }
> = ({
  name,
  handleClick,
  textComponent: TextComponent,
  decoration,
  index,
  isSelected,
}): JSX.Element => {
  const handleLegendClick = useCallback(() => {
    if (handleClick && name) {
      handleClick(name);
    }
  }, [name, handleClick]);

  return name ? (
    <LegendItemWrapper
      onClick={handleLegendClick}
      $clickable={Boolean(handleClick)}
    >
      {decoration === 'Line' && (
        <LegendLine $color="#000000" $width="40px" $type={LineStyles[index]} />
      )}
      {decoration === 'Circle' && (
        <StyledCircle
          $size="15px"
          $color={isSelected ? getRandomColor(index) : '#BDBDBD'}
        />
      )}
      {decoration === 'Point' && (
        <StyledPoint
          $size="13px"
          $color={isSelected ? getRandomColor(index) : '#BDBDBD'}
        />
      )}
      <TextWrapper $color={isSelected ? '#000000' : '#BDBDBD'}>
        <TextComponent>{name}</TextComponent>
      </TextWrapper>
    </LegendItemWrapper>
  ) : (
    <></>
  );
};

const Legend: React.FC<Props> = (props) => {
  const {
    data, textComponent: TextComponent, children, showData,
  } = props;
  const amount = data.filter(Boolean).length;

  if (amount === 0) {
    return (
      <TextWrapper $withMargin>
        <TextComponent>
          {amount}
          {' '}
          Products
        </TextComponent>
      </TextWrapper>
    );
  }

  return (
    <StyledWrapper>
      {children}
      {showData
        ? data.map((item, index) => (
          <LegendItem
            name={item?.name}
            isSelected={item?.isSelected}
            key={index}
            index={index}
            {...props}
          />
        ))
        : null}
    </StyledWrapper>
  );
};

export default Legend;
