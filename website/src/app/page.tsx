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

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Content Area (Left on Desktop, Top on Mobile) */}
        <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20 bg-white md:bg-transparent min-h-[60vh] md:min-h-0">
          
          {/* White background for the left rect area on desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-full bg-white -z-10"></div>

          <h1 className="text-[36px] sm:text-[40px] md:text-[50px] lg:text-[56px] font-bold text-[#a51a49] leading-[1.1] mb-5 tracking-tight relative z-20">
            Find Your <br />
            Perfect Life Partner
          </h1>
          <p className="text-gray-700 text-[14px] md:text-[15px] mb-8 max-w-sm font-medium leading-relaxed relative z-20">
            India&apos;s most trusted Dhobi Matrimony<br/>service for your happy future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16 relative z-20">
            <Link href="/register">
              <button className="w-full sm:w-auto px-8 py-3 md:py-2.5 bg-[#a51a49] text-white rounded-full font-bold text-[14px] md:text-[13px] hover:bg-[#851339] transition shadow-md">
                Register Free
              </button>
            </Link>
            <Link href="/search">
              <button className="w-full sm:w-auto px-8 py-3 md:py-2.5 bg-white text-[#a51a49] rounded-full font-bold text-[14px] md:text-[13px] border border-[#a51a49] hover:bg-rose-50 transition shadow-md">
                Search Now
              </button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-6 md:gap-12 relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#a51a49] rounded-full bg-white text-[#a51a49] shrink-0">
                <FiCheckCircle size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] md:text-[12px] font-bold text-[#a51a49] leading-tight">100% Verified<br className="hidden sm:block"/> Profiles</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#a51a49] rounded-full bg-white text-[#a51a49] shrink-0">
                <FiUsers size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] md:text-[12px] font-bold text-[#a51a49] leading-tight">Trusted by<br className="hidden sm:block"/> Thousands</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#a51a49] rounded-full bg-white text-[#a51a49] shrink-0">
                <FiLock size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] md:text-[12px] font-bold text-[#a51a49] leading-tight">Privacy<br className="hidden sm:block"/> Assured</span>
            </div>
          </div>
        </div>

        {/* Image Area (Right on Desktop, Bottom on Mobile) */}
        <div className="relative md:absolute md:top-0 md:bottom-0 md:right-0 w-full h-[400px] sm:h-[450px] md:h-full md:w-[55%] z-0 overflow-hidden bg-white">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/images/hands_bg.jpeg')",
            }}
          />
          
          {/* White convex curve overlay with GOLD border on the left edge of the image */}
          <div className="hidden md:block absolute top-[-25%] bottom-[-25%] left-[-20%] w-[40%] bg-white rounded-[50%] border-r-[4px] border-[#D4AF37] z-10 shadow-xl"></div>
          
          {/* Top Right Pink Accent Swoosh (Mockup accurate leaf shape pointing inwards) */}
          <svg className="hidden md:block absolute top-0 right-0 w-40 h-40 lg:w-56 lg:h-56 text-[#a51a49] z-20 drop-shadow-xl" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M100,0 L100,80 Q50,80 30,30 Q20,0 0,0 Z" />
          </svg>
        </div>

      </main>
    </div>
  );
}
