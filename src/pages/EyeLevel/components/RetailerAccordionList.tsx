import React from 'react';
import { AccordionRow } from './Accordion';
import { EyeLevelRetailerData } from '../types';

type Props = {
  data: EyeLevelRetailerData[];
  isLoadingRetailerData: boolean;
};

const RetailerAccordionList: React.FC<Props> = ({
  data,
  isLoadingRetailerData,
}) => {
  return (
    <>
      {data.map((dt) => (
        <AccordionRow
          key={`accordion-row${dt.name}`}
          isLoading={isLoadingRetailerData}
          name={dt.name}
          data={dt}
        />
      ))}
    </>
  );
};

export default RetailerAccordionList;
