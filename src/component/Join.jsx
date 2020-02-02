import React from 'react'
import styled from 'styled-components'
import publicIcon from './join-public.svg';
import friendsIcon from './join-friends.svg';
import searchIcon from './join-search.svg';

const Join = ({ onClick }) => (
    <InfoArea>
      <h1>入場方法</h1>
      <h2>VRChat内でワールドを開く</h2>
      <div className="search">
        <img src={searchIcon} alt="Search"/>
        <p>メニュー > World から<br/>“GIJUTU” で検索して入場</p>
      </div>
      <h2>ブラウザからワールドを開く</h2> 
      <a href="https://www.vrchat.com/home/launch?worldId=wrld_3a71aacd-b494-401f-a31b-da9735708d57" target="_blank" rel="noopener noreferrer" alt="Pulic launch">
        <img src={publicIcon} alt="Public"/>
         <span>VRChat公式サイトに移動して<br/>“LAUNCH WORLD”から入場</span>
      </a>
      <a href="https://www.vrchat.com/home/world/wrld_3a71aacd-b494-401f-a31b-da9735708d57" target="_blank" rel="noopener noreferrer" alt="Other launch">
        <img src={friendsIcon} alt="Friends"/>
        <span>VRChat公式サイトにログイン後<br/>“INSTANCES”から入場</span>
      </a>
    </InfoArea>
)
export default Join;

const isMobile = window.outerWidth < 800;
const InfoArea = styled.div`
  h1 {
    font-size: ${isMobile ? '2rem' : '4rem'};
    color: #FFFFFF;
    margin-bottom: 0;
  }
  h2 {
    font-size: ${isMobile ? '1rem' : '1.8rem'};
    color: #26B6FF;
  }
  h2:not(:first-of-type) {
    margin-top: 4rem;
  }
  a {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    max-width: 640px;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 25px;
    box-shadow: 4px 4px 4px rgba(255,255,255,0.15);
    margin: auto auto ${isMobile ? '1rem' : '2rem'};;
    padding: 1rem;
    color: #FFFFFF;
    text-decoration: none;
  }
  a:hover {
    background: rgba(255,255,255,0.1);
  }
  a:active {
    background: rgba(255,255,255,0.1);
    filter: brightness(0.8);
  }
  a > img {
    height: ${isMobile ? '4rem' : '8rem'};
    width: ${isMobile ? '4rem' : '8rem'};
  }
  a > span {
    font-size: ${isMobile ? '1rem' : '2rem'};
    font-family: monospace;
    font-weight: bold;
  }
  .search {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    max-width: 640px;
    margin: auto auto ${isMobile ? '1rem' : '2rem'};;
    padding: 1rem;
    color: #FFFFFF;
    box-sizing: border-box;
    border-top: 1px solid #999999;
    border-bottom: 1px solid #999999;
  }
  .search > p {
    font-size: ${isMobile ? '1rem' : '2rem'};
    font-family: monospace;
    color: #FFFFFF;
  }
  .search > img {
    height: ${isMobile ? '4rem' : '8rem'};
    width: ${isMobile ? '4rem' : '8rem'};
  }
`;



