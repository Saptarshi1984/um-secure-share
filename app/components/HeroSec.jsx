"use client";

import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm"; // assuming you'll have this

export default function HeroSec() {

  const [activeForm, setActiveForm] = useState(null); // null | "signIn" | "signUp"
  const handleShowSignIn = () => setActiveForm("signIn");
  const handleShowSignUp = () => setActiveForm("signUp");
  const handleCloseForm = () => setActiveForm(null);

  return (
    <div className="relative flex flex-col items-center gap-10 mt-20">
      {/* Background Section */}
      <div className={`${activeForm ? "blur-sm" : "blur-0"} transition-all duration-600 flex flex-col items-center gap-10`}>
        <img className="w-50 rounded-4xl" src="/img/ss.png" alt="ss" />
        <h1 className="text-5xl text-amber-600 font-sans font-extrabold">Share Files Securely, Instantly.</h1>
        <p className="text-2xl text-amber-400 font-mono font-semibold">Protect your data with end-to-end encryption. Send and receive files without compromising privacy.</p>
        <button
          className="bg-amber-400 p-4 rounded-4xl font-mono font-semibold text-lg hover:bg-amber-600 hover:text-amber-50 hover:cursor-pointer"
          onClick={handleShowSignIn}
          type="button"
        >
          Start Sharing Securely
        </button>
      </div>

      {/* Form Section */}
      {activeForm === "signIn" && (
        <div className= "absolute top-[150px] z-10 transition-all duration-600">
          <SignInForm onClose={handleCloseForm}  onSwitchToSignUp={handleShowSignUp} />
        </div>
      )}

      {activeForm === "signUp" && (
        <div className="absolute top-[150px] z-10">
          <SignUpForm onClose={handleCloseForm} onSwitchToSignIn={handleShowSignIn} />
        </div>
      )}
    </div>
  );
}
