import React, { useRef } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import logo from './logo.svg';
import '../App.css';

const NonLoginView = () => (
  <NonLiginViewArea>
    <TwoLogo><span>Ⅱ</span></TwoLogo>
    <Canvas className="App-canvas" >
      <Thing />
    </Canvas>
    <InfoArea>
      <h1>VRC技術市</h1>
      <h2>VRChat技術の同人誌イベント</h2> 
      <DaysArea>
        coming soon...
      </DaysArea>
      <Flex>
      </Flex>
    </InfoArea>
  </NonLiginViewArea>
)
export default NonLoginView;

const isMobile = window.outerWidth < 800;
const TwoLogo = styled.div`
  && {
    position: absolute;
    max-width: 100vw;
    overflow: hidden;
  }
  && > span {
    display: block;
    width: ${isMobile ? '30rem' : '45rem'};
    margin-top: ${isMobile ? '6rem' : '8rem'};
    color: rgba(255,255,255,0.25);
    font-size: 25rem;
    text-align: right;
    transform: rotate(7deg);
  }
`;
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
