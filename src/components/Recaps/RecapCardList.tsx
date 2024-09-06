import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
import { RecapCardType } from './utils/types';

type RecapCardListProps = {
  Card: React.FC<RecapCardType>;
  cards: (RecapCardType | undefined | null)[];
};

const RecapCardList: React.FC<RecapCardListProps> = ({ cards, Card }) => {
  return (
    <>
      {cards.map((card, index) => {
        if (!card) {
          return <Skeleton height="120px" key={index} />;
        }

        const { name } = card;

        return (
          <Box sx={{ height: '100%', display: 'flex' }} key={name}>
            <Card {...card} />
          </Box>
        );
      })}
    </>
  );
};

export default RecapCardList;
