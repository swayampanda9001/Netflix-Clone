// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu1BhOD5eMqKr7jmRrBZusIqZdA50Bv7Q",
  authDomain: "netflix-clone-60de7.firebaseapp.com",
  projectId: "netflix-clone-60de7",
  storageBucket: "netflix-clone-60de7.firebasestorage.app",
  messagingSenderId: "394439927357",
  appId: "1:394439927357:web:b00e8f9720021dc733ac54",
  measurementId: "G-QDRDPS18CN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      name: name,
      authProvider: "local",
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
    // Check if user exists in database, if not add them
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      authProvider: "google",
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const logout = async () => {
  signOut(auth);
};

export { auth, db, signup, login, signInWithGoogle, logout };
