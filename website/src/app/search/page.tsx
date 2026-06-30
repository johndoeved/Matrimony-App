import Navbar from "@/components/Navbar";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-6">Search Profiles</h1>
        <p className="text-lg text-rose-700 max-w-2xl mb-8">
          Our advanced search algorithms are built directly into the Dhobi Matrimony Mobile App. Download the app to find your perfect match!
        </p>
        <button 
          onClick={() => alert("Please download the mobile app to search!")}
          className="px-8 py-3 bg-[#a51a49] text-white rounded-full font-bold shadow hover:bg-[#851339] transition">
          Download App
        </button>
      </main>
    </div>
  );
}
