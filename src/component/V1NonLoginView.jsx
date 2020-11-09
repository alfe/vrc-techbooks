import React from 'react'
import styled from 'styled-components'
import RotationLogo from '../component/RotationLogo';
import '../App.css';

const NonLoginView = () => (
  <NonLiginViewArea>
  <RotationLogo />
    <InfoArea>
      <h1>VRC技術市</h1>
      <h2>VRChat技術の同人誌イベント</h2> 
      <DaysArea>
        2020<span>年 </span>
        2<span>月</span>
        15<span>日(土)・</span>
        16<span>日(日)</span>
      </DaysArea>
      <Flex>
      </Flex>
    </InfoArea>
  </NonLiginViewArea>
)
export default NonLoginView;

const isMobile = window.outerWidth < 800;
const NonLiginViewArea = styled.div`
  && {
    background-color: #282c34;
    min-height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: calc(10px + 2vmin);
    color: white;
  }
`;
const InfoArea = styled.div`
  h1 {
    font-size: ${isMobile ? '3rem' : '5rem'};
    margin-top: ${isMobile ? '-5rem' : '-7rem'};
  }
  h2 {
    margin: 0;
    margin-top: ${isMobile ? '-3rem' : '-5rem'};
    font-size: ${isMobile ? '1rem' : '1.8rem'};
    color: #26B6FF;
  }
`;
const DaysArea = styled.div`
  &&{ 
    width: ${isMobile ? '16rem' : '28rem;'}
    margin: 0 auto;
    font-size: 1.3em;
    font-family: monospace;
  }
  p {
    font-size: 0.7em;
    margin: .5rem 0;
    text-align: left;
    color: #AAA;
  }
  span {
    font-size: 0.7em;
    color: #AAA;
  }
`;
const Flex = styled.div`
  && {
    width: ${isMobile ? '100vw' : '80vw;'}
    margin: auto;
    max-width: 960px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  && > a {
    width: 25rem;
  }
`;
