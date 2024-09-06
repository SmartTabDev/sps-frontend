import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { NA } from 'components/Recaps/RecapCard.styled';
import TrendValue from 'components/Recaps/components/TrendValue/TrendValue';
import { RecapCardValues } from 'components/Recaps/utils/types';
import { Stack, styled, TypographyProps } from '@mui/system';
import Typography from '@mui/material/Typography';
import Symbol from 'components/Recaps/components/Symbol/Symbol';
import { Grid } from '@mui/material';

const Value = styled(Typography, {
  shouldForwardProp: (props) => props !== '$color',
})<{
  $color: string;
}>`
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  letter-spacing: 0.04em;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: baseline;
  line-height: initial;
`;

type RecapValuesProps = {
  values: RecapCardValues[] | undefined;
  color?: string;
  namePosition?: 'left' | 'right';
  Name: React.FC<TypographyProps>;
  useTrendColor?: boolean;
};

const RecapValues: React.FC<RecapValuesProps> = ({
  values,
  color = '#3B455E',
  namePosition = 'right',
  Name,
  useTrendColor,
}) => {
  const isNA = values === undefined || values.length === 0;

  return (
    <>
      {isNA ? <NA>N/A</NA> : null}
      {!isNA && values && values.length ? (
        <List disablePadding>
          {values.map((v) => {
            const { name, value, trendValue, positive } = v;

            const isPercentage = String(value).includes('%');
            const finalRecapValue = String(value).replace('%', '');

            return (
              <ListItem key={`${v.name}`} disablePadding sx={{ width: '100%' }}>
                <Grid
                  direction="row"
                  spacing="16px"
                  alignItems="center"
                  container
                >
                  {namePosition === 'left' ? (
                    <Grid item xs={6}>
                      <Name>{name}:</Name>
                    </Grid>
                  ) : null}
                  <Grid item xs={6}>
                    <Stack spacing="6px" direction="row" alignItems="center">
                      <Value $color={color}>
                        {finalRecapValue}
                        {isPercentage ? (
                          <Symbol $size="12px" $weight={600}>
                            %
                          </Symbol>
                        ) : null}
                      </Value>
                      {trendValue !== undefined && (
                        <TrendValue
                          value={trendValue}
                          positive={positive}
                          usePlusMinus
                          useTrendColor={useTrendColor}
                          bold
                          size="small"
                        />
                      )}
                    </Stack>
                  </Grid>
                  {namePosition === 'right' ? (
                    <Grid item xs={6}>
                      <Name>{name}</Name>
                    </Grid>
                  ) : null}
                </Grid>
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </>
  );
};

export default RecapValues;
