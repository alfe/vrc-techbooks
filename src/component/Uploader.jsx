import React from 'react'
import { providerTwitter, getUserData } from '../config';
import LoginGate from './LoginGate'
import UploadForm from './UploadForm'

const Uploader = React.memo(() => {
  const [user, setUser] = React.useState(false);
  React.useEffect(() => {
    if (sessionStorage.getItem('username')) {
      getUserData().then(user => setUser(user))
    }
  }, []);
  
  return (!user) ? (
    <LoginGate onClick={() => providerTwitter(() => {window.location.reload()})} />
  ) : (
    <UploadForm userData={user} />
  )
});

export default Uploader;
