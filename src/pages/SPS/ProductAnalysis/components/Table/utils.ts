import { IndexRange } from 'react-virtualized';
import { RenderedSection } from 'react-virtualized/dist/es/Grid';

export const onSectionRendered = (onRowsRendered: (params: IndexRange) => void) => ({
  columnStartIndex, columnStopIndex,
}: RenderedSection): void => {
  onRowsRendered({
    startIndex: columnStartIndex,
    stopIndex: columnStopIndex,
  });
};
