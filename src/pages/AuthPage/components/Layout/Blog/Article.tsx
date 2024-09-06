/* eslint-disable no-nested-ternary, react/no-danger */
import React from 'react';
import { styled } from '@mui/system';
import TextButtonComponent from 'components/TextButton/index';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import * as DOMPurify from 'dompurify';

type Props = {
  title: string;
  type?: string;
  content: string;
  url?: string;
  isLoading: boolean;
};

const StyledBox = styled(Box)`
  margin-bottom: 1rem;
  font-size: 14px;
`;

const TitleTypography = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #3b455e;
  margin-bottom: 1rem;
`;

const TypeTypography = styled(Typography)`
  font-weight: bold;
  line-height: 17px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const ContentTypography = styled(Typography)`
  font-family: Karla;
  color: ${({ theme }) => theme.palette.common.black};
`;

const ReadMoreButton = styled(TextButtonComponent)`
  font-family: Karla;
`;

const Article: React.FC<Props> = ({
  title,
  type = 'Article',
  content,
  url,
  isLoading,
}) => (
  <StyledBox>
    <TypeTypography>
      {isLoading ? <Skeleton width={60} /> : type}
    </TypeTypography>
    <TitleTypography>
      {isLoading ? <Skeleton width={270} /> : title}
    </TitleTypography>
    <ContentTypography>
      {isLoading ? (
        <>
          <Skeleton width={230} />
          <Skeleton width={230} />
          <Skeleton width={230} />
          {Math.random() < 0.5 ? <Skeleton width={230} /> : null}
        </>
      ) : (
        DOMPurify.sanitize(content, { ALLOWED_TAGS: [] })
      )}
    </ContentTypography>
    {url ? (
      isLoading ? (
        <Skeleton width={65} />
      ) : (
        <a
          href={url}
          style={{ textDecoration: 'none' }}
          target="_blank"
          rel="noreferrer"
        >
          <ReadMoreButton>Read more</ReadMoreButton>
        </a>
      )
    ) : null}
  </StyledBox>
);

export default Article;
