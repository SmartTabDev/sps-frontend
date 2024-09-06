import { SeriesOption } from 'echarts';

export const addTooltipShadow = (option: SeriesOption): SeriesOption => {
  const newOption = { ...option };
  newOption.tooltip = {
    ...newOption.tooltip,
    extraCssText: `
          box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
          border: none;
        `,
  };
  return newOption;
};
