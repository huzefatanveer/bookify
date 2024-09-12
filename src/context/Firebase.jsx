import { createContext, useContext, useEffect, useState } from 'react'
import {initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword,
     signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,onAuthStateChanged} from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'


const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyA0Tp_pxqDm3OMc3KE404YIU9ROLM2R92A",
    authDomain: "bookify-84c01.firebaseapp.com",
    projectId: "bookify-84c01",
    storageBucket: "bookify-84c01.appspot.com",
    messagingSenderId: "930562870515",
    appId: "1:930562870515:web:b1ccd84dd3d7ad5ae2bb86",
    measurementId: "G-V141F76596"
  };
 
export const useFirebase = () => useContext(FirebaseContext)


const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user)=>{
            if (user) setUser(user);
            else setUser(null)
        })

    },[])
    const signupUserWithEmailAndPassword =  (email, password) => {
      return  createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinUserWithEmailAndPassword = (email,password) => 
         signInWithEmailAndPassword(firebaseAuth, email, password)

    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)

    console.log(user)

    const handleCreateNewListing = async(name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult =  await uploadBytes(imageRef, cover)
        return await addDoc(collection(firestore, 'books'), {
          name,
          isbn,
          price,
          imageURL: uploadResult.ref.fullPath,
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
    
        })
    }
    
    const isLoggedIn = user? true : false;
    return <FirebaseContext.Provider 
    value = {{
    signupUserWithEmailAndPassword, 
    signinUserWithEmailAndPassword, 
    signinWithGoogle,
    isLoggedIn,
    handleCreateNewListing
    }}>
        {props.children}
    </FirebaseContext.Provider>
}