import { createContext, useContext, useEffect, useState } from 'react'
import {initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword,
     signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,onAuthStateChanged} from 'firebase/auth'

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
    
    const isLoggedIn = user? true : false;
    return <FirebaseContext.Provider 
    value = {{
    signupUserWithEmailAndPassword, 
    signinUserWithEmailAndPassword, 
    signinWithGoogle,
    isLoggedIn
    }}>
        {props.children}
    </FirebaseContext.Provider>
}