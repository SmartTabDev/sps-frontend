import { useCallback, useEffect, useState } from 'react';
import { useTimeoutFn } from 'react-use';
import _ from 'lodash';
import {
  EyeLevelChartPeriod,
  EyeLevelRetailerData,
  EyeLevelRetailerSummaryData,
} from '../types';

export const useEyeLevelTableData = (
  period?: EyeLevelChartPeriod,
  fromDate?: moment.Moment,
  toDate?: moment.Moment
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accordionData, setAccordionData] = useState<EyeLevelRetailerData[]>();
  const [summaryData, setSummaryData] = useState<EyeLevelRetailerSummaryData>();

  const generateDataByType = useCallback(
    (type: string, dataIn: EyeLevelRetailerData[]) => {
      return Math.round(
        dataIn.reduce((total: number, next: EyeLevelRetailerData) => {
          let sum = total;
          switch (type) {
            case 'general':
              sum +=
                next.shelf.available.percent * 0.5 +
                next.ratingAndReviews.rAndR.percent * 0.3 +
                next.search.searchVsFairShare.percent * 0.2;
              break;
            case 'shelf':
              sum += next.shelf.available.percent;
              break;
            case 'content':
              sum +=
                (next.content.pShotMatch.percent +
                  next.content.images.percent +
                  next.content.bullets.percent +
                  next.content.richContent.percent) /
                4;
              break;
            case 'ratingAndReviews':
              sum += next.ratingAndReviews.rAndR.percent;
              break;
            case 'searchVsFairShare':
              sum += next.search.searchVsFairShare.percent;
              break;
            default:
              break;
          }

          return sum;
        }, 0) / dataIn.length
      );
    },
    []
  );

  // Mock data
  const getAccordionData = useCallback(() => {
    return [
      {
        name: 'hebe.pl',
        general: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
        },
        shelf: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          available: { percent: _.random(50, 100), change: _.random(-2, 5) },
          listed: { percent: _.random(50, 100), change: _.random(-2, 5) },
          outOfStock: { percent: _.random(1, 20), change: _.random(-2, 5) },
        },
        content: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          pShotMatch: { percent: _.random(50, 100), change: _.random(-2, 5) },
          images: { percent: _.random(50, 100), change: _.random(-2, 5) },
          bullets: { percent: _.random(50, 100), change: _.random(-2, 5) },
          richContent: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        ratingAndReviews: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          rAndR: { percent: _.random(50, 100), change: _.random(-2, 5) },
          rating: { percent: _.random(50, 100), change: _.random(-2, 5) },
          reviews: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        search: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          searchVsFairShare: {
            percent: _.random(50, 100),
            change: _.random(-2, 5),
          },
        },
      },
      {
        name: 'makeup.pl',
        general: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
        },
        shelf: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          available: { percent: _.random(50, 100), change: _.random(-2, 5) },
          listed: { percent: _.random(50, 100), change: _.random(-2, 5) },
          outOfStock: { percent: _.random(1, 20), change: _.random(-2, 5) },
        },
        content: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          pShotMatch: { percent: _.random(50, 100), change: _.random(-2, 5) },
          images: { percent: _.random(50, 100), change: _.random(-2, 5) },
          bullets: { percent: _.random(50, 100), change: _.random(-2, 5) },
          richContent: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        ratingAndReviews: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          rAndR: { percent: _.random(50, 100), change: _.random(-2, 5) },
          rating: { percent: _.random(50, 100), change: _.random(-2, 5) },
          reviews: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        search: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          searchVsFairShare: {
            percent: _.random(50, 100),
            change: _.random(-2, 5),
          },
        },
      },
      {
        name: 'superpharm.pl',
        general: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
        },
        shelf: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          available: { percent: _.random(50, 100), change: _.random(-2, 5) },
          listed: { percent: _.random(50, 100), change: _.random(-2, 5) },
          outOfStock: { percent: _.random(1, 20), change: _.random(-2, 5) },
        },
        content: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          pShotMatch: { percent: _.random(50, 100), change: _.random(-2, 5) },
          images: { percent: _.random(50, 100), change: _.random(-2, 5) },
          bullets: { percent: _.random(50, 100), change: _.random(-2, 5) },
          richContent: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        ratingAndReviews: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          rAndR: { percent: _.random(50, 100), change: _.random(-2, 5) },
          rating: { percent: _.random(50, 100), change: _.random(-2, 5) },
          reviews: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        search: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          searchVsFairShare: {
            percent: _.random(50, 100),
            change: _.random(-2, 5),
          },
        },
      },
      {
        name: 'douglas.pl',
        general: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
        },
        shelf: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          available: { percent: _.random(50, 100), change: _.random(-2, 5) },
          listed: { percent: _.random(50, 100), change: _.random(-2, 5) },
          outOfStock: { percent: _.random(1, 20), change: _.random(-2, 5) },
        },
        content: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          pShotMatch: { percent: _.random(50, 100), change: _.random(-2, 5) },
          images: { percent: _.random(50, 100), change: _.random(-2, 5) },
          bullets: { percent: _.random(50, 100), change: _.random(-2, 5) },
          richContent: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        ratingAndReviews: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          rAndR: { percent: _.random(50, 100), change: _.random(-2, 5) },
          rating: { percent: _.random(50, 100), change: _.random(-2, 5) },
          reviews: { percent: _.random(50, 100), change: _.random(-2, 5) },
        },
        search: {
          avg: { percent: _.random(20, 90), change: _.random(-2, 5) },
          searchVsFairShare: {
            percent: _.random(50, 100),
            change: _.random(-2, 5),
          },
        },
      },
    ] as EyeLevelRetailerData[];
  }, []);

  const getSummaryData = useCallback(
    (data: EyeLevelRetailerData[]) => {
      return {
        general: generateDataByType('general', data),
        shelf: generateDataByType('shelf', data),
        content: generateDataByType('content', data),
        ratingAndReviews: generateDataByType('ratingAndReviews', data),
        searchVsFairShare: generateDataByType('searchVsFairShare', data),
      };
    },
    [period, generateDataByType]
  );

  const [, , resetTimeOut] = useTimeoutFn(() => {
    setIsLoading(false);
    const accordData = getAccordionData();
    setAccordionData(accordData);
    setSummaryData(getSummaryData(accordData));
  }, 2000);

  useEffect(() => {
    setIsLoading(true);
    resetTimeOut();
  }, [period, fromDate, toDate, resetTimeOut]);

  return { isLoading, accordionData, summaryData };
};
