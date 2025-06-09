"use client";

import React, { useState } from "react";
import HeroImage from "./HeroImage";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm"; 
import { motion } from "framer-motion";

export default function HeroSec({setLoggedIn}) {

  const [activeForm, setActiveForm] = useState(null); // null | "signIn" | "signUp"
  const handleShowSignIn = () => setActiveForm("signIn");
  const handleShowSignUp = () => setActiveForm("signUp");
  const handleCloseForm = () => setActiveForm(null);

  return (
    <div className="relative flex flex-col items-center gap-10 mt-20">
      {/* Background Section */}
      <div className={`${activeForm ? "blur-sm" : "blur-0"} transition-all duration-600 flex flex-col items-center justify-around gap-16`}>
        <img className="w-50 rounded-4xl" src="/img/ss.png" alt="ss" />
        <motion.h1
         initial={{opacity: 0, y: 40, scale: 0.95}}
         animate={{opacity: 1, y: 0, scale: 1}}
         transition={{duration: 0.8, ease: "easeInOut"}}
         className="text-5xl text-amber-600 font-sans font-extrabold">Share Files Securely, Instantly.
         </motion.h1>
        <motion.p
        initial={{opacity: 0, x: 40, scale: 0.95}}
        animate={{opacity: 1, x: 0, scale: 1}}
        transition={{duration: 0.8, ease: "easeInOut"}} 
        className="text-2xl text-amber-400 font-mono font-semibold">Protect your data with end-to-end encryption. Send and receive files without compromising privacy.
        </motion.p>
        <button
          className="bg-amber-400 p-4 rounded-4xl font-mono font-semibold text-lg hover:bg-amber-600 hover:text-amber-50 hover:cursor-pointer"
          onClick={handleShowSignIn}
          type="button"
        >
          Start Sharing Securely
        </button>

        <HeroImage />
      </div>

      {/* Form Section */}
      
      {activeForm === "signIn" && (
        <motion.div
        initial={{opacity: 0, scale: 0.95, filter: "blur(4px)"}}
        animate={{opacity: 1, scale: 1, filter: "blur(0px)" }} 
        transition={{duration:0.4}}
        className= "absolute top-[150px] z-10">
        <SignInForm onClose={handleCloseForm}  onSwitchToSignUp={handleShowSignUp} setLoggedIn={setLoggedIn}  />
        </motion.div>
      )}

      {activeForm === "signUp" && (
        <motion.div
        initial={{opacity: 0, scale: 0.95, filter: "blur(4px)"}}
        animate={{opacity: 1, scale: 1, filter: "blur(0px)" }} 
        transition={{duration:0.4}}
         className="absolute top-[150px] z-10">
          <SignUpForm onClose={handleCloseForm} onSwitchToSignIn={handleShowSignIn} />
        </motion.div>
      )}
    </div>
  );
}
