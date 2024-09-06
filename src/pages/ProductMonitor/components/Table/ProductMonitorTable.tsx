import React, { ComponentProps, useState } from 'react';
import { ProductMonitorTableRaw } from './ProductMonitorTableRaw';

const ProductMonitorTableRawMemo = React.memo(ProductMonitorTableRaw);

type Props = Omit<
  ComponentProps<typeof ProductMonitorTableRaw>,
  'handleRowHover'
>;

export const ProductMonitorTable: React.FC<Props> = ({
  list,
  handleOpenModal,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

  // MultiGrid is not rerendering cells if there is no data change - it's ok
  // making inline style for row index seems like easiest way to achieve hover effect
  return (
    <>
      {!!hoverIndex && (
        <style>{`.row-index-${hoverIndex}{ background: rgba(115, 165, 231, 0.25) !important;}`}</style>
      )}
      <ProductMonitorTableRawMemo
        list={list}
        handleOpenModal={handleOpenModal}
        handleRowHover={setHoverIndex}
      />
    </>
  );
};
