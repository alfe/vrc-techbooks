import React from 'react'
import styled from 'styled-components'
// import { uploadStorage } from '../config';
import { updateStore, uploadStorage } from '../config';

const Uploader = React.memo(() => {
  const [file, setfile] = React.useState(null);
  const [menu, setmenu] = React.useState(null);
  const [boothURL, setBooth] = React.useState('');
  // const [user, setUser] = React.useState({});

  const submit = () => {
    console.log(file, menu)
    const storeData = {};
    const now = new Date().toLocaleString();
    if (file.name) {
      uploadStorage(file, `${sessionStorage.getItem('username')}-000.png`)
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
    }
  }
  // getUserData().then(user => {
  //   console.info(user)
  //   setUser(user);
  //   setBooth(user.boothURL || '');
  // })
  
  return (
    <UploaderArea>
      <FormsArea>
        <UserName />
        <FormTitle>見本誌</FormTitle>
        <BoxInput>
          <input className="box__file" type="file" name="files[]" id="mihon" onChange={e => setfile(e.target.files[0])} />
          <label htmlFor="mihon">PDF : A4</label>
        </BoxInput>

        <FormTitle>お品書き</FormTitle>
        <BoxInput>
          <input className="box__file" type="file" name="menu[]" id="menu" onChange={e => setmenu(e.target.files[0])} />
          <label htmlFor="menu">JPG : 1280×720</label>
        </BoxInput>

        <FormTitle>頒布場所</FormTitle>
        <TextInput
          type="text"
          value={boothURL}
          placeholder="https://mmnk-vt.booth.pm/"
          onChange={e => setBooth(e.target.value)} />

        <SendButton onClick={submit}>送信</SendButton>
      </FormsArea>
    </UploaderArea>
  )
});
export default Uploader;

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
