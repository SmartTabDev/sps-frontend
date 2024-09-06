import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useDebounce } from 'react-use';
import { Marketplace } from 'reducers/auth/auth';

type Hook = {
  debouncedValue: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const useMarketplaceSearch = (marketplace: Marketplace): Hook => {
  const [value, setValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useDebounce(
    () => {
      setDebouncedValue(value);
    },
    2000,
    [value],
  );

  useEffect(() => {
    setValue('');
  }, []);

  useEffect(() => {
    setValue('');
  }, [marketplace]);

  return {
    debouncedValue,
    value,
    setValue,
  };
};

export default useMarketplaceSearch;
