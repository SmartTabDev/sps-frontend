import React from 'react';

type FiltersDrawerContextType = {
  isOpen: boolean;
  setOpen: ((value: boolean) => void)| undefined;
};

const FiltersDrawerContext = React.createContext<FiltersDrawerContextType>({
  isOpen: false,
  setOpen: undefined,
});

export const FiltersDrawerProvider = FiltersDrawerContext.Provider;

export default FiltersDrawerContext;
