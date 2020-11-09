import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import logo from '../assets/image/logo.svg';


const RotationLogo = () => {
  return (
    <Canvas className="App-canvas" >
      <Thing />
    </Canvas>
  );
}

export default RotationLogo;

const Thing = () => {
  const ref = useRef()
  const texture = new THREE.TextureLoader().load(logo);
  useFrame(() => ((ref.current || { rotation: { y: 0 } }).rotation.y += 0.01))
  return (
    <mesh ref={ref} position={[0, 0.2, 2.8]} >
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  )
};
