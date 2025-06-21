import React, { useState } from "react";
import AlertMessage from "./AlertMessage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { Firestore,getDoc, setDoc, doc } from "firebase/firestore";
import { CircleX } from 'lucide-react';
import { signInWithGoogle, signInWithGithub, signInWithTwitter } from "../utils/socilaAuth";

const SignUpForm = ({onClose, onSwitchToSignIn, setLoggedIn}) => {

    const inputStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2";
    const buttonStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2 cursor-pointer hover:bg-amber-600 hover:text-black";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

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

      const handleGithubLogin = async () => {
      
              try {
      
                  const result = await signInWithGithub();
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



  const onSubmit = async (event) => {
    event.preventDefault();

      if(password !== confirmPassword) {
      
       
       setAlertMsg("Password mismatch!");
       return;
     }      

      try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

         await setDoc(doc(db, "users", user.uid), {
          uid:user.uid,
          email: user.email,
          createdAt: new Date()
         });

         setAlertMsg("SignUp Successful.");
         setEmail("");
         setPassword("");
         setConfirmPassword("");
      }

      catch (error) {
        
        setAlertMsg("SignUp error!");
      }
  }
    
    return (
             
             
        <div className="w-md flex flex-col justify-center gap-4
                        bg-gray-800 text-amber-600 text-2xl m-auto 
                        border-2 border-amber-500 p-4 
                        rounded-4xl align-middle items-center shadow-2xl">
            {alertMsg && <AlertMessage alertMsg={alertMsg} />} 
            <h1 className="m-auto">Sign Up</h1>            
            <form onSubmit={onSubmit} className="flex flex-col gap-4">           
            <input className={inputStyle} type="text" placeholder="Email Id" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={inputStyle} type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input className={inputStyle} type="password" placeholder="Confirm password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" className="border-2 border-amber-500 p-2 w-50 cursor-pointer rounded-4xl m-auto hover:bg-amber-600 hover:text-black">SignUp</button>
            </form>
            <hr />
            <button onClick={handleGoogleLogin} className= {buttonStyle}  type="button"><span>Sign Up with Google</span></button>
            <button onClick={handleGithubLogin} className= {buttonStyle}  type="button"><span>Sign Up with GitHub</span></button>
            <button onClick={handleTwitterLogin} className= {buttonStyle}  type="button"><span>Sign Up with X</span></button>
           <p>
  Already Registered?{" "}
  <a className="hover:underline cursor-pointer" onClick={onSwitchToSignIn}>
    SignIn
  </a>
</p>
  
            <CircleX className='absolute top-4 right-4 hover:cursor-pointer hover:text-amber-400' onClick={onClose}/>
        </div>
    )
}

export default SignUpForm;