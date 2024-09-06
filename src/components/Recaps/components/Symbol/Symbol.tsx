import { styled } from '@mui/system';

const Symbol = styled('span', {
  shouldForwardProp: (props) =>
    props !== '$size' && props !== '$weight' && props !== '$spacing',
})<{ $size: string; $weight: number; $spacing?: number }>`
      font-size: ${({ $size }) => $size};
      color: inherit;
      font-weight: ${({ $weight }) => $weight};
      padding: 0;
      margin: 0;
      margin-left: ${({ $spacing = 1 }) => $spacing}px;
      line-height: initial;
    }
    `;

export default Symbol;
