import React from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useThree, useResource, extend  } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import poster from './mmnk_0.jpg';
import menuImage from './mmnk_menu.jpg';
import SendButton from './SendButton'

extend({ OrbitControls })

const PreviewDialog = ({ file, menu, onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = () => {
    onSubmit(() => setOpen(false))
  }
  return (
    <React.Fragment>
      <SendButton
        disabled={!file.name || !menu.name}
        onClick={() => setOpen(true)}>
        プレビュー
      </SendButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title">ブースのプレビュー</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            左ドラッグ：向きの変更 / スクロール：拡大縮小
          </DialogContentText>

          <Canvas className="App-canvas" style={{ background: '#272727' }}>
            <Camera position={[0, 0, 120]} />
            <Thing file={file} menu={menu} />
            <Controls />
          </Canvas>

        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button onClick={() => setOpen(false)} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            アップロード
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default PreviewDialog;

const Camera = (props) => {
  const ref = React.useRef()
  const { camera } = useThree()
  camera.position.z=2.8
  console.log(ref, camera)
  useFrame(() => ref.current.updateMatrixWorld())
  return <perspectiveCamera ref={ref} {...props} />
};

const Controls = () => {
  const ref = React.useRef()
  const { camera, gl } = useThree()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
}

const getFileTexture = (f, setter) => {
  const reader = new FileReader();
  reader.onload = (e) => setter(e.target.result);
  reader.readAsDataURL(f);
}

const Thing = ({ file, menu }) => {
  const ref = React.useRef()
  const [fileRead, settexture] = React.useState();
  const [menuRead, setMenutexture] = React.useState();

  getFileTexture(file, settexture)
  getFileTexture(menu, setMenutexture)
  const texture = new THREE.TextureLoader().load(fileRead || poster);
  const menuTexture = new THREE.TextureLoader().load(menuRead || menuImage);

  return (
    <React.Fragment>
      <mesh ref={ref} position={[0, .8, 0]} >
        <planeBufferGeometry attach="geometry" args={[1.51, 2.17]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={ref} position={[0, -.5, .25]} rotation={[175, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1.51, 0.669]} />
        <meshBasicMaterial attach="material" color="grey" />
      </mesh>
      <mesh ref={ref} position={[0, -1.15, .52]} >
        <planeBufferGeometry attach="geometry" args={[1.51, 0.869]} />
        <meshBasicMaterial attach="material" map={menuTexture} />
      </mesh>
    </React.Fragment>
  )
}
