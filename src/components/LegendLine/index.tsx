import Box from '@mui/material/Box';
import { styled, css } from '@mui/system';

export const LineStyles = ['solid', 'dashed', 'dotted'] as const;
export type LegendLineStyle = typeof LineStyles[number];

type Props = {
  $color: string;
  $type?: LegendLineStyle;
  $width?: string;
};

const LegendLine = styled(Box, {
  shouldForwardProp: (props) =>
    props !== '$color' && props !== '$type' && props !== '$width',
})<Props>`
  height: 3px;
  width: ${({ $width }) => $width};
  margin-right: 10px;
  background-color: ${({ $color }) => $color};

  ${({ $type, $color, $width, theme }) =>
    $type === 'dashed' || $type === 'dotted'
      ? css`
          background-color: ${theme.palette.common.white};
          position: relative;

          &::after {
            content: '';
            left: 0;
            display: block;
            background-color: transparent;
            width: ${$width};
            position: absolute;
            border: 2px ${$type} ${$color};
            z-index: 2;
            color: black;
            text-align: right;
          }
        `
      : ''};
`;

LegendLine.defaultProps = {
  $type: 'solid',
  $width: '77px',
};

export default LegendLine;
