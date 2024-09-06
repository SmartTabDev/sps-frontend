import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Article from './Article';

const StyledBox = styled(Box)`
  width: 80%;
  height: 100%;
  margin: auto;
`;

type Post = {
  id: number;
  title: {
    rendered: string;
  };
  type: string;
  link: string;
  excerpt: {
    rendered: string;
  };
};

const useBlogArticles = (): {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
} => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { REACT_APP_BLOG_API = '' } = process.env;

      if (REACT_APP_BLOG_API) {
        const response = await fetch(REACT_APP_BLOG_API);
        const json = await response.json();
        setPosts(json);
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error: errorMessage };
};

const Blog: React.FC = () => {
  const { posts, isLoading, error } = useBlogArticles();

  return (
    <StyledBox>
      {error && <p>{error}</p>}
      {posts.map((post) => {
        const { title, link, excerpt, id } = post;

        return (
          <Article
            key={id}
            title={title.rendered}
            url={link}
            content={excerpt.rendered}
            isLoading={isLoading}
          />
        );
      })}
    </StyledBox>
  );
};

export default Blog;
