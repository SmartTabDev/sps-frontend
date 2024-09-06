import React, { useState } from 'react';
import {
  Stack,
  Tabs,
  IconButton,
  Unstable_Grid2 as Grid2,
} from '@mui/material';
import { DownloadSharp as DownloadIcon } from '@mui/icons-material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import { Box } from '@mui/system';
import LinearLoader from 'components/LinearLoader';
import SingleDayPicker from 'components/SingleDayPicker/SingleDayPicker';
import { TabPanel } from '../../components/TabPanel';
import { AverageSummary } from './components/AverageSummary';
import { BarLineChart } from './components/Charts/BarLineChart';
import { StyledTab } from './style';
import { ChartMenu } from './components/ChartMenu';
import { ColorCodingPanel } from './components/ColorCodingPanel';
import RetailerAccordionList from './components/RetailerAccordionList';
import { useEyeLevelChartData } from './hooks/useEyeLevelChartData';
import { EyeLevelChartPeriod } from './types';
import { useEyeLevelTableData } from './hooks/useEyeLevelTableData';

const EyeLevel: React.FC = () => {
  // Date time filter
  const { palette } = useTheme();
  const [fromDate, setFromDate] = useState<moment.Moment>(moment());
  const [toDate, setToDate] = useState<moment.Moment>(
    moment().subtract(7, 'days')
  );

  const [tab, setTab] = useState<EyeLevelChartPeriod>(
    EyeLevelChartPeriod.WEEKLY
  );
  const {
    tabs,
    isLoading: isLoadingChartOption,
    chartOption,
  } = useEyeLevelChartData(tab, fromDate, toDate);
  const {
    isLoading: isLoadingRetailerData,
    accordionData,
    summaryData,
  } = useEyeLevelTableData(tab, fromDate, toDate);
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
    null
  );

  const handleTabPeriodChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTab(newValue);
  };

  const handleFromDateChange = (date: moment.Moment) => {
    setFromDate(date);
    setToDate(moment(date).subtract(7, 'days'));
  };

  const handleToDateChange = (date: moment.Moment) => {
    setToDate(date);
  };

  const handleDownloadExcel = () => {
    // TODO: download excel
  };

  return (
    <>
      <Page
        title="Eye Level"
        NavWrapper={ActionHeader}
        scrollable
        renderNav={() => (
          <Box flex={1} display="flex" justifyContent="end">
            <Box flex={1} display="flex" alignItems="center" gap="1rem">
              <SingleDayPicker
                onDateChange={handleFromDateChange}
                date={fromDate}
              />
              <Box>vs</Box>
              <SingleDayPicker
                onDateChange={handleToDateChange}
                date={toDate}
                outsideRangeDate={fromDate}
              />
            </Box>
            <IconButton onClick={handleDownloadExcel}>
              <DownloadIcon
                sx={{ fontSize: '18px', color: palette.blueGrey[400] }}
              />
            </IconButton>
          </Box>
        )}
      >
        <Stack spacing="24px" alignItems="stretch" mx="24px" />
        <UnifyCard sx={{ m: 3, mt: 0 }}>
          <Grid2 container alignItems="center" justifyContent="space-between">
            <UnifyCardTitle tooltipProps={{ title: 'Eye-Level in time chart' }}>
              Eye-Level in time
            </UnifyCardTitle>
            <ChartMenu chartInstance={chartInstance} />
          </Grid2>
          <Tabs
            aria-label=""
            value={tab}
            onChange={handleTabPeriodChange}
            TabIndicatorProps={{ sx: { height: '1px' } }}
            sx={{ minHeight: 'unset', mt: '4px' }}
          >
            {tabs.map((item) => (
              <StyledTab
                label={item.label}
                id={`simple-tab-${item.id}`}
                key={`simple-tab-${item.id}`}
              />
            ))}
          </Tabs>
          <Stack
            spacing="24px"
            alignItems="stretch"
            sx={{ 'div[role=tabpanel]': { margin: 0 } }}
          >
            {tabs.map(({ id }) => (
              <TabPanel index={id} value={tab} key={id}>
                {isLoadingChartOption ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ height: '420px' }}
                  >
                    <LinearLoader width={300} text="Loading data..." />
                  </Box>
                ) : (
                  <BarLineChart
                    onChangeInstance={setChartInstance}
                    option={chartOption ?? {}}
                    style={{ height: '420px' }}
                  />
                )}
              </TabPanel>
            ))}
          </Stack>
        </UnifyCard>

        <UnifyCard sx={{ m: 3, paddingInline: 0, overflow: 'auto' }}>
          <AverageSummary
            data={summaryData}
            isLoading={isLoadingRetailerData}
          />
          <RetailerAccordionList
            data={accordionData ?? []}
            isLoadingRetailerData={isLoadingRetailerData}
          />
        </UnifyCard>
      </Page>
      <ColorCodingPanel />
    </>
  );
};

export default EyeLevel;
