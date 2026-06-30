"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 md:px-16 py-3 bg-white z-50 relative border-b border-gray-100 shadow-sm">
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image
          src="/images/logo.jpeg"
          alt="Dhobi Matrimony Logo"
          width={45}
          height={45}
          className="rounded-lg object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-[#a51a49] font-serif font-bold text-xl tracking-wide">
            DHOBI
          </span>
          <span className="text-[#d4af37] font-serif text-[10px] tracking-[0.3em] font-medium">
            MATRIMONY
          </span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-gray-700">
        <Link href="/" className="hover:text-[#a51a49] transition">Home</Link>
        <Link href="/search" className="hover:text-[#a51a49] transition">Search</Link>
        <Link href="/premium" className="hover:text-[#a51a49] transition">Premium</Link>
        <Link href="/success-stories" className="hover:text-[#a51a49] transition">Success Stories</Link>
        <Link href="/contact" className="hover:text-[#a51a49] transition">Contact Us</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard">
          <button className="hidden sm:block px-6 py-1.5 rounded-full border border-[#a51a49] text-[#a51a49] text-[13px] font-bold hover:bg-rose-50 transition">
            Login
          </button>
        </Link>
        <button
          onClick={() => alert("Please download the mobile app to register!")}
          className="px-6 py-1.5 rounded-full bg-[#a51a49] text-white text-[13px] font-bold hover:bg-[#851339] transition shadow-sm"
        >
          Register
        </button>
      </div>
    </nav>
  );
}
