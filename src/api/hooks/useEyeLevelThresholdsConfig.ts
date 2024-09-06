import { useQuery } from '@tanstack/react-query';
// import { ApiResponse, fetchAppServerApiData } from 'api/fetchData';
import { EyeLevelThresholdsConfig } from 'pages/EyeLevel/types';

interface useEyeLevelThresholdsConfigProps {
  configId: number;
}

// type EyeLevelThresholdsConfigApiResponse =
//   ApiResponse<EyeLevelThresholdsConfig>;

export const useEyeLevelThresholdsConfig = ({
  configId,
}: useEyeLevelThresholdsConfigProps) => {
  return useQuery({
    queryKey: ['thresholdsConfig', configId],
    queryFn: (): Promise<EyeLevelThresholdsConfig> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 1000);
      }),
    // TODO: remove mock and use fetchAppServerApiData
    // fetchAppServerApiData<any>(
    //   `/config/1/thresholds/eye-level`
    // ),
  });
};

const mockResponse: EyeLevelThresholdsConfig = {
  general: {
    avg: {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
  },
  shelf: {
    available: {
      high: {
        to: 100,
        from: 95,
        label: 'string',
      },
      mid: {
        to: 95,
        from: 90,
        label: 'string',
      },
      low: {
        to: 90,
        from: 0,
        label: 'string',
      },
    },
    listed: {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 50,
        label: 'string',
      },
      low: {
        to: 50,
        from: 0,
        label: 'string',
      },
    },
    'out-of-stock': {
      high: {
        to: 10,
        from: 0,
        label: 'string',
      },
      mid: {
        to: 20,
        from: 10,
        label: 'string',
      },
      low: {
        to: 100,
        from: 20,
        label: 'string',
      },
    },
  },
  content: {
    avg: {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
    'packshot-match': {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
    'num-images': {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
    bullets: {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
    'rich-content': {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
  },
  'ratings-and-reviews': {
    'ratings-and-reviews': {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
    ratings: {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
    reviews: {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 60,
        label: 'string',
      },
      low: {
        to: 60,
        from: 0,
        label: 'string',
      },
    },
  },
  search: {
    'search-fair-trade': {
      high: {
        to: 100,
        from: 80,
        label: 'string',
      },
      mid: {
        to: 80,
        from: 50,
        label: 'string',
      },
      low: {
        to: 50,
        from: 0,
        label: 'string',
      },
    },
  },
};
