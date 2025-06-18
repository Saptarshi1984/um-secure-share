import { useRef, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db, storage } from "@/firebase/firebase";
import { deleteDoc, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const Upload = () => {

  const [fileList, setFileList] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  

  const buttonStyle =
    "text-amber-500 border-2 border-amber-500 rounded-md px-4 py-2 font-semibold hover:bg-amber-500 hover:text-white transition";

  useEffect(() => {

    const fetchFiles = async () => {
      const { currentUser } = getAuth();
      if (!currentUser) return;

      const q = query(collection(db, "uploads"), where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      setFileList(snapshot.docs.map(doc => doc.data()));
    };
    fetchFiles();
  }, []);

  const uploadFile = async (file) => {
    const { currentUser } = getAuth();
    if (!currentUser) {
      alert("Please login to upload files.");
      return;
    }
    try {
      const path = `uploads/${currentUser.uid}/${Date.now()}_${file.name}`;
      const fileRef = storageRef(storage, path);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      const newFile = {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        url,
        storagePath: path,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        sharedWith: []
      };
      await addDoc(collection(db, "uploads"), newFile);
      setFileList(prev => [...prev, newFile]);
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    }
  };

  const handleFiles = (files) => {
    [...files].forEach(uploadFile);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDelete = async (url) => {
    const { currentUser } = getAuth();
    if (!currentUser) return;
    try {
      const q = query(collection(db, "uploads"), where("url", "==", url));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        const { storagePath } = snapshot.docs[0].data();
        await deleteDoc(docRef);
        const fileRef = storageRef(storage, storagePath);
        await deleteObject(fileRef);
        setFileList(prev => prev.filter(f => f.url !== url));
      }
    } catch (err) {
      alert(`Error deleting file: ${err.message}`);
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link Copied.")
    
  }



  return (
    
    <div className="flex flex-col items-center justify-center w-[98%] mx-auto my-4">

      <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">Uploads</h1>      

      <div
        
        className={`w-[60%] h-100 border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-10 transition-colors cursor-pointer ${
          dragActive ? 'bg-amber-600 border-amber-600' : 'border-amber-500 my-10'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <p className="text-amber-100">
          {dragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
        </p>
        <button type="button" className={`${buttonStyle} bg-transparent`} onClick={handleUpload}>
          Select Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      <div className="flex flex-col w-[60%] mt-6">
        <h2 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">All Files</h2>
        <table className="table-auto w-full border-collapse border border-amber-500 text-amber-500">
          <thead>
            <tr>
              <th className="border border-amber-500 p-2">Sl No.</th>
              <th className="border border-amber-500 p-2">File Name</th>
              <th className="border border-amber-500 p-2">File Size</th>
              <th className="border border-amber-500 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {fileList.map((file, idx) => (
              <tr key={idx}>
                <td className="border border-amber-500 p-2">{idx + 1}</td>
                <td className="border border-amber-500 p-2">{file.name}</td>
                <td className="border border-amber-500 p-2">{file.size}</td>
                <td className="border border-amber-500 p-2 flex flex-row gap-2 justify-around">

                  <button
                    onClick={() => handleDelete(file.url)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleCopyLink(file.url)}
                    className="text-white hover:underline cursor-pointer"
                  >
                    Copy Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
    </div>
    
  );
};

export default Upload;
