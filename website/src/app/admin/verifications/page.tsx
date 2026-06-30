'use client';
import { useEffect, useState } from 'react';

interface PendingProfile {
  _id: string;
  user: string;
  gender: string;
  religion: string;
  caste: string;
  idDocumentUrl: string;
  createdAt: string;
}

export default function AdminVerifications() {
  const [profiles, setProfiles] = useState<PendingProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    try {
      const res = await fetch('http://localhost:5000/profiles/pending');
      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`http://localhost:5000/profiles/${id}/${action}`, {
        method: 'PATCH'
      });
      if (res.ok) {
        alert(`Profile ${action}d successfully!`);
        // Remove from list
        setProfiles(profiles.filter(p => p._id !== id));
      } else {
        alert(`Failed to ${action} profile.`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Pending Verifications</h2>
      <p className="text-gray-600 mb-8">Review and approve new profiles and KYC documents before they appear in matches.</p>
      
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demographics</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID Document / Aadhaar</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">Loading pending verifications...</td></tr>
            ) : profiles.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No pending profiles found! All caught up.</td></tr>
            ) : (
              profiles.map((p) => (
                <tr key={p._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className="font-semibold block capitalize">{p.gender}</span>
                    <span className="text-xs text-gray-500">{p.religion} / {p.caste}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {p.idDocumentUrl ? (
                      <a href={p.idDocumentUrl} target="_blank" rel="noreferrer" className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold hover:bg-blue-100 transition">
                        View Document
                      </a>
                    ) : (
                      <span className="text-xs text-red-500 font-medium">Missing</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button 
                      onClick={() => handleAction(p._id, 'approve')} 
                      className="px-4 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-md transition font-bold"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(p._id, 'reject')} 
                      className="px-4 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition font-bold"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
