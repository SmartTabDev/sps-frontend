import React, { useState } from 'react';
import { ReactComponent as FileAlt } from 'components/ReportPopper/icons/file-alt.svg';
import { ReactComponent as FileAltSolid } from 'components/ReportPopper/icons/file-alt-solid.svg';
import { ReactComponent as ArrowToBottom } from 'components/ReportPopper/icons/arrow-to-bottom.svg';
import ListItem from 'components/ReportPopper/ListItem.styled';

type Props = {
  text?: string;
  onClick: () => void;
};

export const ReportListItem: React.FC<Props> = ({ text, onClick }) => {
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <ListItem
      $isHover={isHover}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={onClick}
      sx={{ textTransform: 'capitalize' }}
    >
      {isHover ? <FileAltSolid /> : <FileAlt />}
      {text}
      <ArrowToBottom />
    </ListItem>
  );
};
