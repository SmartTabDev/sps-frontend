import React from 'react';
import { Box, Typography, Unstable_Grid2 as Grid2 } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getChartColorColor } from 'utils/colors/getColorProgressBar';
import SlideOut from '../../../components/SlideOut/SlideOut';
import { useEyeLevelThresholdsConfig } from 'api/hooks/useEyeLevelThresholdsConfig';
import LinearLoader from 'components/LinearLoader';
import { EyeLevelThresholds } from '../types';

type ColorCodingRowProps = {
  title: string;
  data: EyeLevelThresholds[];
  labels: string[];
  sx?: object;
};

type ColorCodingCellProps = {
  label: string;
  color: 'success' | 'warning' | 'danger';
};

const ColorCodingCell: React.FC<ColorCodingCellProps> = (props) => {
  const { color, label } = props;
  const { palette } = useTheme();

  return (
    <Grid2 container alignItems="center">
      <Box
        sx={{
          width: 15,
          height: 15,
          backgroundColor: getChartColorColor(color),
        }}
      />
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: '22px',
          color: palette.blueGrey[400],
          ml: 1,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
    </Grid2>
  );
};

const getCompareOperator = (data?: EyeLevelThresholds) => {
  if (data === undefined) {
    return [`>= 0%`, `>= 0%`, `< 0%`];
  } else if (data.high.to > data.mid.to) {
    return [
      `>= ${data.high.from}%`,
      `>= ${data.mid.from}%`,
      `< ${data.low.to}%`,
    ];
  } else {
    return [`<= ${data.high.to}%`, `<= ${data.mid.to}%`, `> ${data.low.from}%`];
  }
};

const ColorCodingRow: React.FC<ColorCodingRowProps> = (props) => {
  const { title, data, sx, labels } = props;

  return (
    <Box px={5.25} py={2.5} {...{ sx }}>
      <Typography
        sx={{
          textTransform: 'uppercase',
          fontSize: '1.25rem',
          lineHeight: 1.1,
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      {labels.map((label, index) => {
        const compareOperator = getCompareOperator(data?.[index]);
        return (
          <Box mt={2} key={Math.random()}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontSize: 14,
                lineHeight: '22px',
                fontWeight: 600,
              }}
            >
              {label}
            </Typography>
            <Grid2 container alignItems="center" justifyContent="space-between">
              <ColorCodingCell
                label={`${compareOperator[0]}`}
                color="success"
              />
              <ColorCodingCell
                label={`${compareOperator[1]}`}
                color="warning"
              />
              <ColorCodingCell label={`${compareOperator[2]}`} color="danger" />
            </Grid2>
          </Box>
        );
      })}
    </Box>
  );
};

export const ColorCodingPanel = () => {
  const { data: dataThresholds, isLoading } = useEyeLevelThresholdsConfig({
    // TODO: update configId
    configId: 37,
  });
  const { palette } = useTheme();

  return (
    <SlideOut
      sx={{ top: '50% !important', zIndex: 1999 }}
      paperProps={{
        width: 350,
        top: '-50vh',
        height: '100vh',
      }}
      hideOnOutsideClick
    >
      <Box mx="-14px">
        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ height: '420px' }}
          >
            <LinearLoader width={300} text="Loading data..." />
          </Box>
        ) : dataThresholds === undefined ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ height: '420px' }}
          >
            <Typography>Unexpected error.</Typography>
          </Box>
        ) : (
          <>
            <ColorCodingRow
              sx={{ backgroundColor: palette.common.white }}
              title="General"
              labels={['AVG']}
              data={[dataThresholds.general.avg]}
            />

            <ColorCodingRow
              sx={{ backgroundColor: palette.tableBackground.main }}
              title="Shelf"
              labels={['AVAILABLE', 'LISTED', 'OUT OF STOCK']}
              data={[
                dataThresholds.shelf.available,
                dataThresholds.shelf.listed,
                dataThresholds.shelf['out-of-stock'],
              ]}
            />

            <ColorCodingRow
              sx={{ backgroundColor: palette.common.white }}
              title="Content"
              labels={[
                'AVG',
                'P-SHOT MATCH',
                '# IMAGES',
                'BULLETS',
                'RICH CONTENT',
              ]}
              data={[
                dataThresholds.content.avg,
                dataThresholds.content['packshot-match'],
                dataThresholds.content['num-images'],
                dataThresholds.content.bullets,
                dataThresholds.content['rich-content'],
              ]}
            />

            <ColorCodingRow
              sx={{ backgroundColor: palette.tableBackground.main }}
              title="Ratings & reviews"
              labels={['R&R', 'RATING', '# REVIEWS']}
              data={[
                dataThresholds['ratings-and-reviews']['ratings-and-reviews'],
                dataThresholds['ratings-and-reviews'].ratings,
                dataThresholds['ratings-and-reviews'].reviews,
              ]}
            />

            <ColorCodingRow
              sx={{ backgroundColor: palette.common.white }}
              title="Search"
              labels={['SHARE/FAIR SHARE']}
              data={[dataThresholds.search['search-fair-trade']]}
            />
          </>
        )}
      </Box>
    </SlideOut>
  );
};
