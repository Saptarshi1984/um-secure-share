import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const Navlink = ({activePage, setActivePage}) => {

    const linkStyle = (page) =>
  `p-2 hover:text-amber-500 ${activePage === page ? "text-amber-500" : ""}`;

    return(

       <div className='flex flex-row gap-4 text-gray-300 font-bold text-lg font-serif'>
            <a onClick={(e) => {e.preventDefault();setActivePage("Dashboard")}} className={linkStyle("Dashboard")}  href="">Home</a>
            <a onClick={(e) => {e.preventDefault();setActivePage("Upload")}} className={linkStyle("Upload")}  href="">Uploads</a>
            <a onClick={(e) => {e.preventDefault();setActivePage("Account")}} className={linkStyle("Account")}  href="">Account</a>
            <a onClick={() => signOut(auth)} className='bg-black p-2 rounded-md hover:text-amber-500'  href="#">Logout</a>
       </div>

    )
}

export default Navlink;