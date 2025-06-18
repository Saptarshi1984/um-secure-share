'use client'

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db, auth } from "@/firebase/firebase";
import { useState, useEffect } from "react";



const Account = () => {
    
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);

    const [userData, setUserData] = useState(null);
    const [showBtn, setShowBtn] = useState(true);
    const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    aadhar: "",
    address: ""
});
    
    

    const labelStyle = "text-amber-500 text-2xl font-semibold";
    const inputStyle = "text-amber-700 text-lg p-1 font-semibold border-1 border-amber-600";
    const bgWhiteInput = "text-amber-700 text-lg p-1 font-semibold border-1 border-amber-600 bg-gray-300";
    const btnStyle = "text-xl font-bold font-mono text-amber-500 p-2 border-[1px] border-amber-500 rounded-lg hover:text-white";
    
    useEffect(() => {

        /* const auth = getAuth(); */
        const user = auth.currentUser;

        const fetchData = async () => {
            /* const auth = getAuth(); */
            const user = auth.currentUser;
            if (!user) return;

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    if (userData) {
        setFormData(userData);
    }
}, [userData]);   
   
    const handleSave = async (e) => {
        e.preventDefault();

        /* const auth =getAuth() */
        const user = auth.currentUser;

        if(!user) return ;

        try {

            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userDocRef, {
                name: formData.name,
                mobile: formData.mobile,
                aadhar: formData.aadhar,
                address: formData.address,
                verified: false
            });

            setUserData(formData); 
            setShowBtn(true);           

        }

        catch (error) {
            alert("Unable to save data, Error:{error.message}");
        }

    }

    //opt generation for verification

const sendOtp = async () => {
  if (!formData.mobile || formData.mobile.length < 10) {
    alert("Please enter a valid mobile number.");
    return;
  }

  try {
    // ✅ Load lazily on the client only
    const { RecaptchaVerifier, signInWithPhoneNumber, getAuth } = await import("firebase/auth");

    const localAuth = getAuth(); // needed by RecaptchaVerifier internals

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
        localAuth // ✅ use this
      );
    }

    const appVerifier = window.recaptchaVerifier;
    const formattedPhone = "+91" + formData.mobile;

    const confirmation = await signInWithPhoneNumber(localAuth, formattedPhone, appVerifier);

    setConfirmationResult(confirmation);
    setOtpSent(true);
    alert("OTP sent to your mobile.");
  } catch (error) {
    console.error("OTP Error:", error?.code, error?.message);
    alert(`Failed to send OTP: ${error?.message}`);
  }
};



//verify otp function

const verifyOtp = async () => {
  if (!otp || !confirmationResult) return;
  try {
    await confirmationResult.confirm(otp);
    
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, { verified: true });

    alert("Mobile number verified!");
    setOtpSent(false);
    setConfirmationResult(null);
  } catch (err) {
    alert("Invalid OTP. Try again.");
  }
};




    return(
        
        <div className="flex flex-col gap-10 items-center justify-around w-[98%] my-4">          

                <div className="flex flex-col w-[60%] gap-4 justify-center">
                    <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono m-auto">Account Details</h1>
                    <form onSubmit={handleSave} className="w-[50%] flex flex-col gap-6 m-auto" action="">
                                               
                        <label className={labelStyle} htmlFor="name">Name:</label>
                        <input className={showBtn ? inputStyle : bgWhiteInput} 
                               type="text" 
                               name="name" 
                               value={formData.name || ""} 
                               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                               disabled={showBtn}/>                        
                        <label className={labelStyle} htmlFor="mobile">Mobile No:</label>
                    <div className="w-[100%] flex flex-row gap-0">
                        <input className={`${showBtn} ? ${inputStyle} : ${bgWhiteInput}, w-[90%]`} 
                               type="number" 
                               name="mobile" 
                               value={formData.mobile || ""}
                               onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                               disabled={showBtn} />
                               
                               {formData.mobile && !userData?.verified && (
  <div className="flex flex-col w-full gap-2">
    {!otpSent ? (
      <button onClick={sendOtp} className="text-amber-500 font-bold text-lg border p-1 w-[30%] cursor-pointer hover:bg-amber-500">
        Send OTP
      </button>
    ) : (
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-[90%] text-amber-700 p-1 border"
        />
        <button onClick={verifyOtp} className="text-white bg-amber-600 p-1 rounded-md hover:bg-amber-700">
          Verify OTP
        </button>
      </div>
    )}
  </div>
)}

                    </div>                                            
                        <label className={labelStyle} htmlFor="aadhar">Aadhar No:</label>
                        <input className={showBtn ? inputStyle : bgWhiteInput} 
                               type="text" 
                               name="aadhar" 
                               value={formData.aadhar || ""}
                               onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })} 
                               disabled={showBtn} />
                        <label className={labelStyle} htmlFor="address">Address:</label>
                        <input className={showBtn ? inputStyle : bgWhiteInput} 
                               type="text" 
                               name="address" 
                               value={formData.address || ""}
                               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                               disabled={showBtn} /> 

                        <div className="flex flex-row gap-4 m-auto">

                            {showBtn && <button onClick={() => setShowBtn(false)} className={btnStyle} type="button">Modify</button>}
                            {!showBtn && <button  className={btnStyle} type="submit">Save</button>}
                            
                        </div>                                              
                    </form>              
                </div>

            <div className="flex flex-col w-[30%]">
                <h1 className="my-4 text-amber-500 text-2xl font-extrabold font-mono">Notifications</h1>
                <label className="flex flex-row gap-2 text-amber-500" htmlFor="">
                <input type="checkbox" />
                Email notifications for new uploads.
                </label>

                <label className="flex flex-row gap-2 text-amber-500" htmlFor="">
                <input type="checkbox" />
                Email notifications for new uploads.
                </label>

                <label className="flex flex-row gap-2 text-amber-500 " htmlFor="">
                <input type="checkbox" />
                Email notifications for new uploads.
                </label>

            </div>

              <div id="recaptcha-container" className="hidden"></div>
        </div>
    )
}

export default Account;