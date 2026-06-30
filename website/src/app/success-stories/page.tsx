import Navbar from "@/components/Navbar";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-6">Success Stories</h1>
        <p className="text-lg text-rose-700 max-w-2xl mb-8">
          Read thousands of heartwarming stories of couples who found true love on Dhobi Matrimony. 
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-100">
            <h3 className="font-bold text-rose-800 text-xl mb-2">Rahul & Priya</h3>
            <p className="text-gray-600 text-sm italic">&quot;We met on Dhobi Matrimony and knew instantly we were meant to be. Thank you!&quot;</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-100">
            <h3 className="font-bold text-rose-800 text-xl mb-2">Amit & Sneha</h3>
            <p className="text-gray-600 text-sm italic">&quot;The verified profiles gave us peace of mind. We are happily married for 2 years now.&quot;</p>
          </div>
        </div>
      </main>
    </div>
  );
}
