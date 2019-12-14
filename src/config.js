import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore'

firebase.initializeApp({
  projectId: process.env.REACT_APP_PROJECT_ID,  
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://vrc-techbooks.firebaseio.com",
  storageBucket: "vrc-techbooks.appspot.com",
});

export const provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().languageCode = 'ja';

export const providerTwitter = (successCallback, errorCallback) => {
    firebase.auth().signInWithPopup(provider).then(result => {
    const { displayName, photoURL, uid, } = result.user;
    const { username } = result.additionalUserInfo
    
    const db = firebase.firestore();
    const usersCollectionRef = db.collection('users').doc(username.toLowerCase());
    const setUserCollection = async () => {
      await usersCollectionRef.set({ displayName, photoURL, uid }, { merge: true });
      if (successCallback) successCallback();
    };
    usersCollectionRef.get().then((doc) => {
      if (doc.exists) {
        sessionStorage.setItem('username', username.toLowerCase());
        sessionStorage.setItem('displayName', displayName);
        sessionStorage.setItem('photoURL', photoURL);
        sessionStorage.setItem('uid', uid);
        setUserCollection(successCallback);
      } else {
        alert("出展者のみログインできます");
        if (errorCallback) errorCallback();
      }
    }).catch(function(error) {
        console.log("Error getting UserData:", error);
    });
  }).catch(error => {
    console.warn(error);
  });
}
export default firebase;

export const getUserData = async () => {
  const db = firebase.firestore();
  const username = sessionStorage.getItem('username')
  if (!username) return;
  const usersCollectionRef = db.collection('users').doc(username.toLowerCase());
  return await usersCollectionRef.get().then((doc) => {
    if (!doc.exists) return {};
    return doc.data();
  });
};
export const getUserList = async (successCallback) => {
  const db = firebase.firestore();
  const usersCollectionRef = db.collection('users');
  return await usersCollectionRef.get().then((docs) => {
    const userlist = docs.docs.map(doc => doc.data());
    if (successCallback) successCallback(userlist);
    return userlist;
  });
};

export const createUserData = async (displayName, twitter) => {
  const db = firebase.firestore();
  const twitterId = twitter.toLowerCase()
  const usersCollectionRef = db.collection('users').doc(twitterId).set({
    twitterId,
    displayName,
    isExhibitor: true,
  })
  .then(function() {
      console.log("Document successfully written!");
      return (usersCollectionRef)
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
};

export const uploadStorage = async (fileContent, filename) => {
  const storageRef = firebase.storage().ref();
  const uploadRef = storageRef.child(filename).put(fileContent)
  return uploadRef.then((snapshot) => {
    console.log('uploaded: ', snapshot)
    alert('アップロードされました')
    return snapshot
  });
};
export const updateStore = async (values) => {
  const db = firebase.firestore();
  const usersCollectionRef = db.collection('users').doc(sessionStorage.getItem('username'));
  usersCollectionRef.set(values, { merge: true });
};
