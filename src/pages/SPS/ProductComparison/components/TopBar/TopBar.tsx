import React, { useRef } from 'react';
import { ProductComparisonView } from 'reducers/productComparison/productComparison';
import ExpandedPanel from '../ExpandedPanel';
import TopBarHead from '../TopBarHead';
import InputGrid from '../InputGrid';
import StyledTopBarPanel from '../StyledTopBarPanel/StyledTopBarPanel';
import StyledTopBar from '../StyledTopBar/StyledTopBar';

type Props = {
  onButtonClick: () => void;
  isOpen: boolean;
  isDisabled: boolean;
  setEditMode: (value: boolean) => void;
  setGroupBy: (option: ProductComparisonView) => void;
};

const TopBar: React.FC<Props> = (props) => {
  const {
    setGroupBy,
    isDisabled,
    isOpen,
    onButtonClick,
    setEditMode,
  } = props;
  const topBarRef = useRef<HTMLDivElement>(null);

  return (
    <StyledTopBar ref={topBarRef}>
      <StyledTopBarPanel>
        <TopBarHead showButton={!isOpen} onButtonClick={setEditMode} />
      </StyledTopBarPanel>
      <ExpandedPanel isOpen={isOpen} panelRef={topBarRef}>
        <InputGrid
          cb={setEditMode}
          onButtonClick={onButtonClick}
          isDisabled={isDisabled}
          setGroupBy={setGroupBy}
        />
      </ExpandedPanel>
    </StyledTopBar>
  );
};

export default TopBar;
