import handleRequestError from 'reducers/auth/handleRequestError';
import { ConfigContext } from 'contexts/ConfigContext';
import { authApi } from 'api';
import { useContext, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Report } from 'components/ReportPopper/Reports';

const fetchReport = async (
  accessToken: string,
  key: string
): Promise<string | null> => {
  if (accessToken) {
    try {
      const { data } = await authApi({
        method: 'get',
        url: `/report/access-link/${key}`,
        headers: {
          accesstoken: accessToken,
        },
      });

      return data.link;
    } catch (error) {
      handleRequestError(error, 'useReports - fetchReport');
    }
  }

  return null;
};

const fetchReports = async (
  accessToken: string,
  regionCode: string | undefined
): Promise<Report[]> => {
  if (accessToken) {
    try {
      const { data } = await authApi({
        method: 'get',
        url: '/report/list',
        headers: {
          accesstoken: accessToken,
        },
        params: {
          region: regionCode,
        },
      });

      return data;
    } catch (error) {
      handleRequestError(error, 'useReports - fetchReports');
    }
  }

  return [];
};

export type UseReportsHook = {
  list: (Report | undefined)[];
  isLoading: boolean;
  handleReportClick: (key: string) => Promise<void>;
};

const useReports = (): UseReportsHook => {
  const initialListValue = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const [list, setList] = useState<(Report | undefined)[]>(initialListValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { regionCode } = useContext(ConfigContext);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await fetchReports(accessToken, regionCode);
      setList(data);
      setIsLoading(false);
    }

    fetchData();
  }, [accessToken, regionCode]);

  const handleReportClick = useCallback(
    async (key: string) => {
      const link = await fetchReport(accessToken, key);

      if (link) {
        window.open(link, '_blank');
      }
    },
    [accessToken]
  );

  return {
    list,
    isLoading,
    handleReportClick,
  };
};

export default useReports;
