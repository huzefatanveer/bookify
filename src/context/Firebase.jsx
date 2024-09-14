import { createContext, useContext, useEffect, useState } from 'react'
import {initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword,
     signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,onAuthStateChanged} from 'firebase/auth'
import { getFirestore, collection, addDoc,getDocs,getDoc, doc, query, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDAhDz-TV0L2c--nOGxxtTZf-DvK2ZwaME",
  authDomain: "book-f3c2b.firebaseapp.com",
  projectId: "book-f3c2b",
  storageBucket: "book-f3c2b.appspot.com",
  messagingSenderId: "370267649790",
  appId: "1:370267649790:web:847e350913902aacae17af",
  measurementId: "G-079QZZ3RYD"
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

    // console.log(user)

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
    
    const listAllBooks = () => {
      return getDocs(collection(firestore,"books"));

    }

    const getImageURL = (path) => {
      return getDownloadURL(ref(storage,path))

    }

    const getBookById= async (id) => {
      const docRef = doc(firestore, "books", id);
      const result = await  getDoc(docRef);
      return result;
    }

    const placeOrder =async (bookId,qty) => {
      const collectionRef = collection(firestore, 'books', bookId, 'orders')
      const result = await addDoc(collectionRef, {
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        qty: Number(qty)

      })
      return result;
    }

    const fetchMyBooks = async (userId) => {
   
      console.log(user.uid)
      
      const collectionRef = collection (firestore, 'books');
      const q = query(collectionRef, where('userID','==', userId))

      const result = await getDocs(q);
      console.log(result)
      return result;
    }
    const getOrders = async (bookId) => {
      const collectionRef = collection(firestore, 'books', bookId, 'orders')
      const result = await getDocs(collectionRef)
      return result
    }



    const isLoggedIn = user? true : false;
    return <FirebaseContext.Provider 
    value = {{
    signupUserWithEmailAndPassword, 
    signinUserWithEmailAndPassword, 
    signinWithGoogle,
    isLoggedIn,
    handleCreateNewListing,
    listAllBooks,
    getImageURL,
    getBookById,
    fetchMyBooks,
    placeOrder,
    getOrders,
    user
    }}>
        {props.children}
    </FirebaseContext.Provider>
}