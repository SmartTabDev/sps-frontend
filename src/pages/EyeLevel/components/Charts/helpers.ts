import moment from 'moment';
import {
  EyeLevelChartDataType,
  EyeLevelChartPeriod,
} from 'pages/EyeLevel/types';

const WEEK_TO_SHOW = 26;
const MONTH_TO_SHOW = 12;
const QUARTER_TO_SHOW = 4;

// TODO: mock weekly data
const mockChartData = () => {
  const data: EyeLevelChartDataType[] = [];
  // 52 weeks in a year
  for (let i = 0; i <= 52; i += 1) {
    // Random in range [30, 200]
    const targetValue = Math.random() * (200 - 30) + 30;
    // Random in range [10, targetValue]
    const closeTheGapValue = Math.random() * (targetValue - 10) + 10;

    data.push({
      week: -i,
      target: targetValue,
      closeTheGap: closeTheGapValue,
      contentScore: targetValue - closeTheGapValue,
    });
  }

  return data;
};

const getWeeklyChartData = () => {
  const category1 = [];
  const category2 = [];
  const lineData = [];
  const barData = [];
  const categoryYear = [];
  const currentDate = new Date();
  const data = mockChartData();

  for (let i = 0; i < WEEK_TO_SHOW; i += 1) {
    const date = moment(currentDate).subtract(i, 'week').startOf('isoWeek');
    const dateLabel = date.format('D.MM');

    const { contentScore, target } = data.find(({ week }) => -week === i) || {
      contentScore: 0,
      target: 0,
    };

    category1.push(dateLabel);
    category2.push(
      date.week() === 1 || i === WEEK_TO_SHOW - 1 ? date.format('YYYY') : ''
    );
    categoryYear.push(moment(currentDate).year() - date.year());
    barData.push(contentScore);
    lineData.push(target);
  }

  return {
    category1: category1.reverse(),
    category2: category2.reverse(),
    categoryYear: categoryYear.reverse(),
    lineData: lineData.reverse(),
    barData: barData.reverse(),
  };
};

const getMonthlyChartData = () => {
  const category1 = [];
  const category2 = [];
  const lineData = [];
  const barData = [];
  const categoryYear = [];
  const currentDate = new Date();
  const data = mockChartData();

  for (let i = 0; i < MONTH_TO_SHOW; i += 1) {
    const date = moment(currentDate).subtract(i, 'month');
    const dateLabel = date.format('MMMM');
    const weekOffset = moment(currentDate).diff(date, 'week');

    const { contentScore, target } = data.find(
      ({ week }) => -week === weekOffset
    ) || { contentScore: 0, target: 0 };

    category1.push(dateLabel);
    category2.push(
      date.month() === 0 || i === MONTH_TO_SHOW - 1 ? date.format('YYYY') : ''
    );
    categoryYear.push(moment(currentDate).year() - date.year());
    barData.push(contentScore);
    lineData.push(target);
  }

  return {
    category1: category1.reverse(),
    category2: category2.reverse(),
    categoryYear: categoryYear.reverse(),
    lineData: lineData.reverse(),
    barData: barData.reverse(),
  };
};

const getQuarterlyChartData = () => {
  const category1 = [];
  const category2 = [];
  const categoryYear = [];
  const lineData = [];
  const barData = [];
  const currentDate = new Date();
  const data = mockChartData();

  for (let i = 0; i < QUARTER_TO_SHOW; i += 1) {
    const date = moment(currentDate).subtract(i, 'quarter');
    const dateLabel = `Q${date.quarter()}`;
    const weekOffset = moment(currentDate).diff(
      moment(currentDate).subtract(i, 'quarter'),
      'week'
    );

    const { contentScore, target } = data.find(
      ({ week }) => -week === weekOffset
    ) || { contentScore: 0, target: 0 };

    category1.push(dateLabel);
    category2.push(
      date.quarter() === 1 || i === QUARTER_TO_SHOW - 1
        ? date.format('YYYY')
        : ''
    );
    categoryYear.push(moment(currentDate).year() - date.year());
    barData.push(contentScore);
    lineData.push(target);
  }

  return {
    category1: category1.reverse(),
    category2: category2.reverse(),
    categoryYear: categoryYear.reverse(),
    lineData: lineData.reverse(),
    barData: barData.reverse(),
  };
};

export const getChartData = (period?: EyeLevelChartPeriod) => {
  switch (period) {
    case EyeLevelChartPeriod.WEEKLY:
      return getWeeklyChartData();
    case EyeLevelChartPeriod.MONTHLY:
      return getMonthlyChartData();
    case EyeLevelChartPeriod.QUARTERLY:
      return getQuarterlyChartData();
    default:
      return {
        category1: [],
        category2: [],
        categoryYear: [],
        lineData: [],
        barData: [],
      };
  }
};

export const getChartBarWidth = (dataSize: number) => {
  if (dataSize > 20) {
    return 10;
  }
  if (dataSize > 10) {
    return 40;
  }
  return 80;
};
