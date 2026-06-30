'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null; // Avoid flashing the dashboard before redirect

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#a51a49] mb-2">My Profile Dashboard</h2>
            <p className="text-gray-600">Welcome to your Dhobi Matrimony account.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-6 py-2 border-2 border-[#a51a49] text-[#a51a49] rounded-full font-bold hover:bg-rose-50 transition"
          >
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-50">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Profile Status</h3>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">Pending Verification</span>
            <p className="text-sm text-gray-500 mt-4">Please upload your Aadhaar card to get verified and start matching.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-50">
            <h3 className="font-bold text-gray-800 text-lg mb-2">My Matches</h3>
            <p className="text-sm text-gray-500">Your matches will appear here once your profile is verified.</p>
            <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed">View Matches</button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-50">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Premium Plan</h3>
            <p className="text-sm text-gray-500">You are currently on the Free tier.</p>
            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg text-sm font-bold shadow hover:opacity-90">Upgrade Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
