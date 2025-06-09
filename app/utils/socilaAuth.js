import { auth } from "@/firebase/firebase";
import { 
         GoogleAuthProvider, 
         FacebookAuthProvider, 
         TwitterAuthProvider,
         signInWithPopup 
        } from "firebase/auth";

   export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    return await signInWithPopup(auth, provider);
};

export const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    return await signInWithPopup(auth, provider);
};

export const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();

    return await signInWithPopup(auth, provider);
};