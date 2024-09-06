import ChangeOverTime from 'components/Charts/ChangeOverTime';
import { ConfigContext } from 'contexts/ConfigContext';
import { useTotalChangeOverTimeByTwoDimensions } from 'pages/OfflineAvailability/hooks/useTotalChangeOverTimeByTwoDimensions';
import * as React from 'react';
import * as Cube from '@cubejs-client/core';
import { OAMItem } from 'pages/OfflineAvailability/types/Chart';
import { OAMFilters } from '../ExpandedFilters/ExpandedFilters';

const fakeData = [
  {
    name: 'Air', // 2nd
    group: 'Media Expert', // 1st
    data: [2226, 2240, 2240, 2212, 2212, 2240],
  },
  {
    name: 'Espresso',
    group: 'Media Expert',
    data: [1196, 1198, 1208, 1208, 1198, 1196],
  },
  {
    name: 'Kitchen',
    group: 'Media Markt',
    data: [1162, 2380, 2408, 2086, 2366, 2366],
  },
  {
    name: 'Soup',
    group: 'Media Markt',
    data: [1162, 2380, 2408, 2086, 2366, 2366],
  },
];

const fakeDates = [
  '2023-01-02T00:00:00.000',
  '2023-01-09T00:00:00.000',
  '2023-01-16T00:00:00.000',
  '2023-01-23T00:00:00.000',
  '2023-01-30T00:00:00.000',
  '2023-02-06T00:00:00.000',
];

type Props = {
  nameDimension: keyof OAMItem;
  groupDimension: keyof OAMItem;
  filters: OAMFilters;
};

const ChangeOverTimeByTwoDimensions: React.FC<Props> = ({
  nameDimension,
  groupDimension,
  filters,
}) => {
  const { regionCode } = React.useContext(ConfigContext);
  const granularity: Cube.TimeDimensionGranularity = 'week';
  const { selectedRetailers, selectedCategories, timeDimension } = filters;

  const { values, dates, isLoading } = useTotalChangeOverTimeByTwoDimensions(
    regionCode,
    granularity,
    timeDimension,
    nameDimension,
    groupDimension,
    selectedRetailers,
    selectedCategories
  );

  return (
    <>
      <ChangeOverTime
        XAxisData={dates}
        data={values}
        legendData={values.map((x) => x.name)}
        isLinesGrouped
        isLoading={isLoading}
      />
    </>
  );
};

export default ChangeOverTimeByTwoDimensions;
