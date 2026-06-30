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
      <main className="flex-1 flex relative">
        
        {/* Right Side Image (placed first in DOM so it sits behind the left side curve) */}
        <div className="absolute top-0 bottom-0 right-0 w-1/2 md:w-[60%] lg:w-[55%] z-0 h-full overflow-hidden">
          {/* We use the layout mockup image, positioned to show the hands at the top */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: "url('/images/layout_mockup.jpeg')",
              backgroundPosition: "center 15%",
              backgroundSize: "cover"
            }}
          />
          {/* Top Right Pink Accent Curve */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a51a49] rounded-bl-full shadow-lg opacity-90 transform translate-x-12 -translate-y-12"></div>
        </div>

        {/* Left Side (White content area with curved right border) */}
        <div className="relative z-10 w-full md:w-[65%] lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 md:py-20">
          
          {/* Massive white circle to create the convex curve cutting into the right image */}
          <div className="hidden md:block absolute top-1/2 -right-[15%] w-[120%] h-[150%] bg-white rounded-full -translate-y-1/2 -z-10 shadow-[10px_0_30px_rgba(0,0,0,0.05)]"></div>
          {/* White background for the left rect area */}
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-full bg-white -z-10"></div>

          <h1 className="text-[40px] md:text-[50px] lg:text-[56px] font-bold text-[#a51a49] leading-[1.1] mb-5 tracking-tight relative z-20">
            Find Your <br />
            Perfect Life Partner
          </h1>
          <p className="text-gray-700 text-sm md:text-[15px] mb-8 max-w-sm font-medium leading-relaxed relative z-20">
            India&apos;s most trusted Dhobi Matrimony<br/>service for your happy future.
          </p>

          <div className="flex gap-4 mb-16 relative z-20">
            <button
              onClick={() => alert("Please download the mobile app to register!")}
              className="px-8 py-2.5 bg-[#a51a49] text-white rounded-full font-bold text-[13px] hover:bg-[#851339] transition shadow-md"
            >
              Register Free
            </button>
            <button
              onClick={() => alert("Please download the mobile app to search!")}
              className="px-8 py-2.5 bg-white text-[#a51a49] rounded-full font-bold text-[13px] border border-[#a51a49] hover:bg-rose-50 transition shadow-md"
            >
              Search Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex gap-8 md:gap-12 relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#a51a49] rounded-full bg-white text-[#a51a49]">
                <FiCheckCircle size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-bold text-[#a51a49] leading-tight">100% Verified<br/>Profiles</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#a51a49] rounded-full bg-white text-[#a51a49]">
                <FiUsers size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-bold text-[#a51a49] leading-tight">Trusted by<br/>Thousands</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#a51a49] rounded-full bg-white text-[#a51a49]">
                <FiLock size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-bold text-[#a51a49] leading-tight">Privacy<br/>Assured</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
