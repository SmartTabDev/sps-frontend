import React from 'react';
import { styled, css } from '@mui/system';
import Box from '@mui/material/Box';
import LinearLoader from 'components/LinearLoader';
import { Link, LinkProps } from 'react-router-dom';
import Button from 'components/Button';
import LoaderWrapper from 'components/LoaderWrapper';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import ModuleLinkButton from 'components/ModuleLinkButton/ModuleLinkButton';

const LeftSide = styled(Box, {
  shouldForwardProp: (props) =>
    props !== '$leftSideWidth' && props !== '$columns',
})<{ $leftSideWidth?: string }>`
  width: ${({ $leftSideWidth = '100%' }) => $leftSideWidth};
  white-space: nowrap;
`;

const RightSide = styled(Box, {
  shouldForwardProp: (props) => props !== '$columns',
})<{ $columns: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  justify-items: center;
  padding: 0 50px;
  gap: 50px;
`;

const StyledTitle = styled(UnifyCardTitle)`
  margin-bottom: 18px;
`;

const StyledPanel = styled(Box, {
  shouldForwardProp: (props) => props !== '$minHeight',
})<{ $minHeight?: number }>`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;

  ${({ $minHeight }) =>
    $minHeight &&
    css`
      min-height: ${$minHeight}px;
    `}
`;

const PositionedModuleLinkButton = styled(ModuleLinkButton)`
  position: absolute;
  top: 5.5px;
  right: 5.5px;
`;

type Props = {
  isDataLoading: boolean;
  leftSideTitle: string;
  leftSideChildren: React.ReactElement;
  rightSideChildren?: React.ReactElement;
  rightSideColumns?: number;
  leftSideWidth?: string;
  detailsBtnUrl?: string;
  minHeight?: number;
};

const Totals: React.FC<Props> = ({
  isDataLoading,
  leftSideTitle,
  leftSideChildren,
  rightSideChildren,
  rightSideColumns = 1,
  leftSideWidth,
  detailsBtnUrl,
  minHeight,
}) => {
  if (isDataLoading) {
    return (
      <UnifyCard>
        <StyledPanel $minHeight={minHeight}>
          <Box display="flex" flexDirection="column" width="100%">
            <StyledTitle>{leftSideTitle}</StyledTitle>
            <LoaderWrapper>
              <LinearLoader width={300} />
            </LoaderWrapper>
          </Box>
        </StyledPanel>
      </UnifyCard>
    );
  }

  return (
    <UnifyCard>
      <StyledPanel $minHeight={minHeight}>
        <LeftSide $leftSideWidth={leftSideWidth}>
          <StyledTitle>{leftSideTitle}</StyledTitle>
          {leftSideChildren}
        </LeftSide>
        {rightSideChildren && (
          <RightSide $columns={rightSideColumns}>{rightSideChildren}</RightSide>
        )}
        {detailsBtnUrl && <PositionedModuleLinkButton to={detailsBtnUrl} />}
      </StyledPanel>
    </UnifyCard>
  );
};

export default Totals;
