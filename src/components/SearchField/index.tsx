import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import Input from '../Input/index';

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
};

const SearchField: React.FC<SearchFieldProps> = ({
  onChange,
  label,
  id,
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: val } = e.target;
    onChange(val);
  };

  return (
    <Input
      id={id}
      label={label}
      onChange={handleChange}
      fullWidth
      type="text"
      value={value}
      InputLabelProps={{
        style: {
          fontSize: '14px',
          fontWeight: 500,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search
              sx={{
                fontSize: 20,
                fill: '#525F81',
                marginBottom: '3px',
              }}
            />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      sx={{ width: '300px', marginLeft: 'auto', color: '#525F81' }}
      size="small"
    />
  );
};

export default SearchField;
