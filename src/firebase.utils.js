// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyB8ozvn6t0wfzySsK3x72nk4-I8nhyfDWE",
    authDomain: "crwn-db-92302.firebaseapp.com",
    projectId: "crwn-db-92302",
    storageBucket: "crwn-db-92302.appspot.com",
    messagingSenderId: "1044136116855",
    appId: "1:1044136116855:web:651c651819b1a9150b7c72",
    measurementId: "G-PTC39J8B90"
  };
  

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};


export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({'prompt': 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase