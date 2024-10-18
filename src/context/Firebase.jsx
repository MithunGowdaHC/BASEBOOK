import React, { useContext } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyAE2DZoAoPPmR9iE-x1CkbaKaMp8rZkIlc",
    authDomain: "bookbase-3920a.firebaseapp.com",
    projectId: "bookbase-3920a",
    storageBucket: "bookbase-3920a.appspot.com",
    messagingSenderId: "296749758415",
    appId: "1:296749758415:web:cee4d31771b3c19b1c84ba"
  };
 export const firebaseApp = initializeApp(firebaseConfig);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider value={{firebaseApp}}>{props.children}</FirebaseContext.Provider>;
};
