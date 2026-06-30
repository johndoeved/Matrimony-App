"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheckCircle, FiHeart, FiLock } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-4 md:px-12 py-4 bg-white shadow-sm relative z-50">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/images/logo.jpeg"
            alt="Dhobi Matrimony Logo"
            width={50}
            height={50}
            className="rounded-xl shadow-sm object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-rose-800 font-serif font-bold text-xl md:text-2xl tracking-wider">
              DHOBI
            </span>
            <span className="text-yellow-600 font-serif text-xs md:text-sm tracking-[0.2em]">
              MATRIMONY
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-rose-600 transition">
            Home
          </Link>
          <Link href="#" className="hover:text-rose-600 transition">
            Search
          </Link>
          <Link href="#" className="hover:text-rose-600 transition">
            Premium
          </Link>
          <Link href="#" className="hover:text-rose-600 transition">
            Success Stories
          </Link>
          <Link href="#" className="hover:text-rose-600 transition">
            Contact Us
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard">
            <button className="hidden sm:block px-6 py-2 rounded-full border border-rose-600 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition">
              Login
            </button>
          </Link>
          <button
            onClick={() => alert("Welcome! Please open the Flutter Mobile App to create your profile and start swiping.")}
            className="px-6 py-2 rounded-full bg-rose-700 text-white text-sm font-semibold hover:bg-rose-800 transition shadow-md"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row relative">
        {/* Left Side (White) */}
        <div className="w-full md:w-7/12 bg-white flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-20 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-rose-700 leading-tight mb-4">
            Find Your <br />
            Perfect Life Partner
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md font-medium">
            India&apos;s most trusted Dhobi Matrimony service for your happy future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => alert("Please download the mobile app to register!")}
              className="px-8 py-3 bg-rose-700 text-white rounded-full font-bold text-sm md:text-base hover:bg-rose-800 transition shadow-lg w-fit"
            >
              Register Free
            </button>
            <button
              onClick={() => alert("Please download the mobile app to search!")}
              className="px-8 py-3 bg-white text-rose-700 rounded-full font-bold text-sm md:text-base border border-rose-600 hover:bg-rose-50 transition shadow-md w-fit"
            >
              Search Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-8 md:gap-12 text-sm font-semibold text-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-rose-200 rounded-full bg-rose-50 text-rose-600">
                <FiCheckCircle size={20} />
              </div>
              <span className="max-w-[80px]">100% Verified Profiles</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 border border-rose-200 rounded-full bg-rose-50 text-rose-600">
                <FiHeart size={20} />
              </div>
              <span className="max-w-[80px]">Trusted by Thousands</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 border border-rose-200 rounded-full bg-rose-50 text-rose-600">
                <FiLock size={20} />
              </div>
              <span className="max-w-[80px]">Privacy Assured</span>
            </div>
          </div>
        </div>

        {/* Right Side (Gradient / Background) */}
        {/* We use a custom clip-path to create the beautiful curved intersection between white and maroon */}
        <div className="hidden md:block w-7/12 absolute top-0 bottom-0 right-0 z-0 bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950" style={{ clipPath: 'ellipse(70% 80% at 85% 50%)' }}>
          {/* Decorative Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
          
          <div className="absolute top-1/4 left-1/4 text-white text-3xl font-serif font-light leading-snug drop-shadow-lg opacity-90 max-w-sm">
            Two hearts united, <br />
            <span className="font-bold">A LOVE STORY BEGINS,</span> <br />
            forever entwined
          </div>
        </div>
      </main>

      {/* Footer Banner */}
      <div className="bg-rose-900 text-white flex flex-col md:flex-row items-center justify-between px-8 py-3 z-50 text-sm font-medium">
        <div className="bg-white text-rose-900 px-4 py-1 rounded-full font-bold shadow mb-3 md:mb-0">
          Free Register now
        </div>
        <div className="flex items-center gap-6">
          <span>📞 +91 9959195396</span>
          <a href="https://www.dhobimatrimony.com" className="hover:underline">www.dhobimatrimony.com</a>
        </div>
      </div>
    </div>
  );
}
