import React from 'react';
import { styled } from '@mui/system';
import Switcher from 'components/Switcher';
import { TableView } from 'types/SPSTable';

const TableViewSwitcherWrapper = styled('div')`
  margin: 0 31px;
  padding-top: 30px;
`;

type Props = {
  view: TableView;
  viewOptions: TableView[];
  handleChangeView: (val: TableView) => void;
  isDaily: boolean;
};

const TableViewSwitcher: React.FC<Props> = ({
  view,
  viewOptions,
  handleChangeView,
  isDaily,
}): JSX.Element => (isDaily === false && viewOptions.length > 1 ? (
  <TableViewSwitcherWrapper>
    <Switcher<TableView>
      active={view}
      options={viewOptions}
      action={handleChangeView}
      title="Table view:"
    />
  </TableViewSwitcherWrapper>
) : (
  <div />
));

export default TableViewSwitcher;
