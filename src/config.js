import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore'

firebase.initializeApp({
  projectId: process.env.REACT_APP_PROJECT_ID,  
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
});

export const provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().languageCode = 'ja';

export const providerTwitter = (successCallback, errorCallback) => {
    firebase.auth().signInWithPopup(provider).then(result => {
    const { photoURL, uid, } = result.user;
    const { username } = result.additionalUserInfo
    
    const db = firebase.firestore();
    const usersCollectionRef = db.collection(process.env.REACT_APP_DB_COLLECTION).doc(username.toLowerCase());
    const setUserCollection = async (username, success) => {
      await updateStore({ photoURL, uid }, username)
      if (success) success();
    };
    usersCollectionRef.get().then((doc) => {
      if (doc.exists) {
        sessionStorage.setItem('username', username.toLowerCase());
        sessionStorage.setItem('photoURL', photoURL);
        sessionStorage.setItem('uid', uid);
        setUserCollection(username.toLowerCase(), successCallback);
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

const setSessionStorageFromUserData = (user) => {
  if (user) {
    sessionStorage.setItem('displayName', user.displayName);
    sessionStorage.setItem('PosterSubmittedAt', user.PosterSubmittedAt);
    sessionStorage.setItem('MenuSubmittedAt', user.MenuSubmittedAt);
    sessionStorage.setItem('PDFSubmittedAt', user.PDFSubmittedAt);
    sessionStorage.setItem('boothNo', user.boothNo);
    sessionStorage.setItem('place', user.place);
    sessionStorage.setItem('totalPages', user.totalPages);
  }
}

export const getUserData = async () => {
  const db = firebase.firestore();
  const username = sessionStorage.getItem('username')
  if (!username) return;
  const usersCollectionRef = db.collection(process.env.REACT_APP_DB_COLLECTION).doc(username.toLowerCase());
  return await usersCollectionRef.get().then((doc) => {
    if (!doc.exists) return {};
    const userData = doc.data();
    setSessionStorageFromUserData(userData);
    return userData;
  });
};
export const getUserList = async (successCallback) => {
  const db = firebase.firestore();
  const usersCollectionRef = db.collection(process.env.REACT_APP_DB_COLLECTION);
  return await usersCollectionRef.get().then((docs) => {
    const userlist = docs.docs
      .map(doc => doc.data())
      .sort((a, b) => a.place - b.place);
    if (successCallback) successCallback(userlist);
    return userlist;
  });
};

export const createUserData = async (displayName, twitter, place, boothNo) => {
  const db = firebase.firestore();
  const twitterId = twitter.toLowerCase()
  const usersCollectionRef = db.collection(process.env.REACT_APP_DB_COLLECTION).doc(twitterId).set({
    twitterId,
    displayName,
    place,
    boothNo,
    uid: '',
  })
  .then(function() {
      console.log("Document successfully written!");
      return (usersCollectionRef)
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
};

const getDirectory = (fileType) => {
  switch (fileType) {
    case 'cover':
    case 'poster':
    case 'pdf':
    case 'menu':
      return `v2/${fileType}/`;
    default:
      return `v2/book/${sessionStorage.getItem('username')}/`;
  }
}

export const uploadStorage = async (fileContent, filename, fileType, successCallback) => {
  const storageRef = firebase.storage().ref();
  const uploadRef = storageRef.child(`${getDirectory(fileType)}/${filename}`).put(fileContent)
  return uploadRef.then((snapshot) => {
    console.log('uploaded: ', snapshot)
    if (successCallback) successCallback()
    return snapshot
  });
};
export const updateStore = async (values, username) => {
  console.log("updateStore", values);
  const db = firebase.firestore();
  const usersCollectionRef = db
    .collection(process.env.REACT_APP_DB_COLLECTION)
    .doc(username || sessionStorage.getItem('username'));
  usersCollectionRef.set(values, { merge: true });
};
