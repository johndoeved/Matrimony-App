"use client";

import Navbar from "@/components/Navbar";

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-600 mb-6">Premium Memberships</h1>
        <p className="text-lg text-rose-700 max-w-2xl mb-8">
          Unlock unlimited swipes, priority profile listing, and read receipts with Dhobi Matrimony Premium. Available exclusively in the mobile app.
        </p>
        <button 
          onClick={() => alert("Please download the mobile app to view premium plans!")}
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-bold shadow hover:opacity-90 transition">
          View Plans
        </button>
      </main>
    </div>
  );
}
