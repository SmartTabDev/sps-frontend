/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Rating from '@mui/material/Rating';
import { styled, css } from '@mui/system';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

type Props = {
  [key: string]: any;
  twoColors?: boolean;
  fillwith?: string;
};

type ColorConfigType = {
  [key: string]: any;
};

export const ColorConfig: ColorConfigType = {
  5: '#286DCB',
  4: '#4BD9EC',
  3: '#F2C94C',
  2: '#F2994A',
  1: '#EB5757',
};

function createCSS(props: Props) {
  let styles = '';

  Object.keys(ColorConfig)
    .reverse()
    .forEach((rating) => {
      if (props && props.value <= parseInt(rating, 10)) {
        styles += `
      fill: ${ColorConfig[rating]};
     `;
      }
    });

  return css`
    ${styles}
  `;
}

const StyledRating = styled(Rating)`
  margin-left: 5px;

  svg {
    ${(props: any) =>
      props.fillwith ? `fill: ${props.fillwith}` : createCSS(props)};
  }
`;

export const CustomRating: React.FC<Props> = ({
  children,
  twoColors,
  ...props
}) => (
  <StyledRating
    {...(props as any)}
    icon={<StarRoundedIcon fontSize="inherit" />}
    emptyIcon={
      <StarBorderRoundedIcon
        fontSize="inherit"
        style={twoColors ? { fill: '#BDBDBD' } : {}}
      />
    }
    precision={0.5}
    readOnly
  >
    {children}
  </StyledRating>
);
