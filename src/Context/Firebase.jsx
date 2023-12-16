import { createContext, useContext, useState, useEffect } from "react";
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAWapgfb1fxl1C_fjZScHxse0TVJ2B1LF8",
    authDomain: "winterofcode-irctc.firebaseapp.com",
    projectId: "winterofcode-irctc",
    storageBucket: "winterofcode-irctc.appspot.com",
    messagingSenderId: "835241202381",
    appId: "1:835241202381:web:a486b5cd877d093e36cf84",
    measurementId: "G-6MFD64JDJ6"
};
export const useFirebase = () => { return useContext(FirebaseContext); }

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });

        return () => unsubscribe();
    }, [firebaseAuth]);

    const signupWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const signinUserWithPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password);
    }


    const signinWithGoogle = async () => {
        try {
            const result = await signInWithPopup(firebaseAuth, googleProvider);
            // Access user details using result.user if needed
            return result;
        } catch (error) {
            // Handle errors (e.g., display an error message)
            console.error('Error signing in with Google:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        console.log('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <FirebaseContext.Provider
            value={{
                signupWithEmailAndPassword,
                signinUserWithPassword,
                signinWithGoogle,
                setIsLoggedIn,
                isLoggedIn,
            }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}