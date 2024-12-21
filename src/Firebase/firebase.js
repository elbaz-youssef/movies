// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// import {initializeApp} from 'firebase/app';
// import {collection, getFirestore} from 'firebase/firestore';

// import firebase from 'firebase/app';
// import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyDPyK9WtC8KXMTHNhw8yJ5Tti-16TO-eXo",
//     authDomain: "movies-c7af5.firebaseapp.com",
//     projectId: "movies-c7af5",
//     storageBucket: "movies-c7af5.appspot.com",
//     messagingSenderId: "792382206679",
//     appId: "1:792382206679:web:a07772fe1e098a0ba33692",
//     measurementId: "G-JGFBNZMT6Z"
// };

// // const firebaseApp = initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);

// // Set the persistence type
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// const auth = firebase.auth();



// // const db = getFirestore(firebaseApp);

// const db = firebase.firestore();

// const favoriteRef = collection(db, "favorites");
// const watchlistRef = collection(db, "watchlists");

// const provider = new firebase.auth.GoogleAuthProvider();

// export {auth,provider,db,favoriteRef,watchlistRef};


// Import specific functions from Firebase modules
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

// Import the whole 'firebase' module for compatibility
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPyK9WtC8KXMTHNhw8yJ5Tti-16TO-eXo",
  authDomain: "movies-c7af5.firebaseapp.com",
  projectId: "movies-c7af5",
  storageBucket: "movies-c7af5.appspot.com",
  messagingSenderId: "792382206679",
  appId: "1:792382206679:web:a07772fe1e098a0ba33692",
  measurementId: "G-JGFBNZMT6Z"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set the persistence type
getAuth(firebaseApp).setPersistence(firebase.auth.Auth.Persistence.LOCAL);



// Get auth and firestore instances
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Accessing collections
const favoriteRef = collection(db, "favorites");
const watchlistRef = collection(db, "watchlists");

// Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider, db, favoriteRef, watchlistRef };
