"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheckCircle, FiUsers, FiLock } from "react-icons/fi";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Desktop Hero Section */}
      <main className="hidden md:flex flex-1 flex-row relative bg-[#FCF8F8]">
        
        {/* Content Area (Left on Desktop) */}
        <div className="relative z-10 w-[55%] flex flex-col justify-center px-16 lg:px-20 py-20 min-h-0">
          
          <h1 className="text-[46px] lg:text-[52px] font-bold text-[#a51a49] leading-[1.2] mb-5 tracking-tight relative z-20">
            Find Your <br />
            Perfect Life Partner
          </h1>
          <p className="text-gray-700 text-[15px] mb-8 max-w-sm font-medium leading-relaxed relative z-20">
            India&apos;s most trusted Dhobi Matrimony<br/>service for your happy future.
          </p>

          <div className="flex flex-row gap-4 mb-16 relative z-20">
            <Link href="/register">
              <button className="px-8 py-2.5 bg-[#a51a49] text-white rounded-lg font-bold text-[13px] hover:bg-[#851339] transition shadow-sm">
                Register Free
              </button>
            </Link>
            <Link href="/search">
              <button className="px-8 py-2.5 bg-transparent text-[#a51a49] rounded-lg font-bold text-[13px] border-2 border-[#a51a49] hover:bg-rose-50 transition shadow-sm">
                Search Now
              </button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-nowrap gap-8 lg:gap-12 relative z-20">
            <div className="flex items-center gap-2">
              <FiCheckCircle size={24} strokeWidth={2} className="text-[#a51a49] shrink-0" />
              <span className="text-[12px] font-bold text-gray-800 leading-tight">100% Verified<br/> Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers size={24} strokeWidth={2} className="text-[#a51a49] shrink-0" />
              <span className="text-[12px] font-bold text-gray-800 leading-tight">Trusted by<br/> Thousands</span>
            </div>
            <div className="flex items-center gap-2">
              <FiLock size={24} strokeWidth={2} className="text-[#a51a49] shrink-0" />
              <span className="text-[12px] font-bold text-gray-800 leading-tight">Privacy<br/> Assured</span>
            </div>
          </div>
        </div>

        {/* Image Area (Right on Desktop) */}
        <div className="absolute top-0 bottom-0 right-0 w-[60%] z-0 overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/hands_bg.jpeg')" }}
          />
          
          {/* Background-colored convex curve overlay with GOLD border on the left edge of the image */}
          <div className="absolute top-[-30%] bottom-[-30%] left-[-25%] w-[45%] bg-[#FCF8F8] rounded-[50%] border-r-[6px] border-[#D4AF37] z-10 shadow-lg"></div>
          
          {/* Top Right Pink Accent Swoosh */}
          <svg className="absolute top-0 right-0 w-40 h-40 lg:w-48 lg:h-48 text-[#a51a49] z-20 drop-shadow-xl" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M100,0 L100,60 Q50,60 30,20 Q15,0 0,0 Z" />
          </svg>
        </div>
      </main>

      {/* Mobile Screen UI (Matches Mockup) */}
      <main className="md:hidden flex-1 flex flex-col bg-white">
        {/* Mobile Header */}
        <div className="flex items-center p-4 border-b border-gray-100 relative">
          <button className="text-gray-500 hover:text-gray-800 absolute left-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 flex justify-center items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="text-[#a51a49] font-bold tracking-wide text-lg">DHOBI MATRIMONY</span>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 px-6 py-8 flex flex-col">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome!</h2>
            <p className="text-gray-500 text-sm">Find your perfect life partner</p>
          </div>

          <div className="flex gap-4 mb-12">
            <Link href="/register" className="flex-1">
              <button className="w-full py-3 bg-[#a51a49] text-white rounded-lg font-bold text-sm shadow-sm hover:bg-[#851339] transition">
                Register
              </button>
            </Link>
            <Link href="/login" className="flex-1">
              <button className="w-full py-3 bg-white text-[#a51a49] border-2 border-[#a51a49] rounded-lg font-bold text-sm shadow-sm hover:bg-rose-50 transition">
                Login
              </button>
            </Link>
          </div>

          <div className="mb-10">
            <h3 className="text-base font-bold text-gray-900 mb-6">Why Dhobi Matrimony?</h3>
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 border border-[#a51a49] rounded-full flex items-center justify-center mb-3">
                  <FiCheckCircle size={22} strokeWidth={2} className="text-[#a51a49]" />
                </div>
                <span className="text-[10px] font-bold text-gray-700 leading-tight">100% Verified Profiles</span>
              </div>
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 border border-[#a51a49] rounded-full flex items-center justify-center mb-3">
                  <FiUsers size={22} strokeWidth={2} className="text-[#a51a49]" />
                </div>
                <span className="text-[10px] font-bold text-gray-700 leading-tight">Trusted by Thousands</span>
              </div>
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 border border-[#a51a49] rounded-full flex items-center justify-center mb-3">
                  <FiLock size={22} strokeWidth={2} className="text-[#a51a49]" />
                </div>
                <span className="text-[10px] font-bold text-gray-700 leading-tight">Privacy Assured</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Find Your Life Partner</h2>
            <p className="text-gray-500 text-xs">Search your perfect match</p>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center pb-safe">
          <Link href="/" className="flex flex-col items-center text-[#a51a49]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-semibold">Home</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-gray-400 hover:text-[#a51a49] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[10px] font-semibold">Search</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center text-gray-400 hover:text-[#a51a49] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-[10px] font-semibold">Chat</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center text-gray-400 hover:text-[#a51a49] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-semibold">Profile</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
