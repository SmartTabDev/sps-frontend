import React from 'react';
import { AvailabilityStatus, Totals } from 'reducers/productAvailability';
import Total from './components/Total';

type Props = {
  totals: Totals;
};

const TotalAvailability: React.FC<Props> = ({ totals }) => {
  if (!totals) {
    return null;
  }

  const entries = Object.entries(totals);

  return (
    <>
      {totals
        ? entries.map(([key, value], index) => (
            <Total
              key={key}
              name={key as AvailabilityStatus}
              value={value || 0}
              isLast={entries.length - 1 === index}
            />
          ))
        : null}
    </>
  );
};

export default TotalAvailability;
