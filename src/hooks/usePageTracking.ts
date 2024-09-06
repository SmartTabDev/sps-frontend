import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    const { REACT_APP_GA = '' } = process.env;

    if ('gtag' in window) {
      gtag('config', REACT_APP_GA, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

export default usePageTracking;
