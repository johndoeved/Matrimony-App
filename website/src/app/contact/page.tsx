import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-6">Contact Us</h1>
        <p className="text-lg text-rose-700 max-w-2xl mb-8">
          We are here to help you on your journey to find your perfect partner.
        </p>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-rose-100 w-full max-w-md text-left">
          <div className="mb-4 flex flex-col">
            <span className="font-bold text-rose-900 mb-1">📞 Phone / WhatsApp:</span> 
            <span className="text-gray-700 font-medium">Ved Parmar: +91 6353606165</span>
            <span className="text-gray-700 font-medium">Rohit Parmar: +91 9173446708</span>
          </div>
          <div className="mb-4 flex flex-col mt-4">
            <span className="font-bold text-rose-900 mb-1">✉️ Email (For any query):</span> 
            <span className="text-gray-700 font-medium">dhobi2230@gmail.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
