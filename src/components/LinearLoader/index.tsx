import React from 'react';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export type LinearLoaderProps = {
  width?: number | string;
  text?: string;
  [key: string]: any;
};

const FullWidthLoaderWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;

const LinearLoaderWrapper = styled('div')<LinearLoaderProps>`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[500]};

  ${({ width }) =>
    width && `width: ${typeof width === 'number' ? `${width}px` : width};`}
`;

const Progress = styled(LinearProgress)``;

const LinearLoader: React.FC<LinearLoaderProps> = ({
  text,
  width = 300,
  ...props
}) => {
  const { palette } = useTheme();
  return (
    <LinearLoaderWrapper width={width} {...props}>
      <Progress />
      {text && (
        <Typography
          mt="10px"
          fontSize="10px"
          lineHeight="14px"
          color={palette.blueGrey[400]}
          fontWeight={600}
          textAlign="center"
        >
          {text}
        </Typography>
      )}
    </LinearLoaderWrapper>
  );
};

export const FullWidthLinearLoader: React.FC<LinearLoaderProps> = (props) => (
  <FullWidthLoaderWrapper>
    <LinearLoader {...props} />
  </FullWidthLoaderWrapper>
);

export default LinearLoader;
