import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface Props extends TypographyProps {
  name: string;
  url: string | undefined;
}

export const Headline: React.FC<Props> = ({
  name,
  url,
  ...typographyProps
}) => {
  const { palette } = useTheme();
  return (
    <div>
      <Typography
        fontWeight="bold"
        fontSize={20}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...typographyProps}
      >
        {name}
        {url && (
          <a target="_blank" rel="noreferrer" href={url}>
            <FaExternalLinkAlt
              style={{
                color: palette.modviseBlue.main,
                lineHeight: '1.5',
                marginLeft: 10,
                fontSize: 16,
              }}
            />
          </a>
        )}
      </Typography>
    </div>
  );
};
