import {CircleX} from 'lucide-react';
import React, { useState }  from "react";


const SignInForm = ({onClose, onSwitchToSignUp}) => {

    const inputStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2";
    const buttonStyle = "w-sm border-amber-500 border-2 rounded-4xl p-2 cursor-pointer hover:bg-amber-600 hover:text-black";


    return (
        <div className="w-md flex flex-col justify-center gap-4
                        bg-gray-800 text-amber-600 text-2xl m-auto 
                        border-2 border-amber-500 p-4
                        rounded-4xl align-middle items-center shadow-2xl">
            <h1 className="m-auto">Sign In</h1>
            <input className={inputStyle} type="text" placeholder="Email Id" required />
            <input className={inputStyle} type="password" placeholder="Password" required />
            <button className="border-2 border-amber-500 p-2 w-50 cursor-pointer rounded-4xl m-auto hover:bg-amber-600 hover:text-black" type="button">SignIn</button>
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