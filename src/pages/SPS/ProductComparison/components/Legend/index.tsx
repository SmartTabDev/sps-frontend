import React, { useState, useCallback } from 'react';
import { styled, css } from '@mui/system';
import LegendLine, { LineStyles } from 'components/LegendLine';
import { Circle } from 'components/Circle/Circle';
import getRandomColor from 'utils/colors/getRandomColor';

const StyledWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-right: 25px;
  flex-wrap: wrap;
`;

const LegendItemWrapper = styled('span', {
  shouldForwardProp: (props) => props !== '$clickable',
})<{ $clickable: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 50px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'initial')};
`;

const TextWrapper = styled('span', {
  shouldForwardProp: (props) => props !== '$withMargin' && props !== '$color',
})<{ $color?: string; $withMargin?: boolean }>`
  display: inline-block;

  ${({ $withMargin }) => $withMargin
    && css`
      margin-right: 5px;
    `}

  ${({ $color }) => $color
    && css`
      color: $color;
    `}
`;

const StyledCircle = styled(Circle)`
  margin-right: 10px;
`;

type Props = {
  data: { name: string }[];
  textComponent: React.ComponentType;
  decoration: 'Line' | 'Circle';
  handleClick?: (item: string) => void;
};

const LegendItem: React.FC<
  Omit<Props & {
    name?: string;
    index: number;
  }, 'data'>
> = ({
  name,
  handleClick,
  textComponent: TextComponent,
  decoration,
  index,
}): JSX.Element => {
  const [isSelected, setSelected] = useState<boolean>(true);
  const handleLegendClick = useCallback(() => {
    if (handleClick && name) {
      handleClick(name);
      setSelected(!isSelected);
    }
  }, [name, isSelected, handleClick]);

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
      <TextWrapper $color={!isSelected ? '#828282' : ''}>
        <TextComponent>{name}</TextComponent>
      </TextWrapper>
    </LegendItemWrapper>
  ) : (
    <></>
  );
};

const Legend: React.FC<Props> = (props) => {
  const { data, textComponent: TextComponent } = props;
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
      {data.map((item, index) => (
        <LegendItem name={item?.name} key={index} index={index} {...props} />
      ))}
    </StyledWrapper>
  );
};

export default Legend;
