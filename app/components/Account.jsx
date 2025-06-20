'use client'

import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";

const Account = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState(null);
  const [showBtn, setShowBtn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    aadhar: "",
    address: "",
  });

  const labelStyle = "text-amber-500 text-2xl font-semibold";
  const inputStyle = "text-amber-700 text-lg p-1 font-semibold border-1 border-amber-600";
  const bgWhiteInput = "text-amber-700 text-lg p-1 font-semibold border-1 border-amber-600 bg-gray-300";
  const btnStyle = "text-xl font-bold font-mono text-amber-500 p-2 border-[1px] border-amber-500 rounded-lg hover:text-white";

  useEffect(() => {
    const fetchData = async () => {
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
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        name: formData.name,
        mobile: formData.mobile,
        aadhar: formData.aadhar,
        address: formData.address,
        verified: false,
      });
      setUserData(formData);
      setShowBtn(true);
    } catch (error) {
      alert("Unable to save data, Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-around w-[98%] my-4">
      <div className="flex flex-col w-[60%] gap-4 justify-center">
        <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono m-auto">Account Details</h1>
        <form onSubmit={handleSave} className="w-[50%] flex flex-col gap-6 m-auto">
          <label className={labelStyle}>Name:</label>
          <input className={showBtn ? inputStyle : bgWhiteInput} type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={showBtn} />

          <label className={labelStyle}>Mobile No:</label>
          <div className="w-[100%] flex flex-col gap-2">
            <input
              className={showBtn ? inputStyle : bgWhiteInput}
              type="number"
              value={formData.mobile || ""}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              disabled={showBtn}
            />
            
          </div>

          <label className={labelStyle}>Aadhar No:</label>
          <input className={showBtn ? inputStyle : bgWhiteInput} type="text" value={formData.aadhar || ""} onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })} disabled={showBtn} />

          <label className={labelStyle}>Address:</label>
          <input className={showBtn ? inputStyle : bgWhiteInput} type="text" value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} disabled={showBtn} />

          <div className="flex flex-row gap-4 m-auto">
            {showBtn ? (
              <button onClick={(e) => {e.preventDefault();setShowBtn(false);}}  type="button" className={btnStyle}>
                Modify
              </button>
            ) : (
              <button type="submit" className={btnStyle}>
                Save
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col w-[30%]">
        <h1 className="my-4 text-amber-500 text-2xl font-extrabold font-mono">Notifications</h1>
        <label className="flex flex-row gap-2 text-amber-500">
          <input type="checkbox" />
          Email notifications for new uploads.
        </label>
        <label className="flex flex-row gap-2 text-amber-500">
          <input type="checkbox" />
          Email notifications for account activity.
        </label>
        <label className="flex flex-row gap-2 text-amber-500">
          <input type="checkbox" />
          SMS notifications for changes.
        </label>
      </div>
    </div>
  );
};

export default Account;
