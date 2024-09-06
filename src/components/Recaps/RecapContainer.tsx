import React from 'react';
import { Breakpoint, Container, styled } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import ModuleLinkButton from 'components/ModuleLinkButton/ModuleLinkButton';
import { RecapWrapper } from './RecapWrapper';

const PositionedModuleLinkButton = styled(ModuleLinkButton)`
  position: absolute;
  top: 5.5px;
  right: 5.5px;
`;

type RecapContainerProps = {
  Panel?: React.FC;
  isLoaded: boolean;
  url?: string;
  cardCount: number;
  maxWidth?: Breakpoint;
};

const RecapContainer: React.FC<RecapContainerProps> = ({
  Panel = RecapWrapper,
  children,
  isLoaded,
  url,
  cardCount,
  maxWidth = 'xl',
}) => {
  const theme = useTheme();
  if (!isLoaded) {
    return (
      <Panel
        sx={{
          gridTemplateColumns: `repeat(${cardCount},minmax(0,1fr))`,
        }}
      >
        {Array(cardCount)
          .fill(undefined)
          .map((_, index) => (
            <Skeleton width="100%" height="120px" key={index} />
          ))}
      </Panel>
    );
  }

  return (
    <Container
      sx={{ mb: '24px', position: 'relative', mx: 'auto !important' }}
      maxWidth={maxWidth}
      disableGutters
    >
      <Panel
        sx={{
          gridTemplateColumns: `repeat(${cardCount},minmax(0,1fr))`,
          [theme.breakpoints.down('md')]: {
            gridTemplateColumns: `repeat(2,minmax(0,1fr))`,
          },
        }}
      >
        {children}
        {isLoaded && url ? <PositionedModuleLinkButton to={url} /> : null}
      </Panel>
    </Container>
  );
};

export default RecapContainer;
