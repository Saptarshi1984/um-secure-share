'use client'

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Navbar from "./components/Navbar";
import HeroSec from "./components/HeroSec";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import Account from "./components/Account";


export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, user => {

      setLoggedIn(!!user);
      setLoading(false);   

    });

    return () => unsubscribe();
  }, [])

  
  return (

    <div className="flex flex-col">
      <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} setActivePage={setActivePage} />
      {!loggedIn && <HeroSec setLoggedIn={setLoggedIn} />}      

    {loggedIn && (
                   <>
                   {activePage === "Dashboard" && <Dashboard />}
                   {activePage === "Upload" && <Upload />}
                   {activePage === "Account" && <Account />}
                   </>
    )}

    </div>  

  );
}
