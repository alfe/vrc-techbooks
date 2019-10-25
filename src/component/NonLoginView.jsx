import React, { useRef } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import logo from './logo.svg';
import RecruitText from './RecruitText'
import JoinButton from './JoinButton'
import '../App.css';

const NonLoginView = ({ onClick }) => (
  <header className="App-header">
    <Canvas className="App-canvas" >
      <Thing />
    </Canvas>
    <InfoArea>
      <h1>VRC技術市</h1>
      <DaysArea>
        <p><DaysLabel>開催日：</DaysLabel>　2020年　2月15日(土)・16日(日)</p>
        <p><DaysLabel>申込締切：</DaysLabel>　2019年 11月30日(土)</p>
        <br />
        <JoinButton />
      </DaysArea>
      <h2>VRChat技術者へ、 お願いがあります。</h2>
      <RecruitText />
      {/* <div>
        <button className="App-login" onClick={onClick}>Login</button>
      </div> */}
    </InfoArea>
  </header>
)
export default NonLoginView;

const isMobile = window.outerWidth < 800

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
    width: ${isMobile ? '18rem' : '28rem'};
    margin: -2rem auto 4rem;
}
  p {
    font-size: 0.7em;
    margin: .5rem 0;
    text-align: left;
    color: #AAA;
  }
`;
const DaysLabel = styled.span`
  width: 5em;
  display: inline-block;
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
