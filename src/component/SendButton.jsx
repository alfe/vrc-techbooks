import styled from 'styled-components'

const SendButton = styled.button`
  && {
    ${p => p.width ? `width: ${p.width};`:''}
    padding: 1rem;
    color: #FFFFFF;
    font-size: 1.5rem;
    background: #21B7FF;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius:  1rem;
    cursor: pointer;
  }
  &:disabled {
    background: #CCCCCC;
  }
  &:disabled:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    transform: translate(0, 0);
  }
  &:hover {
    box-shadow: none;
    transform: translate(2px, 2px);
  }
  &:active {
    box-shadow: none;
    transform: translate(2px, 2px);
    background: #187eaf;
  }
`;

export default SendButton;
