import React from 'react';
import Popper, { PopperProps } from '@mui/material/Popper';
import { useTheme } from '@mui/system';
import LightTheme from 'theme/index';

type Props = PopperProps;

const CustomPopper: React.FC<Props> = (props) => {
  const theme: any = useTheme(LightTheme);
  const { style, ...restProps } = props;

  return (
    <Popper
      {...restProps}
      style={{
        ...style,
        zIndex: theme.zIndex.drawer + 1,
      }}
    />
  );
};

export default CustomPopper;
