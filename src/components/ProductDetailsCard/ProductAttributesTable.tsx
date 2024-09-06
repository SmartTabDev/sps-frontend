import React from 'react';
import { styled } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import { AttributesTable, AttributesTableRow } from './AttributesTable';

const StyledSkeletonWrapper = styled('div')`
  display: flex;
  max-width: 120px;
  justify-content: space-between;
  margin-top: 18px;
`;

const StyledSkeleton = styled(Skeleton)`
  margin-top: 2px;
  margin-bottom: 2px;
`;

const AttributesTableSkeleton = (
  <StyledSkeletonWrapper>
    <div>
      <StyledSkeleton width={50} height={18} />
      <StyledSkeleton width={50} height={18} />
      <StyledSkeleton width={50} height={18} />
    </div>
    <div>
      <StyledSkeleton width={50} height={18} />
      <StyledSkeleton width={50} height={18} />
      <StyledSkeleton width={50} height={18} />
    </div>
  </StyledSkeletonWrapper>
);

export interface ProductAttributeRow {
  title: string;
  value?: string | React.ReactElement;
}

export type AttributesTableProps = {
  attributes?: ProductAttributeRow[];
  loading?: boolean;
};

export const ProductAttributesTable: React.FC<AttributesTableProps> = ({
  attributes = [],
  loading,
}) => {
  const nonEmptyAttributes = attributes.filter(
    (attribute) => attribute.value !== undefined
  );
  return loading ? (
    AttributesTableSkeleton
  ) : (
    <AttributesTable>
      {nonEmptyAttributes.map(({ title, value }) => (
        <AttributesTableRow key={title} name={title} value={value} />
      ))}
    </AttributesTable>
  );
};
