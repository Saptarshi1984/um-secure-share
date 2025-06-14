'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalSizeKB, setTotalSizeKB] = useState(0);

  useEffect(() => {
    const auth = getAuth();

    // Subscribe to auth state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFiles([]);
        setTotalCount(0);
        setTotalSizeKB(0);
        return;
      }

      // Fetch all uploads for this user
      const q = query(collection(db, 'uploads'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => doc.data());

      // Compute totals
      setTotalCount(docs.length);
      const sumKB = docs.reduce((sum, f) => {
        const num = parseFloat(f.size);
        return sum + (isNaN(num) ? 0 : num);
      }, 0);
      setTotalSizeKB(sumKB);

      // Sort by createdAt (descending) and take latest 5
      const sorted = docs
        .filter(f => f.createdAt)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        .slice(0, 5);

      setFiles(sorted);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-around w-[98%] my-4">
      {/* Summary Section */}
      <div className="flex flex-row w-[60%] gap-10 justify-center">
        <div className="border border-gray-400 p-4 rounded-2xl text-center">
          <h1 className="my-4 text-amber-500 text-lg font-extrabold font-mono">
            Total Files Uploaded
          </h1>
          <p className="text-amber-400">{totalCount}</p>
        </div>
        <div className="border border-gray-400 p-4 rounded-2xl text-center">
          <h1 className="my-4 text-amber-500 text-lg font-extrabold font-mono">
            Total Upload Size
          </h1>
          <p className="text-amber-400">{(totalSizeKB / 1024).toFixed(2)} MB</p>
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="flex flex-col w-[60%]">
        <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">
          Last 5 Uploads
        </h1>
        <table className="table-auto w-full border-collapse border border-amber-500 text-amber-500">
          <thead>
            <tr>
              <th className="border border-amber-500 p-2">File Name</th>
              <th className="border border-amber-500 p-2">Upload Date</th>
              <th className="border border-amber-500 p-2">File Size</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, idx) => (
              <tr key={idx}>
                <td className="border border-amber-500 p-2">{file.name}</td>
                <td className="border border-amber-500 p-2">
                  {file.createdAt?.toDate().toLocaleString() || '—'}
                </td>
                <td className="border border-amber-500 p-2">{file.size}</td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-amber-400">
                  No recent uploads
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
