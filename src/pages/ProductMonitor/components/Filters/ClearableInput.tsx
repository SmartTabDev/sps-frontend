import { styled } from '@mui/system';

const ClearableInput = styled('div')`
  display: flex;

  > div {
    width: 100%;
  }
  
  button {
    margin-left: 20px;

    div { 
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default ClearableInput;
