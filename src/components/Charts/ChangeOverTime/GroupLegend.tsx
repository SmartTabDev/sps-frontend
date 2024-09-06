import React from 'react';
import { styled } from '@mui/system';

const StyledGroupLegend = styled('div')`
  margin-left: 2%;
  left: 10px;
  bottom: 75px;
  position: absolute;
  font-size: 12px;
  color: #3b455e;
  width: 90%;
`;

const StyledLegend = styled('span')`
  margin-right: 20px;
  height: 20px;
  align-items: center;
  display: inline-flex;

  .line-with-circle {
    width: 18px;
    height: 0;
    border: 1px solid #3b455e;
    position: relative;
    margin-right: 20px;
  }

  .line-with-circle::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #3b455e;
    position: absolute;
    top: -3.5px;
    left: calc(50% - 3.5px);
  }

  .line-with-rect {
    width: 18px;
    height: 0;
    border: 1px solid #3b455e;
    position: relative;
    margin-right: 20px;
  }

  .line-with-rect::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 0;
    background-color: #3b455e;
    position: absolute;
    top: -4px;
    left: calc(50% - 4px);
  }

  .line-with-triangle {
    width: 18px;
    height: 0;
    border: 1px solid #3b455e;
    position: relative;
    margin-right: 20px;
  }

  .line-with-triangle::before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4px 8px 4px;
    border-color: transparent transparent #3b455e transparent;
    position: absolute;
    top: -4px;
    left: calc(50% - 4px);
  }

  .line-with-diamond {
    width: 18px;
    height: 0;
    border: 1px solid #3b455e;
    position: relative;
    margin-right: 20px;
  }

  .line-with-diamond::before {
    content: '';
    width: 5px;
    height: 5px;
    background-color: #3b455e;
    position: absolute;
    top: -2.5px;
    left: calc(50% - 2.5px);
    transform: rotate(45deg);
  }
`;

type Props = {
  data: { name: string; symbol: string }[];
};

const GroupLegend: React.FC<Props> = ({ data = [] }) => {
  return (
    <StyledGroupLegend>
      {data.map(({ name, symbol }) => (
        <StyledLegend key={name}>
          <div className={`line-with-${symbol}`} />
          <span style={{ color: '#525F81' }}>{name}</span>
        </StyledLegend>
      ))}
    </StyledGroupLegend>
  );
};

export default GroupLegend;
