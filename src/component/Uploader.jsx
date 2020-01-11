import React from 'react'
import { providerTwitter, updateStore, uploadStorage, getUserData, createUserData, setDatas } from '../config';
// import PreviewDialog from './PreviewDialog'
import LoginGate from './LoginGate'
import Button from '@material-ui/core/Button';
import { CoverInput, MenuInput, TextInput, FormTitle, UserName, UploaderArea, FormsArea } from './UploaderItems'
import { SampleBookInput } from './SampleBookInput'

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
// eslint-disable-next-line no-unused-vars
const AddUser = () => {
  const addData = () => {
    // createUserData('Niko_14', 'himazin917', 309900);// displayName, twitter    
  }
  return (
    <button onClick={addData}>add</button>
  )
}

const UploadForm = React.memo(({ userData }) => {
  const [file, setfile] = React.useState({});
  const [menu, setmenu] = React.useState({});
  const [boothURL, setBooth] = React.useState(userData.boothURL || '');
  const [prefab, setPrefab] = React.useState({});

  const posterSubmit = async () => {
    const now = new Date().toLocaleString();
    uploadStorage(file, `${sessionStorage.getItem('username')}-poster.png`)
    await updateStore({ PosterSubmittedAt: now })
    sessionStorage.setItem('PosterSubmittedAt', now)
    alert('ポスターがアップデートされました');
    setfile({})
  }
  const menuSubmit = async () => {
    const now = new Date().toLocaleString();
    uploadStorage(menu, `${sessionStorage.getItem('username')}-menu.png`)
    await updateStore({ MenuSubmittedAt: now })
    sessionStorage.setItem('MenuSubmittedAt', now)
    alert('お品書きがアップデートされました');
    setmenu({})
  }
  const boothUrlSubmit = async () => {
    await updateStore({ boothURL })
    sessionStorage.setItem('boothURL', boothURL)
    console.log('uploaded:', `boothURL: ${boothURL}`)
    alert('頒布場所の情報がアップデートされました')
  }
  const onChangePrefab = e => {
    setPrefab(e.target.files.item(0))
  }
  const prefabSubmit = async () => {
    const now = new Date().toLocaleString();
    uploadStorage(prefab, prefab.name)
    await updateStore({ PrefabSubmittedAt: now })
    sessionStorage.setItem('PrefabSubmittedAt', now)
    alert('ファイルがアップロードされました')
  }
  const uploadedPoster = !userData.PosterSubmittedAt ? false :
  `${process.env.REACT_APP_FIREBASE_STORAGE_URL}${sessionStorage.getItem('username')}%2F${sessionStorage.getItem('username')}-poster.png?alt=media`;
  const uploadedMenu = !userData.MenuSubmittedAt ? false :
  `${process.env.REACT_APP_FIREBASE_STORAGE_URL}${sessionStorage.getItem('username')}%2F${sessionStorage.getItem('username')}-menu.png?alt=media`;

  return (
    <UploaderArea>
      <FormsArea>
        {/* <AddUser /> */}
        <UserName />
        <FormTitle>見本誌 <Memo>*必須 → 1/17一次受付  ◆  2/8締切</Memo></FormTitle>
        <SampleBookInput PDFSubmittedAt={userData.PDFSubmittedAt}/>

        <FormTitle>お品書き <Memo>*必須 → 1/26一次受付  ◆  2/8締切</Memo></FormTitle>
        <MenuInput uploaded={uploadedMenu} menu={menu} onChange={file => setmenu(file)} />
        <Button width="149px"
          variant="contained" color="primary" 
          disabled={!menu.name}
          onClick={menuSubmit}>送信</Button>

        <FormTitle>頒布場所 <Memo>*必須 → 1/17一次受付  ◆  2/8締切</Memo></FormTitle>
        <TextInput
          type="text"
          value={boothURL}
          placeholder="https://mmnk-vt.booth.pm/"
          onChange={e => setBooth(e.target.value)} />
        <Button width="149px"
          variant="contained" color="primary" 
          disabled={(boothURL === '' || boothURL === userData.boothURL)}
          onClick={boothUrlSubmit}>送信</Button>

        <FormTitle>ポスター<Memo>オプション → 1/17 一次受付  ◆  2/8締切</Memo></FormTitle>
        <p style={{ fontSize: '.8em', marginTop: '-1em' }}>（ポスターの設定をせず見本誌をアップロードすると、1ページ目がポスターとして使用されます）</p>
        <CoverInput uploaded={uploadedPoster} file={file} onChange={file => setfile(file)} />
        <Button width="149px"
          variant="contained" color="primary" 
          disabled={!file.name}
          onClick={posterSubmit}>送信</Button>

        <FormTitle>小物<Memo>オプション → 1/19 一次受付  ◆  2/2締切</Memo></FormTitle>
        <input type="file" onChange={onChangePrefab} />
        <br /><br />
        <Button width="149px"
          variant="contained" color="primary" 
          disabled={!prefab.name}
          onClick={prefabSubmit}>送信</Button>
      </FormsArea>
    </UploaderArea>
  )
});
export default Uploader;

const Memo = ({ children }) => (
  <span style={{ fontSize: '.8em', marginLeft: '1em' }}>{children}</span>
);
