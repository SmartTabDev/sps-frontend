import React from 'react';
import { styled, css } from '@mui/system';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import noData from './no_data.png';
import noData2x from './no_data@2x.png';
import noData3x from './no_data@3x.png';

const StyledTypography = styled(Typography)`
  color: #525f81;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 24px;
  text-align: center;
`;

const StyledImg = styled('img')`
  width: 275px;
  margin-bottom: 21px;
`;

type Props = {
  show: boolean;
  text?: string;
  showImage?: boolean;
};

const defaultText = `We've searched high and low, left and right, but alas, there's just no data to be found for this particular period of time.`;

const NoData: React.FC<Props> = ({
  show,
  text = defaultText,
  showImage = true,
}) => (
  <Fade in={show}>
    <StyledBox sx={{ maxWidth: '460px' }}>
      {showImage && (
        <StyledImg
          src={noData}
          srcSet={`${noData}, ${noData2x} 2x, ${noData3x} 3x`}
          alt="no-data"
        />
      )}
      <StyledTypography>{text}</StyledTypography>
    </StyledBox>
  </Fade>
);

export default NoData;
