import React from 'react';

type BadgesContextType = {
  asButton: boolean;
  size: number;
  colors: {
    primary: string;
    outline: string;
  };
};

const BadgesContext = React.createContext<BadgesContextType>({
  size: 14,
  asButton: false,
  colors: {
    primary: '#447EEB',
    outline: '#525F81',
  },
});

export default BadgesContext;
