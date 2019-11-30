import React from 'react'
import { providerTwitter, updateStore, uploadStorage, getUserData, createUserData } from '../config';
import PreviewDialog from './PreviewDialog'
import SendButton from './SendButton'
import LoginGate from './LoginGate'
import { CoverInput, MenuInput, SampleBookInput, TextInput, FormTitle, UserName, UploaderArea, FormsArea } from './UploaderItems'

const Uploader = React.memo(() => {
  const [user, setUser] = React.useState(false);
  if (!user) {
    getUserData().then(user => {
      console.info(user)
      setUser(user);
    })
  }
  return (!user) ? (
    <LoginGate onClick={() => providerTwitter(() => {window.location.reload()})} />
  ) : (
    <UploadForm userData={user} />
  )
});

const UploadForm = React.memo(({ userData }) => {
  const [file, setfile] = React.useState({});
  const [menu, setmenu] = React.useState({});
  const [boothURL, setBooth] = React.useState(userData.boothURL || '');

  const submit = async (successCallback) => {
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
    if (Object.keys(storeData).length !== 0) {
      await updateStore(storeData)
      console.log('uploaded:', storeData)
      if (!!successCallback) successCallback()
    }
  }
  const boothUrlSubmit = async () => {
    const storeData = {};
    if (boothURL !== '') {
      storeData.boothURL = boothURL;
    }
    if (Object.keys(storeData).length !== 0) {
      await updateStore(storeData)
      console.log('uploaded:', storeData)
      alert('頒布場所の情報がアップデートされました')
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
        <p style={{ fontSize: '.8em', marginRop: '-1em' }}>（オプション：ポスターの設定をせず見本誌をアップロードすると、1ページ目がポスターとして使用されます）</p>
        <CoverInput uploaded={uploadedPoster} file={file} onChange={file => setfile(file)} />

        <FormTitle>お品書き *</FormTitle>
        <MenuInput uploaded={uploadedMenu} menu={menu} onChange={file => setmenu(file)} />

        <PreviewDialog file={file} menu={menu} onSubmit={submit} />

        <FormTitle>見本誌 *</FormTitle>
        <SampleBookInput />
        <SendButton width="149px" disabled={true}>送信</SendButton>

        <FormTitle>頒布場所 *</FormTitle>
        <TextInput
          type="text"
          value={boothURL}
          placeholder="https://mmnk-vt.booth.pm/"
          onChange={e => setBooth(e.target.value)} />

        <SendButton width="149px" disabled={
          (boothURL === '' || boothURL === userData.boothURL)
        } onClick={boothUrlSubmit}>送信</SendButton>
      </FormsArea>
    </UploaderArea>
  )
});
export default Uploader;
