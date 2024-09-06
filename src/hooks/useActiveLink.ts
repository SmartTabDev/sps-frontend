import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  const { pathname } = useLocation();

  return {
    active: pathname.includes(path),
    isExternalLink: path.includes('http'),
  };
}
