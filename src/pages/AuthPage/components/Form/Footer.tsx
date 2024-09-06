import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextButtonComponent from 'components/TextButton/index';

const StyledBox = styled(Box)`
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  margin-top: 1rem;
  margin-bottom: -1rem;
  @media (max-width: 1250px) {
    margin-top: 2rem;
  }
`;

const ContactUsText = styled(Typography)`
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  display: block;

  a {
    text-decoration: none;
  }
`;

const ContactUsTextButton = styled(TextButtonComponent)`
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  align-items: initial;
  vertical-align: initial;
`;

const TermsAndPolicyText = styled(Typography)`
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  margin-top: 3rem;
  @media (max-width: 1250px) {
    max-width: 70%;
    margin: 2rem auto 0 auto;
  }
`;

const TermsAndPolicyTextButton = styled(TextButtonComponent)`
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  align-items: initial;
  vertical-align: initial;
`;

export const Footer: React.FC = () => (
  <StyledBox>
    <ContactUsText variant="body1">
      Don’t have an account?
      {' '}
      <a href="https://modvise.com/#modcon" target="_self" rel="noopener noreferrer">
        <ContactUsTextButton>Contact us</ContactUsTextButton>
      </a>
    </ContactUsText>
    <TermsAndPolicyText variant="body1">
      By logging in, you agree to the
      {' '}
      <TermsAndPolicyTextButton>Terms of Service</TermsAndPolicyTextButton>
      {' '}
      and
      {' '}
      <TermsAndPolicyTextButton> Privacy Policy</TermsAndPolicyTextButton>
    </TermsAndPolicyText>
  </StyledBox>
);
