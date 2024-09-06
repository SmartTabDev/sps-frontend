import { SxProps } from '@mui/system';
import { getTrendColor, Trend } from 'utils/colors/getTrendColor';

export type CardSeries = {
  name: string;
  data: number[];
};

export type RecapCardValues = {
  name: string;
  value: string;
  positive?: boolean;
  trendValue?: number;
};

export type BaseRecapCardType = {
  name: string;
  sx?: SxProps;
};

export type RecapCardType = BaseRecapCardType & {
  color?: string;
  positive?: boolean;
  value?: string | number;
  values?: RecapCardValues[];
  subtitle?: string | number;
  series?: CardSeries[];
  showPieChart?: boolean;
};

type RecapMap = Record<string, RecapCardType>;

function createRecapMap(data: RecapCardType[]): RecapMap {
  return data.reduce((map, item) => ({ ...map, [item.name]: item }), {});
}

export function createRecaps(
  currentRecapData: RecapCardType[],
  prevRecapData: RecapCardType[]
): RecapCardType[] {
  const currentRecapMap = createRecapMap(currentRecapData);
  const prevRecapMap = createRecapMap(prevRecapData);

  const recaps: RecapCardType[] = [];

  Object.values(currentRecapMap).forEach((currentRecap) => {
    if (!currentRecap || !currentRecap.value) {
      return;
    }

    const previousRecap = prevRecapMap[currentRecap.name];

    const subtitle =
      previousRecap && previousRecap.value
        ? Number(currentRecap.value) - Number(previousRecap.value)
        : undefined;

    const values = currentRecap.values?.map((value) => {
      const previousValue = previousRecap?.values?.find(
        (prevValue) => prevValue.name === value.name
      ) ?? { value: 0 };

      const trendValue = Number(value.value) - Number(previousValue.value);

      const positive = trendValue !== 0 ? trendValue > 0 : undefined;

      return {
        name: value.name,
        value: Number(value.value) || 0,
        trendValue: Number.isInteger(trendValue)
          ? String(Math.abs(trendValue))
          : '0',
        positive,
      };
    });

    const positive = subtitle !== undefined ? subtitle > 0 : false;

    const recap: RecapCardType = {
      name: currentRecap.name || '',
      value: currentRecap.value,
      values: (values as any) || [],
      positive,
      subtitle: subtitle ?? undefined,
    };

    recaps.push(recap);
  });

  return recaps;
}
