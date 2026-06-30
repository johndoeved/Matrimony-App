'use client';
import { useEffect, useState } from 'react';

export default function AdminVerifications() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/profiles/pending')
      .then(res => res.json())
      .then(data => setPending(data))
      .catch(console.error);
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    await fetch(`http://localhost:5000/profiles/${id}/${action}`, { method: 'PATCH' });
    setPending(pending.filter((p: any) => p._id !== id));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Pending ID Verifications</h2>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pending.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No pending profiles found!</td></tr>
            )}
            {pending.map((p: any) => (
              <tr key={p._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p._id.substring(0,8)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{p.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.location?.city || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Aadhaar Review Needed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <button onClick={() => handleAction(p._id, 'approve')} className="text-green-600 hover:text-green-900 font-bold">Approve</button>
                  <button onClick={() => handleAction(p._id, 'reject')} className="text-red-600 hover:text-red-900 font-bold">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
