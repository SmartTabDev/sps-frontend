import React, { ReactElement } from 'react';
import { styled, css } from '@mui/system';

interface Props<T extends string> {
  active?: T;
  action: (option: T, cb?: () => void) => void;
  options: T[];
  title?: string | ReactElement;
  // TODO it would be better to use render prop here
  // i.e.: renderIcon: (active: boolean) => ReactNode
  IconComponent?: React.FunctionComponent<{ active: boolean }>;
  isPrimary?: boolean;
}

type OptionProps = {
  $isActive: boolean;
  $isPrimary: boolean;
};

const StyledWrapper = styled('ul')`
  display: flex;
  font-size: 14px;
  line-height: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const StyledOption = styled('li', {
  shouldForwardProp: (props) => props !== '$isPrimary' && props !== '$isActive',
})<OptionProps>`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
  &:not(:last-child) {
    margin-right: 20px;
  }

  ${({ $isPrimary, theme }) =>
    $isPrimary &&
    css`
      color: ${theme.palette.primary.main};
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      font-weight: bold;
    `}
`;

const StyledTitle = styled('span')`
  margin-right: 10px;
`;

function Switcher<T extends string>(props: Props<T>): JSX.Element {
  const {
    options = [],
    action,
    active,
    title,
    IconComponent,
    isPrimary = true,
  } = props;

  if (options && options.length === 0) {
    return <></>;
  }

  return (
    <StyledWrapper>
      {title && <StyledTitle>{title}</StyledTitle>}
      {options.map((option) => (
        <StyledOption
          key={option}
          onClick={() => {
            action(option);
          }}
          $isActive={active === option}
          $isPrimary={isPrimary}
        >
          {IconComponent && <IconComponent active={active === option} />}
          {option}
        </StyledOption>
      ))}
    </StyledWrapper>
  );
}

export default Switcher;
