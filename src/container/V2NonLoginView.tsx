import React from 'react';
import styled from 'styled-components';
import media from "styled-media-query";

import RotationLogo from '../component/RotationLogo';
import JoinButton from '../component/JoinButton';
import RecruitText from '../component/RecruitText';
import '../App.css';

const NonLoginView = () => (
  <NonLoginViewArea>    
    <TwoLogo><span>Ⅱ</span></TwoLogo>
    <RotationLogo />
    <InfoArea>
      <h1>VRC技術市</h1>
      <h2>VRChat技術の同人誌イベント</h2> 
      <DaysArea>
        coming soon...
      </DaysArea>
      {process.env.REACT_APP_RECRUITMENT === 'true' && (
        <React.Fragment>
          <Flex>
            <JoinButton />
          </Flex>
          <h3>VRChat技術者へ、 お願いがあります。</h3>
          <RecruitText />
        </React.Fragment>
      )}
    </InfoArea>
  </NonLoginViewArea>
)
export default NonLoginView;

const TwoLogo = styled.div`
  && {
    position: absolute;
    max-width: 100vw;
    overflow: hidden;
    user-select: none;
  }
  && > span {
    display: block;
    color: rgba(255,255,255,0.25);
    font-size: 25rem;
    text-align: right;
    transform: rotate(7deg);
  }
  ${media.lessThan("medium")`
    width: 30rem;
    margin-top: 6rem;
  `}
  ${media.greaterThan("medium")`
    width: 45rem;
    margin-top: 8rem;
  `}
`;
const NonLoginViewArea = styled.div`
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
  ${media.lessThan("medium")`
    h1 {
      font-size: 3rem;
      margin-top: -5rem;
    }
    h2 {
      margin: 0;
      margin-top: -3rem;
      font-size: 1rem;
      color: #26B6FF;
    }
  `}
  ${media.greaterThan("medium")`
    h1 {
      font-size: 5rem;
      margin-top: -7rem;
    }
    h2 {
      margin: 0;
      margin-top: -5rem;
      font-size: 1.8rem;
      color: #26B6FF;
    }
  `}
`;
const DaysArea = styled.div`
  &&{
    ${media.lessThan("medium")`
      width: 16rem;
    `}
    ${media.greaterThan("medium")`
      width: 28rem;
    `}
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
    ${media.lessThan("medium")`
      width: 100vw;
    `}
    ${media.greaterThan("medium")`
      width: 80vw;
    `}
    margin: 3rem auto;
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
