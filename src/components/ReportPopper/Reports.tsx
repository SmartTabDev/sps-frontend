import React from 'react';
// mui
import Skeleton from '@mui/material/Skeleton';
// components
import ReportPopper from 'components/ReportPopper/ReportPopper';
import ListItem from 'components/ReportPopper/ListItem.styled';
import { ReportListItem } from 'components/ReportPopper/ReportListItem';
import { uniqueId } from 'lodash';

export type Report = {
  key?: string;
  timestamp?: number;
  region?: string;
  displayName?: string;
};

type ReportsProps = {
  list: (Report | undefined)[];
  handleReportClick: (key: string) => Promise<void>;
  isLoading: boolean;
};

const Reports: React.FC<ReportsProps> = ({
  list,
  isLoading,
  handleReportClick,
}) => {
  return (
    <ReportPopper listLength={list.length} isLoading={isLoading}>
      {list.map((report) =>
        report ? (
          <ReportListItem
            key={report.key}
            text={report.displayName}
            onClick={() => {
              if (report.key) {
                handleReportClick(report.key);
              }
            }}
          />
        ) : (
          <ListItem key={uniqueId()}>
            <Skeleton width="100%" height={20} />
          </ListItem>
        )
      )}
    </ReportPopper>
  );
};

export default Reports;
