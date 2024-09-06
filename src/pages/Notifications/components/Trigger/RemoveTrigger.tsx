import React from 'react';
import Times from 'pages/Notifications/icons/Times/Times';
import { styled } from '@mui/system';

const StyledRemove = styled(Times)`
  margin-left: 27px;
  color: #f00f00;
  cursor: pointer;
`;

const StyledTriggerRemoveWrapper = styled('div')`
  width: 50px;
  margin-top: 8px;
  top: 2px;
  position: relative;
`;

type RemoveTriggerProps = {
  handleRemove: (index: number | string) => void;
  triggerId: string | number;
  show: boolean;
};

const RemoveTrigger: React.FC<RemoveTriggerProps> = ({
  handleRemove,
  triggerId,
  show,
}) => (
  <StyledTriggerRemoveWrapper>
    {show ? (
      <StyledRemove
        onClick={() => {
          handleRemove(triggerId);
        }}
      >
        <Times />
      </StyledRemove>
    ) : null}
  </StyledTriggerRemoveWrapper>
);

export default RemoveTrigger;
