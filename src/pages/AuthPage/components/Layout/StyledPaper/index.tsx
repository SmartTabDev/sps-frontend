import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)`
  overflow: hidden !important;
  max-width: 60rem;
  width: 100%;
  min-width: calc(
    370px + 2.5rem * 2
  );
  z-index: 1000;
  background-color: ${({ theme }) => theme.palette.blueGrey[100]};
  box-shadow: rgb(82 95 129 / 20%) 0px 4px 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;

  @media (max-width: 1100px) {
    margin-top: 6.5rem;
    margin-bottom: 4rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

export default StyledPaper;
