import { authApi } from 'api';
import { useCallback, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Report } from 'components/ReportPopper/Reports';
import handleRequestError from 'reducers/auth/handleRequestError';
import { ConfigContext } from 'contexts/ConfigContext';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { regionCode } = useContext(ConfigContext);

  const fetchReports = useCallback(
    async (accesstoken: string, region: string | undefined): Promise<any[]> => {
      if (accessToken) {
        try {
          const { data } = await authApi({
            method: 'get',
            url: '/report/allegro-report',
            headers: {
              accesstoken,
            },
            params: {
              region,
            },
          });

          const result = (data as any[]).map(({ name, link }) => ({
            key: link,
            displayName: name,
          }));

          setReports(result);
        } catch (error) {
          handleRequestError(error, 'fetch Allegro reports');
        }
      }

      return [];
    },
    [accessToken]
  );

  const handleReportClick = useCallback((link: string) => {
    const promise = new Promise<void>((resolve) => {
      window.open(link, '_blank');
      resolve();
    });

    return promise;
  }, []);

  useEffect(() => {
    fetchReports(accessToken, regionCode);
  }, [accessToken, regionCode, fetchReports]);

  return {
    reports,
    handleReportClick,
  };
};
