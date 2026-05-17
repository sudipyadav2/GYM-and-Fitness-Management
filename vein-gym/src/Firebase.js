import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';    
import{getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAxtQmtihJFpNbpZ9t2P-FbmJ0cw9NEbjs",
    authDomain: "vein-gym-and-fitness.firebaseapp.com",
    projectId: "vein-gym-and-fitness",
    storageBucket: "vein-gym-and-fitness.firebasestorage.app",
    messagingSenderId: "870886621069",
    appId: "1:870886621069:web:90f2a1398f3b94bc3c07c4",
};

const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app);
export const db = getFirestore(app);
 export const storage = getStorage(app);   