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
        <p>
          <span className="label">開催 : </span>
          2021<span>年 </span>
          2<span>月</span>
          20<span>日(土)・</span>
          21<span>日(日)</span>
        </p>
        <p>
          <span className="label">出展申込締切 : </span>
          2020<span>年 </span>
          12<span>月</span>
          20<span>日(日)</span>
        </p>
      </DaysArea>
      {process.env.REACT_APP_RECRUITMENT === 'true' && (
        <React.Fragment>
          <Flex>
            <JoinButton />
          </Flex>
          <CopyText>VRChat技術者へ、 お願いがあります。</CopyText>
          <RecruitText />
        </React.Fragment>
      )}
    </InfoArea>
  </NonLoginViewArea>
)
export default NonLoginView;

const CopyText = styled.h3`
  && {
    ${media.lessThan("medium")`
      font-size: 1.8em  ;
      margin: 3rem auto 0;
    `}
    ${media.greaterThan("medium")`
      font-size: 2.5em;
      margin: 3rem auto 0;
    `}
  }
`;

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
    margin-top: 4rem;
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
  && {
    ${media.lessThan("medium")`
      width: 16rem;
    `}
    ${media.greaterThan("medium")`
      width: 30rem;
    `}
    margin: 0 auto;
    font-size: 1.4em;
  }
  p {
    margin: .5rem auto;
    text-align: left;
  }
  span {
    color: #AAA;
    ${media.lessThan("medium")`
      font-size: 0.5em;
    `}
    ${media.greaterThan("medium")`
      font-size: 0.7em;
    `}
  }
  span.label {
    padding: 0 0.5em;
    ${media.lessThan("medium")`
      text-align: left;
      display: block;
    `}
    ${media.greaterThan("medium")`
      text-align: right;
      width: 8em;
      display: inline-block;
    `}
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
