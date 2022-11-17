import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3cnl116OX9K7ICKZz4znkepJ2DinuoIw",
  authDomain: "rtq-blog.firebaseapp.com",
  projectId: "rtq-blog",
  storageBucket: "rtq-blog.appspot.com",
  messagingSenderId: "311495107383",
  appId: "1:311495107383:web:23e591ae5a8d3b28ddf0b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)