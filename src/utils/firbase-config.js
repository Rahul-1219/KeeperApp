import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAo_egGDrgPtI80if7ut9RYjcKMrLN7Iek",
  authDomain: "keeper-note-app-308f9.firebaseapp.com",
  projectId: "keeper-note-app-308f9",
  storageBucket: "keeper-note-app-308f9.appspot.com",
  messagingSenderId: "411017179507",
  appId: "1:411017179507:web:c3895fdaaa90a960dd5506",
  measurementId: "G-6BJZGZFKT7",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();
export { firebaseAuth, provider };
