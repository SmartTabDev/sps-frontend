import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';

export const USERNAMES = [
  'butchers@modvise.com',
  'philips@modvise.com',
  'joanna@modvise.com',
  'lg@modvise.com',
  'loreal-pl@modvise.com',
] as const;

type Username = typeof USERNAMES[number];

const useUsername = (): {
  username: Username;
} => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { username } = jwt<{ username: Username }>(accessToken);

  return { username };
};

export default useUsername;
