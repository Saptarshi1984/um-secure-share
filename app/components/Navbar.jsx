import {Lock} from 'lucide-react';
import Navlink from './Navlink';
import Dashboard from './Dashboard';
import Upload from './Upload';
import React, { useState } from 'react';

const Navbar = ({loggedIn, setLoggedIn, setActivePage}) => {

    const logoName = "SeS";
      
   
return (
    <div className='flex flex-row justify-around items-center bg-gray-800'>
    <div className="flex flex-row p-3 items-center text-amber-500">
        <Lock />
        <a className="text-3xl text-amber-500 font-mono font-bold" href="">{logoName}</a>
    </div>
    {loggedIn && <Navlink setLoggedIn={setLoggedIn} setActivePage={setActivePage} />}
    </div>
)
}

export default Navbar;