import React from 'react'
import styled from 'styled-components'

export default {}

export const CoverInput = ({ uploaded, file, onChange }) => {
  const [preview, setPreview] = React.useState(uploaded || false);
  const onChangeFile = e => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
    onChange(e.target.files[0])
  }
  return (
    <BoxInput>
      <input className="box__file" type="file" accept="image/jpg" name="files[]" id="cover" onChange={onChangeFile} />
      {!preview && <label htmlFor="cover" >JPG : A4(595×842)</label>}
      {!!preview && <img alt="cover-preview" src={preview} />}
      {!!preview && <label htmlFor="cover" className="box__file__reupload">再アップロード[JPG : A4(595×842)]</label>}
    </BoxInput>
  );
}

export const MenuInput = ({ uploaded, menu, onChange }) => {
  const [preview, setPreview] = React.useState(uploaded || false);
  const onChangeMenu = e => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
    onChange(e.target.files[0])
  }
  return (
    <BoxInput>
      <input className="box__file" type="file" accept="image/jpg" name="menu[]" id="menu" onChange={onChangeMenu} />
      {!preview && <label htmlFor="menu">JPG : 1280×720</label>}
      {!!preview && <img id="menu-preview" alt="menu-preview" src={preview} />}
      {!!preview && <label htmlFor="menu" className="box__file__reupload">再アップロード[JPG : 1280×720]</label>}
    </BoxInput>
  );
}

export const TextInput = styled.input`
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

export const FormTitle = styled.h3`
  && {
    margin-top: 3rem;
  }
`;

export const UserName = React.memo(() => (
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

export const UploaderArea = styled.div`
  && {
    width: 100%;
    min-height: calc(100vh - 6rem);
    background-color: #282c34;
    padding: 3rem 0;
  }
`;
export const FormsArea = styled.div`
&& {
  max-width: 800px;
  background-color: #F8F8F8;
  margin: auto;
  padding: 3rem;
  border-radius 5px;
  text-align: left;
}
`;
