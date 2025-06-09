'use client'

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSec from "./components/HeroSec";
import Dashboard from "./components/Dashboard";


export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false);
  return (

    <div className="flex flex-col">
      <Navbar />

      {!loggedIn && <HeroSec setLoggedIn={setLoggedIn} />}
      {loggedIn && <Dashboard />}
    </div>    

  );
}
