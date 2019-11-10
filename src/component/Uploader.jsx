import React from 'react'
import styled from 'styled-components'
import { updateStore, uploadStorage, getUserData } from '../config';

const Uploader = React.memo(() => {
  const [user, setUser] = React.useState(false);
  if (!user) {
    getUserData().then(user => {
      console.info(user)
      setUser(user);
    })
  }
  return (!user) ? <div/> : (
    <UploadForm userData={user} />
  )
});

const UploadForm = React.memo(({ userData }) => {
  const [file, setfile] = React.useState({});
  const [menu, setmenu] = React.useState({});
  const [boothURL, setBooth] = React.useState(userData.boothURL || '');

  const submit = () => {
    const storeData = {};
    const now = new Date().toLocaleString();
    if (file.name) {
      uploadStorage(file, `${sessionStorage.getItem('username')}-cover.png`)
      storeData.PDFSubmittedAt = now;
      storeData.PosterSubmittedAt = now;
    }
    if (menu.name) {
      uploadStorage(menu, `${sessionStorage.getItem('username')}-menu.png`)
      storeData.MenuSubmittedAt = now;
    }
    if (boothURL !== '') {
      storeData.boothURL = boothURL;
    }
    if (Object.keys(storeData).length !== 0) {
      updateStore(storeData)
      console.log('uploaded:', storeData)
      alert('アップロードされました')
    }
  }
  const uploadedPoster = !userData.PosterSubmittedAt ? false :
  `${process.env.REACT_APP_FIREBASE_STORAGE_URL}${sessionStorage.getItem('username')}-cover.png?alt=media`;
  const uploadedMenu = !userData.MenuSubmittedAt ? false :
  `${process.env.REACT_APP_FIREBASE_STORAGE_URL}${sessionStorage.getItem('username')}-menu.png?alt=media`;

  return (
    <UploaderArea>
      <FormsArea>
        <UserName />
        <FormTitle>ポスター</FormTitle>
        <CoverInput uploaded={uploadedPoster} file={file} onChange={file => setfile(file)} />

        <FormTitle>お品書き</FormTitle>
        <MenuInput uploaded={uploadedMenu} menu={menu} onChange={file => setmenu(file)} />

        <FormTitle>頒布場所</FormTitle>
        <TextInput
          type="text"
          value={boothURL}
          placeholder="https://mmnk-vt.booth.pm/"
          onChange={e => setBooth(e.target.value)} />

        <SendButton disabled={
          !file.name && !menu.name &&
          (boothURL === '' || boothURL === userData.boothURL)
        } onClick={submit}>送信</SendButton>
      </FormsArea>
    </UploaderArea>
  )
});
export default Uploader;

const CoverInput = ({ uploaded, file, onChange }) => {
  const [preview, setPreview] = React.useState(uploaded || false);
  const onChangeFile = e => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
    onChange(e.target.files[0])
  }
  return (
    <BoxInput>
      <input className="box__file" type="file" name="files[]" id="cover" onChange={onChangeFile} />
      {!preview && <label htmlFor="cover" >JPG : A4(595×842)</label>}
      {!!preview && <img alt="cover-preview" src={preview} />}
      {!!preview && <label htmlFor="cover" className="box__file__reupload">再アップロード[JPG : A4(595×842)]</label>}
    </BoxInput>
  );
}

const MenuInput = ({ uploaded, menu, onChange }) => {
  const [preview, setPreview] = React.useState(uploaded || false);
  const onChangeMenu = e => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
    onChange(e.target.files[0])
  }
  return (
    <BoxInput>
      <input className="box__file" type="file" name="menu[]" id="menu" onChange={onChangeMenu} />
      {!preview && <label htmlFor="menu">JPG : 1280×720</label>}
      {!!preview && <img id="menu-preview" alt="menu-preview" src={preview} />}
      {!!preview && <label htmlFor="cover" className="box__file__reupload">再アップロード[JPG : 1280×720]</label>}
    </BoxInput>
  );
}

const SendButton = styled.button`
  && {
    width: 149px;
    padding: 1rem;
    color: #FFFFFF;
    font-size: 1.5rem;
    background: #21B7FF;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius:  1rem;
    cursor: pointer;
  }
  &:disabled {
    background: #CCCCCC;
  }
  &:disabled:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    transform: translate(0, 0);
  }
  &:hover {
    box-shadow: none;
    transform: translate(2px, 2px);
  }
  &:active {
    box-shadow: none;
    transform: translate(2px, 2px);
    background: #187eaf;
  }
`;
const TextInput = styled.input`
  && {
    border: 0;
    padding: .5rem 1rem;
    font-size: 1.3em;
    color: #333333;
    border:  1px solid #8E8E8E;
    border-radius:  5px;
    margin: 0 0 20px;
    width: calc(100% - 2rem);
  }
`;

const BoxInput = styled.div`
  && {
  }
  label {
    display: block;
    padding: 4rem 0;
    text-align: center;
    background: #F0F0F0;
    border: 1px solid #8E8E8E;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    font-size: 3rem;
    color: rgba(0,0,0,0.5);
  }
  label.box__file__reupload {
    padding: .5rem;
    background: none;
    border: none;
    text-align: right;
    cursor: pointer;
    font-size: 1rem;
  }
  img {
    margin: auto;
    height: 340px;
    display: block;
    padding: 10px 96px;
    background: #F0F0F0;
    border: 1px solid #8E8E8E;
    border-radius: 5px;
  }
  .box__file {
    display: none;
  }
`;

const FormTitle = styled.h3`
  && {
    margin-top: 3rem;
  }
`;

const UserName = React.memo(() => (
  <UserNameArea>
    <img src={sessionStorage.getItem('photoURL')} alt="user-icon" />
    <span>{sessionStorage.getItem('displayName')}</span>
  </UserNameArea>
));
const UserNameArea = styled.div`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  img {
    border-radius: 50%;
    margin-right: 1rem;
  }
  span {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const UploaderArea = styled.div`
  && {
    width: 100%;
    min-height: calc(100vh - 6rem);
    background-color: #282c34;
    padding: 3rem 0;
  }
`;
const FormsArea = styled.div`
&& {
  max-width: 800px;
  background-color: #F8F8F8;
  margin: auto;
  padding: 3rem;
  border-radius 5px;
  text-align: left;
}
`;
