import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { query, where } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
export const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAE2DZoAoPPmR9iE-x1CkbaKaMp8rZkIlc",
  authDomain: "bookbase-3920a.firebaseapp.com",
  projectId: "bookbase-3920a",
  storageBucket: "bookbase-3920a.appspot.com",
  messagingSenderId: "296749758415",
  appId: "1:296749758415:web:cee4d31771b3c19b1c84ba",
};
export const useFirebase = () => useContext(FirebaseContext);

export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);
  
  // const signOutUser = () => {
  //   signOut(firebaseAuth)

  // }

  const withGoogle = () => signInWithPopup(firebaseAuth, provider);

  const handleCreateNewList = async (name, price, isbnNumber, picture) => {
    const imageRef = ref(
      storage,
      `uploades/images/${Date.now()}-${picture.name}`
    );
    const uploadResult = await uploadBytes(imageRef, picture);

    return await addDoc(collection(firestore, "books"), {
      name,
      isbnNumber,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };
  const placeOrder = async (bookID, qty) => {
    const collectionRef = collection(firestore, "books", bookID, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;

  };
  const fetchMyBooks = async (userID) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userID));
    const result = await getDocs(q);
    return result
    
  };
  const getOrders =async  (bookID) => {
    const collectionRef = collection(firestore, "books", bookID, "orders")
    const result = await getDocs(collectionRef)
    return result

  }

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signInUser,
        withGoogle,
        isLoggedIn,
        handleCreateNewList,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
        // signOutUser
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
