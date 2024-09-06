import React from 'react';

type Props = {
  availableWidth: number;
};

export const DateRangeColGroup = ({ availableWidth }: Props) => {
  const DAYS = 7;
  const STICKY_DAYS = 1;
  const NAV = 1;
  const NAV_ITEMS = 2;

  const baseWidth = availableWidth / (DAYS + STICKY_DAYS + NAV);
  const navWidth = baseWidth / NAV_ITEMS;

  return (
    <>
      <col width={`${navWidth}%`} />
      <col width={`${baseWidth}%`} />
      <col width={`${baseWidth}%`} />
      <col width={`${baseWidth}%`} />
      <col width={`${baseWidth}%`} />
      <col width={`${baseWidth}%`} />
      <col width={`${baseWidth}%`} />
      <col width={`${baseWidth}%`} />
      <col width={`${navWidth}%`} />
      <col width={`${baseWidth}%`} />
    </>
  );
};
