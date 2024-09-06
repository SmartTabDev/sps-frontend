import React from 'react';
import { Box, Stack, styled } from '@mui/system';
import {
  CheckCircleOutlined,
  WarningOutlined,
  RemoveOutlined,
  DangerousRounded,
} from '@mui/icons-material';
import { inRange } from 'lodash';
import BaseCell from '../BaseCell/BaseCell';

const StyledCell = styled(BaseCell)`
  font-family: Lato;
  font-size: 12px;
`;

const IndexCell: React.FC<{
  value: number | undefined;
  noData: boolean;
}> = ({ value, noData }) => {
  if (noData || value === undefined) {
    return (
      <>
        <RemoveOutlined
          sx={{ width: '12px', height: '12px', fill: '#5D81B4' }}
        />
      </>
    );
  }

  const successColor = '#219653';
  const warnColor = '#F2994A';
  const dangerColor = '#EB5757';

  const dangerLimit = 65.99;
  const warnLimit = 84.99;
  const success = value >= warnLimit;
  const warn = inRange(value, dangerLimit, warnLimit);
  const danger = inRange(value, 1, dangerLimit);

  const style = {
    ...(success ? { color: successColor, fontWeight: 700 } : {}),
    ...(warn ? { color: warnColor, fontWeight: 700 } : {}),
    ...(danger ? { color: dangerColor, fontWeight: 700 } : {}),
  };

  return (
    <StyledCell sx={style}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box>{value}</Box>
        {success && (
          <CheckCircleOutlined
            sx={{ width: '12px', height: '12px', fill: successColor }}
          />
        )}
        {warn && (
          <WarningOutlined
            sx={{ width: '12px', height: '12px', fill: warnColor }}
          />
        )}
        {danger && (
          <DangerousRounded
            sx={{ width: '12px', height: '12px', fill: dangerColor }}
          />
        )}
      </Stack>
    </StyledCell>
  );
};

export default IndexCell;
