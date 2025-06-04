import {Lock} from 'lucide-react';

const Navbar = () => {

    const logoName = "SeS";
    const userName = '';
   
return (
    <>
    <div className="flex flex-row bg-gray-800 p-3 items-center text-amber-500">
        <Lock />
        <a className="text-3xl text-amber-500 font-mono font-bold" href="">{logoName}</a>
    </div>
    </>
);
}

export default Navbar;