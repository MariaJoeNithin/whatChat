import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../config/FireBase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  const signUp = async (email, password, displayName, profilePic) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, `images/${displayName}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      await updateProfile(userCredential?.user, {
        displayName: displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", userCredential?.user.uid), {
        uid: userCredential?.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", userCredential?.user.uid), {});

      console.log("User signed up successfully!");
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  async function logIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const googlelogIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("User signed up successfully!");
      return userCredential.user;
    } catch (error) {
      alert("error", error);
    }
  };

  async function ggllogIn() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      await setDoc(doc(db, "users", userCredential?.user.uid), {
        uid: userCredential?.user?.uid,
        displayName: userCredential?.user?.displayName,
        email: userCredential?.user?.email,
        photoURL: userCredential?.user?.photoURL,
      });

      await setDoc(doc(db, "userChats", userCredential?.user.uid), {});

      console.log("User signed up successfully!");
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      // console.log(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, logOut, currentUser, ggllogIn, googlelogIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
