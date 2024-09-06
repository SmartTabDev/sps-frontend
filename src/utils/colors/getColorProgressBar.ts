export type ChartColorType = {
  title: string;
  data: ChartColorDataType[];
};

export type ChartColorDataType = {
  key: string;
  success: number;
  warning: number;
  danger: number;
  reverse?: boolean | undefined;
  id?: string;
};

export const colorCodingData: ChartColorType[] = [
  {
    title: 'general',
    data: [
      {
        id: 'AVERAGE',
        key: 'AVG',
        success: 80,
        warning: 60,
        danger: 60,
      },
    ],
  },
  {
    title: 'shelf',
    data: [
      {
        id: 'AVAILABLE',
        key: 'available',
        success: 95,
        warning: 90,
        danger: 90,
      },
      {
        id: 'LISTED',
        key: 'LISTED',
        success: 80,
        warning: 50,
        danger: 50,
      },
      {
        id: 'OUT OF STOCK',
        key: 'out of stock',
        success: 10,
        warning: 20,
        danger: 20,
        reverse: true,
      },
    ],
  },
  {
    title: 'content',
    data: [
      {
        id: 'AVERAGE',
        key: 'AVG',
        success: 80,
        warning: 60,
        danger: 60,
      },
      {
        id: 'P-SHOT MATCH',
        key: 'p-shot match',
        success: 80,
        warning: 60,
        danger: 60,
      },
      {
        id: '# IMAGES',
        key: '# images',
        success: 80,
        warning: 60,
        danger: 60,
      },
      {
        id: 'BULLETS',
        key: 'bullets',
        success: 80,
        warning: 60,
        danger: 60,
      },
      {
        id: 'RICH CONTENT',
        key: 'rich content',
        success: 90,
        warning: 60,
        danger: 60,
      },
    ],
  },
  {
    title: 'ratings & reviews',
    data: [
      {
        id: 'R&R',
        key: 'R&R',
        success: 80,
        warning: 60,
        danger: 60,
      },
      {
        id: 'RATING',
        key: 'rating',
        success: 80,
        warning: 60,
        danger: 60,
      },
      {
        id: '# REVIEWS',
        key: '# reviews',
        success: 80,
        warning: 60,
        danger: 60,
      },
    ],
  },
  {
    title: 'search',
    data: [
      {
        id: 'SHARE/FAIR SHARE',
        key: 'share/fair share',
        success: 80,
        warning: 50,
        danger: 50,
      },
    ],
  },
];

export const getColorProgressBar = (
  type: string,
  key: string,
  value: number
) => {
  const getCategory = colorCodingData.find((c) => c.title === type);
  if (getCategory) {
    const getItem = getCategory.data.find((d) => d.id === key);
    if (getItem) {
      if (getItem.reverse) {
        if (value <= getItem.success) {
          return 'success';
        }
        if (value > getItem.success && value <= getItem.warning) {
          return 'warning';
        }
        if (value > getItem.danger) {
          return 'error';
        }
      } else {
        if (value >= getItem.success) {
          return 'success';
        }
        if (value < getItem.success && value >= getItem.warning) {
          return 'warning';
        }
        if (value < getItem.danger) {
          return 'error';
        }
      }
    }
  }
  return undefined;
};

export const getChartColorColor = (colorString: string) => {
  switch (colorString) {
    case 'success':
      return '#27AE60';
    case 'warning':
      return '#F2C94C';
    case 'danger':
      return '#EB5757';
    default:
      return '#AAAAAA';
  }
};
