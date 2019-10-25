import React from 'react';
import { providerTwitter } from './config';
import './App.css';
import NonLoginView from './component/NonLoginView'
import Uploader from './component/Uploader'

function App() {
  const [userData, setUser] = React.useState(false);
  const handleLogin = () => providerTwitter(setUser)
  return (
    <div className="App">
      {!userData && <NonLoginView onClick={handleLogin} />}
      {!!userData && <Uploader userData={userData} />}
    </div>
  );
}
export default App;
