import {CircleX} from 'lucide-react';
import React, { useState }  from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { Firestore, getDoc, doc } from 'firebase/firestore';
import AlertMessage from './AlertMessage';


const SignInForm = ({onClose, onSwitchToSignUp, setLoggedIn}) => {

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
    const userDcoSnap = await getDoc(userDocRef);

    if(userDcoSnap.exists()) {

        const userData = userDcoSnap.data();

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
            <button className= {buttonStyle}  type="button"><span>Sign In with Google</span></button>
            <button className= {buttonStyle}  type="button"><span>Sign In with Facebook</span></button>
            <button className= {buttonStyle}  type="button"><span>Sign In with X</span></button>
            <p>Not a Member? <a className="hover:underline hover:cursor-pointer"  onClick={onSwitchToSignUp}>SignUp</a></p>
            
            <CircleX className='absolute top-4 right-4 hover:cursor-pointer hover:text-amber-400' onClick={onClose}/>
        </div>
    )
}

export default SignInForm;