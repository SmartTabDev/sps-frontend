import { Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import { UnifyCard } from 'components/UnifyCard/UnifyCard';

export const StyledUnifyCard = styled(UnifyCard)`
  padding: 20px 24px;
`;

export const ProductBox = styled('div')`
  display: flex;
  flex-direction: column;
  margin-left: 48px;
`;

export const StyledSkeleton = styled(Skeleton)`
  width: 140px;
  height: 24px;
  margin-top: -4px;
`;
