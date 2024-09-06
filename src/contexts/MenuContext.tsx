import useNavigation from 'hooks/useNavigation';
import React, { ReactNode, createContext, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export type MenuContextProps = {
  isMenuOpen: boolean;
  onToggleMenu: VoidFunction;
  navConfig: any[];
};

const initialState: MenuContextProps = {
  isMenuOpen: false,
  onToggleMenu: () => undefined,
  navConfig: [],
};

const MenuContext = createContext(initialState);

type MenuProviderProps = {
  children: ReactNode;
};

function MenuProvider({ children }: MenuProviderProps) {
  const services = useSelector((state: RootState) => state.auth.services);
  const navConfig = useNavigation(services);
  const [open, setOpen] = useState<boolean>(true);

  const onToggleMenu = useCallback(() => {
    setOpen((isOpen) => !isOpen);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: open,
        onToggleMenu,
        navConfig,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export { MenuProvider, MenuContext };
