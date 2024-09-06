import React from 'react';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import SlideOut from 'components/SlideOut/SlideOut';
import LevelRow from './components/LevelRow';
import NoLevelDataRow from './components/NoLevelDataRow';

enum LEVEL_COLORS {
  RED = '#EB5757',
  ORANGE = '#F2994A',
  YELLOW = '#F2C94C',
  LIME = '#BADC68',
  GREEN = '#27AE60',
}

const LEVELS = [
  { color: LEVEL_COLORS.RED, text: '1 - 19.99%' },
  { color: LEVEL_COLORS.ORANGE, text: '20 - 39.99%' },
  { color: LEVEL_COLORS.YELLOW, text: '40 - 59.99%' },
  { color: LEVEL_COLORS.LIME, text: '60 - 79.99%' },
  { color: LEVEL_COLORS.GREEN, text: '80 - 100%' },
];

const SlideOutLevels = () => {
  return (
    <SlideOut title="% LEVELS" hideOnOutsideClick>
      <TableContainer>
        <Table>
          <TableBody>
            {LEVELS.map(({ color, text }) => (
              <LevelRow key={text} color={color}>
                {text}
              </LevelRow>
            ))}
            <NoLevelDataRow />
          </TableBody>
        </Table>
      </TableContainer>
    </SlideOut>
  );
};

export default SlideOutLevels;
