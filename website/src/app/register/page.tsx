'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function RegisterPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 flex justify-center items-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-rose-100">
          <h2 className="text-3xl font-bold text-center text-[#a51a49] mb-8">Create Your Profile</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email or Phone Number</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a51a49] focus:border-transparent outline-none"
                placeholder="Enter email or phone"
                value={emailOrPhone}
                onChange={e => setEmailOrPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a51a49] focus:border-transparent outline-none"
                placeholder="Secure password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#a51a49] hover:bg-[#851339] text-white font-bold py-3 rounded-full transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register Free'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#a51a49] font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
