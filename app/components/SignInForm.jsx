import {CircleX} from 'lucide-react';
import React, { useState }  from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { Firestore, getDoc, setDoc, doc } from 'firebase/firestore';
import AlertMessage from './AlertMessage';
import { signInWithGoogle, 
         signInWithFacebook, 
         signInWithTwitter, 
        } from '../utils/socilaAuth';



const SignInForm = ({onClose, onSwitchToSignUp, setLoggedIn}) => {


    /* Login with goolge function */
    const handleGoogleLogin = async () => {

        try {

            const result = await signInWithGoogle();
            const user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if(!userDocSnap.exists()) {

            await setDoc(userDocRef, {
                  name: user.displayName,
                  uid: user.uid,
                  email: user.email,
                  createdAt: new Date()
                });
            }
            setLoggedIn(true);
            onClose();
        }

        catch (error) {

            setAlertMsg(`Google Sign In Failed!-${error.message}`);
        }

    }

    /* Login With Facebook function */
    const handleFacebookLogin = async () => {

        try {

            const result = await signInWithFacebook();
            const user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if(!userDocSnap.exists()){

                setDoc(userDocRef, {
                    name: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    createdAt: new Date()
                });

                setLoggedIn(true)
                onClose();
            }
        }

        catch (error) {

            setAlertMsg(`SignIn with facebook failed!-${error.message}`);

        }

    }

    const handleTwitterLogin = async () => {

        try {

            const result = await signInWithTwitter();
            const user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if(!userDocSnap.exists()) {

            await setDoc(userDocRef, {
                  name: user.displayName,
                  uid: user.uid,
                  email: user.email,
                  createdAt: new Date()
                });
            }
            setLoggedIn(true);
            onClose();
        }

        catch (error) {

            setAlertMsg(`Twitter Sign In Failed!-${error.message}`);
        }
       

    }

    const inputStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2";
    const buttonStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2 cursor-pointer hover:bg-amber-600 hover:text-black";
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const signIn = async (e) => {
        e.preventDefault();    

    try {    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if(userDocSnap.exists()) {

        const userData = userDocSnap.data();

        setLoggedIn(true);
        setAlertMsg("SignIn Successful!");
        setEmail("");
        setPassword("");
        onClose();
    } else {
        
        setAlertMsg("User Not Found!");
    }
    
    } 
    catch (error) {
        setAlertMsg("SignIn Failed!");
    }

    }
     
    return (
        <div className= "w-md flex flex-col justify-center gap-4 bg-gray-800 text-amber-600 text-2xl m-auto border-2 border-amber-500 p-4 rounded-4xl align-middle items-center shadow-2xl">
            <h1 className="m-auto">Sign In</h1>
            {alertMsg && <AlertMessage alertMsg={alertMsg} />}
            <form className='flex flex-col gap-4' onSubmit={signIn}>
            <input className={inputStyle} type="text" placeholder="Email Id" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={inputStyle} type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="border-2 border-amber-500 p-2 w-50 cursor-pointer rounded-4xl m-auto hover:bg-amber-600 hover:text-black" type="submit">SignIn</button>
            </form>
            <p>Forgot Password? <a className="hover:underline" href="">Click here</a></p>
            <hr />
            <button onClick={handleGoogleLogin} className= {buttonStyle}  type="button"><span>Sign In with Google</span></button>
            <button onClick={handleFacebookLogin} className= {buttonStyle}  type="button"><span>Sign In with Facebook</span></button>
            <button onClick={handleTwitterLogin} className= {buttonStyle}  type="button"><span>Sign In with X</span></button>
            <p>Not a Member? <a className="hover:underline hover:cursor-pointer"  onClick={onSwitchToSignUp}>SignUp</a></p>
            
            <CircleX className='absolute top-4 right-4 hover:cursor-pointer hover:text-amber-400' onClick={onClose}/>
        </div>
    )
}

export default SignInForm;