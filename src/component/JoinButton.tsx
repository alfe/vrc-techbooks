import React from 'react'
import styled from 'styled-components'

const JoinButton = React.memo(() => (
  <Button
    href="https://docs.google.com/forms/d/e/1FAIpQLScZL8VvZQPWrWVXNhrZwyHAIxBr11E9BY7Ty0TpyOJrwfB4Qg/viewform"
    target="_blank"
    rel="external noopener noreferrer">
      参加申込
  </Button>
))
export default JoinButton;

const Button =styled.a`
  && {
    color: #FFFFFF;
    font-size: 2rem;
    background: #26B6FF;
    text-align: center;
    display: block;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: 4px 4px 16px #333;
    text-decoration: solid;
    text-shadow: 0 0 8px #022442;
    transition: 0.1s;
    z-index: 100;
  }
  &&:hover {
    box-shadow: 1px 1px 4px #333;
    transform: translate(1px, 4px);
    transition: 0.1s;
  }
  &&:active {
    background: #022442;
    transition: 0.1s;
  }
`;
