import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Report } from 'components/ReportPopper/Reports';
import handleRequestError from 'reducers/auth/handleRequestError';

const PHILIPS_REPORT_CONFIG_URL =
  'https://tw-oam.s3.eu-west-1.amazonaws.com/oam-reports/philips/philips_reports.json';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const fetchReports = useCallback(async () => {
    if (accessToken) {
      try {
        const response = await fetch(PHILIPS_REPORT_CONFIG_URL);
        const data = (await response.json()) as {
          name: string;
          link: string;
        }[];

        const result = data.map(({ name, link }) => ({
          key: link,
          displayName: name,
        }));

        setReports(result);
      } catch (error) {
        handleRequestError(error, 'fetch oam reports');
      }
    }

    return [];
  }, [accessToken]);

  const handleReportClick = useCallback((link: string) => {
    const promise = new Promise<void>((resolve) => {
      window.open(link, '_blank');
      resolve();
    });

    return promise;
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
    handleReportClick,
  };
};
