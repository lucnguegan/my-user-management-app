// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Assure-toi d'importer ces fonctions
import { getFirestore, setDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtI_0y3XH89HUaQm6hDlW76_2r1EFpzOI",
  authDomain: "usermanagementapp-fcd50.firebaseapp.com",
  projectId: "usermanagementapp-fcd50",
  storageBucket: "usermanagementapp-fcd50.appspot.com",
  messagingSenderId: "782273251203",
  appId: "1:782273251203:web:f6f70126a91f57fa5618b6",
  measurementId: "G-LQ6GBCVKV1"
};

const createUserWithRole = async (email, password, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
  
    // Ajouter l'utilisateur dans Firestore avec son rôle
    await setDoc(doc(db, "users", uid), {
      email: email,
      role: role,
    });
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithRole};