import React, { useRef } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import logo from './logo.svg';
// import RecruitText from './RecruitText'
// import ParticipantListButton from './ParticipantListButton'
// import JoinButton from './JoinButton'
import '../App.css';

const NonLoginView = ({ onClick }) => (
  <NonLiginViewArea>
    {/* <LoginButton /> */}
    <Canvas className="App-canvas" >
      <Thing />
    </Canvas>
    <InfoArea>
      <h1>VRC技術市</h1>
      <DaysArea>
        {/* <p><DaysLabel>申込締切：</DaysLabel>　2020年　1月13日(月・祝)</p> */}
        {/* <p><DaysLabel>開催日：</DaysLabel>　2020年　2月15日(土)・16日(日)</p> */}
        {/* <br /> */}
        2020<span>年 </span>
        2<span>月</span>
        15<span>日(土)・</span>
        16<span>日(日)</span>
      </DaysArea>
      <Flex>
        {/* <ParticipantListButton /> */}
        {/* <JoinButton /> */}
      </Flex>
      {/* <h2>VRChat技術者へ、 お願いがあります。</h2> */}
      {/* <RecruitText /> */}
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
    margin-top: 7rem;
    font-size: ${isMobile ? '2.5rem' : '3rem'};
  }
`;
const DaysArea = styled.div`
  &&{ 
    width: ${isMobile ? '16rem' : '28rem;'}
    margin: -3rem auto 2rem;
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
// const DaysLabel = styled.span`
//   width: 5em;
//   display: inline-block;
// `;
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

const Thing = () => {
  const ref = useRef()
  const texture = new THREE.TextureLoader().load(logo);
  useFrame(() => (ref.current.rotation.y += 0.01))
  return (
    <mesh ref={ref} position={[0, 0.2, 2.8]} >
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  )
}

// const LoginButton = () => {
//   const { history } = useReactRouter();
//   const onClick = () => providerTwitter(() => {
//     history.push('/users');
//   })
//   return (
//     <button className="App-login" onClick={onClick}>Login</button>
//   );
// };
