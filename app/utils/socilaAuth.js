import { auth } from "@/firebase/firebase";
import { 
         GoogleAuthProvider,  
         TwitterAuthProvider,
         GithubAuthProvider,
         signInWithPopup 
        } from "firebase/auth";

   export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    return await signInWithPopup(auth, provider);
};

export const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();

    return await signInWithPopup(auth, provider);
};

export const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();

    return await signInWithPopup(auth, provider);
};