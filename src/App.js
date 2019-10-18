import React from 'react';
import logo from './logo.svg';
import './App.css';
import { providerTwitter, uploadStorage } from './config';

const DUMMY = {username: "mmnk_vt", displayName: "みみんく📚本紹介VTuber", photoURL: "https://pbs.twimg.com/profile_images/980282448968794112/zV_emHrn_normal.jpg", uid: "PPfIEehV23OgmRCUXxNDUlstiCv2"};
function App() {
  const [file, setfile] = React.useState('アップロード');
  const [userData, setUser] = React.useState(DUMMY || false);
  const handleLogin = () => {
    providerTwitter(setUser)
  }
  const uploadImage = () => {
    console.log(file)
    uploadStorage(file, `${userData.username}-${userData.uid}-000.png`)
  }
  return (
    <div className="App">
      {!userData && <NonLoginView onClick={handleLogin} />}
      {!!userData && (
        <React.Fragment>
          <input type="file" onChange={e => setfile(e.target.files[0])} />
          <button onClick={uploadImage}>submit</button>
        </React.Fragment>
      )}
    </div>
  );
}
export default App;

const NonLoginView = ({ onClick }) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>VRC技術市</p>
    <div>
      <button className="App-login" onClick={onClick}>Login</button>
    </div>
  </header>
)