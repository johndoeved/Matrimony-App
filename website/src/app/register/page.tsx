'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function RegisterPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:5000/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }
      
      setSuccessMsg('OTP sent successfully! Please check your email or phone.');
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    
    try {
      // 1. Verify OTP
      const verifyRes = await fetch('http://localhost:5000/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, otp })
      });
      
      if (!verifyRes.ok) {
        const errorData = await verifyRes.json();
        throw new Error(errorData.message || 'Invalid or expired OTP');
      }

      // 2. Register Account
      const regRes = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password })
      });
      
      if (!regRes.ok) {
        const errorData = await regRes.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await regRes.json();
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
          {successMsg && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-sm">
              {successMsg}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address or Phone Number</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a51a49] focus:border-transparent outline-none"
                  placeholder="Enter email for OTP"
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
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a51a49] focus:border-transparent outline-none text-center tracking-widest font-bold"
                  placeholder="------"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  OTP was sent to {emailOrPhone}
                </p>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#a51a49] hover:bg-[#851339] text-white font-bold py-3 rounded-full transition shadow-md disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Register'}
              </button>
              
              <button 
                type="button"
                onClick={() => { setStep(1); setOtp(''); setError(''); setSuccessMsg(''); }}
                className="w-full bg-white border border-[#a51a49] text-[#a51a49] font-bold py-3 rounded-full transition shadow-sm hover:bg-rose-50 mt-3"
              >
                Back to Edit
              </button>
            </form>
          )}

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
