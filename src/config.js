import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

firebase.initializeApp({
  projectId: process.env.REACT_APP_PROJECT_ID,  
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://vrc-techbooks.firebaseio.com",
  storageBucket: "vrc-techbooks.appspot.com",
});

export const provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().languageCode = 'ja';
export const providerTwitter = (successCallback) => {
    firebase.auth().signInWithPopup(provider).then(result => {
    const { displayName, photoURL, uid, } = result.user;
    const { username } = result.additionalUserInfo
    successCallback && successCallback({ username, displayName, photoURL, uid, })
    return ({ username, displayName, photoURL, uid, })
  }).catch(error => {
    console.warn(error);
  });
}
export default firebase;

export const uploadStorage = async (fileContent, filename) => {
  const storageRef = firebase.storage().ref();
  const uploadRef = storageRef.child(filename).put(fileContent)
  return uploadRef.then((snapshot) => {
    console.log('uploaded: ', snapshot)
    return snapshot
  });
};
