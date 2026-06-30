import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-rose-900 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-xl text-rose-900 border-2 border-yellow-300 shadow-inner">
            DM
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-yellow-400">DHOBI MATRIMONY</h1>
            <p className="text-xs italic text-rose-200">Tradition • Trust • Togetherness</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-rose-50 to-rose-200 -z-10"></div>
        
        <h2 className="text-4xl md:text-6xl font-extrabold text-rose-900 mb-6 drop-shadow-sm">
          Find Your Perfect Life Partner
        </h2>
        <p className="text-lg md:text-2xl text-rose-800 italic max-w-2xl mb-12 font-medium">
          "Two hearts united, a love story begins, forever entwined"
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className="px-10 py-4 bg-rose-700 text-white rounded-full font-bold text-lg hover:bg-rose-800 transition shadow-xl transform hover:-translate-y-1">
            Create Profile
          </button>
          <button className="px-10 py-4 bg-white text-rose-700 rounded-full font-bold text-lg hover:bg-rose-50 transition shadow-xl border-2 border-rose-200 transform hover:-translate-y-1">
            Login
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-24 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md border-2 border-yellow-400">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <span className="font-bold text-rose-900">100% Verified Profiles</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md border-2 border-yellow-400">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
            </div>
            <span className="font-bold text-rose-900">Trusted by Thousands</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md border-2 border-yellow-400">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            </div>
            <span className="font-bold text-rose-900">Privacy Assured</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-rose-950 text-rose-200 py-8 text-center text-sm border-t-4 border-yellow-500">
        <p>&copy; {new Date().getFullYear()} Dhobi Matrimony. All rights reserved.</p>
      </footer>
    </div>
  );
}
