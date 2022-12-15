
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyB9xDqfhBswEbT2k4p9LPyhB0yhxV2_9bM",
  authDomain: "ampray-1ab62.firebaseapp.com",
  projectId: "ampray-1ab62",
  storageBucket: "ampray-1ab62.appspot.com",
  messagingSenderId: "808569727858",
  appId: "1:808569727858:web:4111f21a45df2d2b818beb",
  measurementId: "G-PCHYPB2ZPY"
  };


if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export{firebase};