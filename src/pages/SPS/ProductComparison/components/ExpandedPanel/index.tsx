import React from 'react';
import { styled } from '@mui/system';
import Panel from 'components/Panel';

const PanelWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$top',
})<{ $top?: number }>`
  position: absolute;
  top: ${({ $top = 0 }) => $top - 2}px;
  width: 100%;
  z-index: -1;
`;

const StyledPanel = styled('div', {
  shouldForwardProp: (props) => props !== '$isOpen',
})<{ $isOpen: boolean }>`
  position: relative;
  top: -1px;
  height: ${({ $isOpen }) => ($isOpen ? '333px' : '0px')};
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: ${({ $isOpen }) => ($isOpen ? 'initial' : 'hidden')};
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.25);


  @media only screen and (max-width: 1300px) {
    height: ${({ $isOpen }) => ($isOpen ? '433px' : '0px')};
  }

  @media only screen and (max-width: 950px) {
    height: ${({ $isOpen }) => ($isOpen ? '500px' : '0px')};
  }
`;

const PanelContent = styled(Panel)`
  background: ${({ theme }) => theme.palette.common.white};
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  border: 1px solid rgba(82, 95, 129, 0.3);
  border-top: none;
`;

type Props = {
  children: React.ReactChild;
  isOpen: boolean;
  panelRef: React.RefObject<HTMLDivElement>;
};

const ExpandedPanel: React.FC<Props> = ({ children, isOpen, panelRef }) => {
  const offsetHeight = panelRef?.current?.offsetHeight;

  return (
    <PanelWrapper $top={offsetHeight}>
      <StyledPanel $isOpen={isOpen}>
        <PanelContent>{children}</PanelContent>
      </StyledPanel>
    </PanelWrapper>
  );
};

export default ExpandedPanel;
