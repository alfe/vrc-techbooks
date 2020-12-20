import React from 'react'
import Button from '@material-ui/core/Button';
import { updateStore, uploadStorage } from '../config';
import {
  CoverInput, MenuInput, TextInput,
  FormTitle, UserName, UploaderArea, FormsArea,
} from './UploaderItems'
import SampleBookInput from './SampleBookInput'

const UploadForm = React.memo(({ userData }) => {
  const [file, setFile] = React.useState({});
  const [menu, setMenu] = React.useState({});
  const [boothURL, setBooth] = React.useState(userData.boothURL || '');

  const posterSubmit = async () => {
    const now = new Date().toLocaleString();
    uploadStorage(file, `${sessionStorage.getItem('username')}-poster.png`, 'poster')
    await updateStore({ PosterSubmittedAt: now })
    sessionStorage.setItem('PosterSubmittedAt', now)
    alert('ポスターがアップデートされました');
    setFile({})
  }
  const menuSubmit = async () => {
    const now = new Date().toLocaleString();
    uploadStorage(menu, `${sessionStorage.getItem('username')}-menu.png`, 'menu')
    await updateStore({ MenuSubmittedAt: now })
    sessionStorage.setItem('MenuSubmittedAt', now)
    alert('お品書きがアップデートされました');
    setMenu({})
  }
  const boothUrlSubmit = async () => {
    await updateStore({ boothURL })
    sessionStorage.setItem('boothURL', boothURL)
    console.log('uploaded:', `boothURL: ${boothURL}`)
    alert('頒布場所の情報がアップデートされました')
  }
  const FIREBASE_ROOT = `${process.env.REACT_APP_FIREBASE_STORAGE_URL}v2%2F`
  const uploadedPoster = !userData.PosterSubmittedAt ? false :
  `${FIREBASE_ROOT}poster%2F${sessionStorage.getItem('username')}-poster.png?alt=media`;
  const uploadedMenu = !userData.MenuSubmittedAt ? false :
  `${FIREBASE_ROOT}menu%2F${sessionStorage.getItem('username')}-menu.png?alt=media`;

  return (
    <UploaderArea>
      { window.navigator.userAgent.toLowerCase().indexOf('chrome') < 0 &&
        <NotUseChrome>うまくアップロードできない場合はGoogle Chromeでお試しください</NotUseChrome>
      }
      <FormsArea>
        <UserName />
        <FormTitle>見本誌</FormTitle>
        <SampleBookInput PDFSubmittedAt={userData.PDFSubmittedAt} uploadedPages={userData.totalPages}/>

        <FormTitle>頒布場所</FormTitle>
        <TextInput
          type="text"
          value={boothURL}
          placeholder="https://mmnk-vt.booth.pm/"
          onChange={e => setBooth(e.target.value)} />
        <Button width="149px"
          variant="contained" color="primary" 
          disabled={(boothURL === '' || boothURL === userData.boothURL)}
          onClick={boothUrlSubmit}>送信</Button>

        <FormTitle>お品書き</FormTitle>
        <MenuInput uploaded={uploadedMenu} menu={menu} onChange={file => setMenu(file)} />
        <Button width="149px"
          variant="contained" color="primary" 
          disabled={!menu.name}
          onClick={menuSubmit}>送信</Button>

        <FormTitle>ポスター<Memo>(オプション)</Memo></FormTitle>
        <p style={{ fontSize: '.8em', marginTop: '-1em' }}>（ポスターの設定をせず見本誌をアップロードすると、1ページ目がポスターとして使用されます）</p>
        <CoverInput uploaded={uploadedPoster} file={file} onChange={file => setFile(file)} />
        <Button width="149px"
          variant="contained" color="primary" 
          disabled={!file.name}
          onClick={posterSubmit}>送信</Button>
      </FormsArea>
    </UploaderArea>
  )
});

export default UploadForm;

const Memo = ({ children }) => (
  <span style={{ fontSize: '.8em', marginLeft: '1em' }}>{children}</span>
);
const NotUseChrome = ({ children }) => (
  <span style={{ fontSize: '.8em', color: '#FFFFFF' }}>{children}</span>
);
