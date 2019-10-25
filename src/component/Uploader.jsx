import React from 'react'
import styled from 'styled-components'
import { uploadStorage } from '../config';

const Uploader = ({ userData }) => {
  const [file, setfile] = React.useState('アップロード');
  const uploadImage = () => {
    console.log(file)
    uploadStorage(file, `${userData.username}-${userData.uid}-000.png`)
  }
  return (
    <UploaderArea>
      <input type="file" onChange={e => setfile(e.target.files[0])} />
      <button onClick={uploadImage}>submit</button>
    </UploaderArea>
  )
}
export default Uploader;

const UploaderArea = styled.div``;
