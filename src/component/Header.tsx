import React from 'react'
import styled from 'styled-components'
import logo from './logo.svg';

const Header = () => {
  return (
    <header className="App-header">
      <div>
        <HeaderItem href="./" alt="VRC技術市">
          <img src={logo} alt="VRC技術市"/>
          <span className="hm">VRC技術市</span>
        </HeaderItem>
        {(window.location.href.includes('v1')) && (
          <React.Fragment>
            <HeaderItem href="./catalog" alt="カタログ">カタログ</HeaderItem>
            <HeaderItem href="./join" alt="入場方法">入場方法</HeaderItem>
          </React.Fragment>
        )}
      </div>
      <div>
        <SwitchVersion />
        {/* <HeaderItem href="/users" alt="出展者入口">出展者入口</HeaderItem> */}
      </div>
    </header>
  );
};

export default Header;

const SwitchVersion = () => {
  if (window.location.href.includes('v1')) {
    return (
      <HeaderSwitchVersion href="/"><span className="hm">VRC技術市</span>Ⅱ</HeaderSwitchVersion>
    );
  }
  return (
    <HeaderSwitchVersion href="/v1/"><span className="hm">VRC技術市</span>Ⅰ</HeaderSwitchVersion>
  );
};

const isMobile = window.outerWidth < 425;
const HeaderSwitchVersion = styled.a`
  && {
    font-size: ${isMobile ? '1rem' : '1.5rem'};
    text-decoration: none;
    padding: .5rem 1.5rem;
    margin: .5rem;
    font-weight: bold;
    color: #FFFFFF;
    border-radius: 8px;
  }
  &&:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  && > img {
    height: 2rem;
    margin: 0 .5rem -.3rem;
  }
  .hm {
    ${isMobile ? 'display: none' : ''};
  }
`;

const HeaderItem = styled.a`
  && {
    font-size: ${isMobile ? '1rem' : '1.5rem'};
    text-decoration: none;
    padding: ${isMobile ? '.25rem' : '.5rem 1.5rem'};
    margin: .5rem;
    font-weight: bold;
    color: #FFFFFF;
    border-radius: 8px;
  }
  &&:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  && > img {
    height: 2rem;
    margin: 0 .5rem -.3rem;
  }
  .hm {
    ${isMobile ? 'display: none' : ''};
  }
`;
