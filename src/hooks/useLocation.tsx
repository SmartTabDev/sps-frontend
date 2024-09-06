import React from "react";

const useLocation = (key: keyof Location) => {
  const [value, setValue] = React.useState(window.location[key] as any);
  const listenToPopstate = () => {
    setValue(window.location[key]);
  };
  React.useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return value;
};

export default useLocation;
