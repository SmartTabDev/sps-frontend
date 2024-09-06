import React from 'react';
import Button from 'components/Button';
import TextButton from 'components/TextButton';
import { styled } from '@mui/system';

type Props = {
  handleApply: () => void;
  handleClear: () => void;
  isDisabled: boolean;
};

const StyledWrapper = styled('div')`
  margin: 68px auto 0 auto;
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  padding-top: 13px;
  padding-bottom: 11px;
  left: 0;
`;

const Actions: React.FC<Props> = ({ handleClear, handleApply, isDisabled }) => (
  <StyledWrapper>
    <TextButton onClick={handleClear} disabled={isDisabled}>
      Clear filters
    </TextButton>
    <Button size="medium" onClick={handleApply}>
      Go
    </Button>
  </StyledWrapper>
);

export default Actions;
