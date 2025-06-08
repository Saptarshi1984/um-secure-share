import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { Firestore, setDoc, doc } from "firebase/firestore";
import { CircleX } from 'lucide-react';



const SignUpForm = ({onClose, onSwitchToSignIn}) => {

    const inputStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2";
    const buttonStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2 cursor-pointer hover:bg-amber-600 hover:text-black";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

      if(password !== confirmPassword) {
      
       alert("Password did not match!");
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
         alert("User Created Successfully");
      }

      catch (error) {
        alert("User SignUp error:", error.message);
      }
  }
    
    return (

        <div className="w-md flex flex-col justify-center gap-4
                        bg-gray-800 text-amber-600 text-2xl m-auto 
                        border-2 border-amber-500 p-4 
                        rounded-4xl align-middle items-center shadow-2xl">
            <h1 className="m-auto">Sign Up</h1> 
            <form onSubmit={onSubmit} className="flex flex-col gap-4">           
            <input className={inputStyle} type="text" placeholder="Email Id" required onChange={(e) => setEmail(e.target.value)} />
            <input className={inputStyle} type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
            <input className={inputStyle} type="password" placeholder="Confirm password" required onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" className="border-2 border-amber-500 p-2 w-50 cursor-pointer rounded-4xl m-auto hover:bg-amber-600 hover:text-black">SignUp</button>
            </form>
            <hr />
            <button className= {buttonStyle}  type="button"><span>Sign Up with Google</span></button>
            <button className= {buttonStyle}  type="button"><span>Sign Up with Facebook</span></button>
            <button className= {buttonStyle}  type="button"><span>Sign Up with X</span></button>
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