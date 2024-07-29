// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
     } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5ZtO-uE_rnABzXfTXlxuiGx1_maYyYLU",
  authDomain: "crwn-clothing-react-36008.firebaseapp.com",
  projectId: "crwn-clothing-react-36008",
  storageBucket: "crwn-clothing-react-36008.appspot.com",
  messagingSenderId: "658992092157",
  appId: "1:658992092157:web:e03dd93c43c347d4913f94"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const db = getFirestore();
export const createUserDocumentFromAuth =  async (userAuth,additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
               await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
               }) 
        }
        catch(error){
            console.log('error creating the user ', error.message);
        }
    }
}
export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;
    try{
        return await createUserWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log("error = ",error);
        if(error.code === 'auth/email-already-in-use'){
          alert('Cannot create user, email already in use');
        }else{
          console.log("User creation encounterd an error:",error)
        }      
  
    }
    
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    try{
        return await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/too-many-requests':
                alert('too many requests');
                break;
            case 'auth/invalid-credential':
                alert('invalid creadentials');
                break;  
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;            
            default:
              console.log(error);
              console.log(error.code);
          }
    }    
  };