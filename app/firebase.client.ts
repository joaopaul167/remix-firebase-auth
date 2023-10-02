import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

const app = initializeApp({
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
});

const auth = getAuth(app);

// Let Remix handle the persistence via session cookies.
setPersistence(auth, inMemoryPersistence);

export { auth };