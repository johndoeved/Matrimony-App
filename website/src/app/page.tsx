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
      <main className="flex-1 flex flex-col md:flex-row relative bg-[#FCF8F8]">
        
        {/* Content Area (Left on Desktop, Top on Mobile) */}
        <div className="relative z-10 w-full md:w-[50%] flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-20 py-12 md:py-20 min-h-[60vh] md:min-h-0">
          
          <h1 className="text-[36px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#a51a49] leading-[1.2] mb-5 tracking-tight relative z-20">
            Find Your <br />
            Perfect Life Partner
          </h1>
          <p className="text-gray-700 text-[14px] md:text-[15px] mb-8 max-w-sm font-medium leading-relaxed relative z-20">
            India&apos;s most trusted Dhobi Matrimony<br/>service for your happy future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16 relative z-20">
            <Link href="/register">
              <button className="w-full sm:w-auto px-8 py-3 md:py-2.5 bg-[#a51a49] text-white rounded-lg font-bold text-[14px] md:text-[13px] hover:bg-[#851339] transition shadow-sm">
                Register Free
              </button>
            </Link>
            <Link href="/search">
              <button className="w-full sm:w-auto px-8 py-3 md:py-2.5 bg-transparent text-[#a51a49] rounded-lg font-bold text-[14px] md:text-[13px] border-2 border-[#a51a49] hover:bg-rose-50 transition shadow-sm">
                Search Now
              </button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-6 md:gap-8 lg:gap-12 relative z-20">
            <div className="flex items-center gap-2">
              <FiCheckCircle size={24} strokeWidth={2} className="text-[#a51a49] shrink-0" />
              <span className="text-[11px] md:text-[12px] font-bold text-gray-800 leading-tight">100% Verified<br className="hidden sm:block"/> Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers size={24} strokeWidth={2} className="text-[#a51a49] shrink-0" />
              <span className="text-[11px] md:text-[12px] font-bold text-gray-800 leading-tight">Trusted by<br className="hidden sm:block"/> Thousands</span>
            </div>
            <div className="flex items-center gap-2">
              <FiLock size={24} strokeWidth={2} className="text-[#a51a49] shrink-0" />
              <span className="text-[11px] md:text-[12px] font-bold text-gray-800 leading-tight">Privacy<br className="hidden sm:block"/> Assured</span>
            </div>
          </div>
        </div>

        {/* Image Area (Right on Desktop, Bottom on Mobile) */}
        <div className="relative md:absolute md:top-0 md:bottom-0 md:right-0 w-full h-[400px] sm:h-[450px] md:h-full md:w-[60%] z-0 overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/images/hands_bg.jpeg')",
            }}
          />
          
          {/* Background-colored convex curve overlay with GOLD border on the left edge of the image */}
          <div className="hidden md:block absolute top-[-30%] bottom-[-30%] left-[-25%] w-[45%] bg-[#FCF8F8] rounded-[50%] border-r-[6px] border-[#D4AF37] z-10 shadow-lg"></div>
          
          {/* Top Right Pink Accent Swoosh */}
          <svg className="hidden md:block absolute top-0 right-0 w-40 h-40 lg:w-48 lg:h-48 text-[#a51a49] z-20 drop-shadow-xl" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M100,0 L100,60 Q50,60 30,20 Q15,0 0,0 Z" />
          </svg>
        </div>

      </main>
    </div>
  );
}
