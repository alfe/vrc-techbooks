import React from 'react'
import styled from 'styled-components'

const LoginGate = ({ onClick }) => (
  <LoginGateArea>
    <h2>VRC技術市 出展者用アップローダ</h2>
    <button
      className="App-login"
      disabled={process.env.REACT_APP_DISABLE_LOGIN==='true'}
      onClick={onClick}>
      Login
    </button>
  </LoginGateArea>
)

const LoginGateArea = styled.div`
  && {
    width: 100%;
    height: 100vh;
    background-color: #282c34;
    color: white;
  }
  h2 {
    margin: 0;
    padding: 10rem 0 3rem;
  }
  .App-login {
    position: relative;
  }
  .App-login:disabled {
    color: darkgray;
    background: gray;
    border: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

export default LoginGate;
