export type LegendStateItem = {
    name: string;
    isSelected: boolean;
  };

export type LegendState = {
    items: LegendStateItem[];
  };

export type LegendAction =
    | { type: 'toggle'; payload: { name: string } }
    | { type: 'selectAll' }
    | { type: 'deselectAll' }
    | { type: 'load'; payload: { items: LegendStateItem[] } };
