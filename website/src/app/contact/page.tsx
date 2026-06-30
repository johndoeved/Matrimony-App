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
          <div className="mb-4">
            <span className="font-bold text-rose-900">Phone:</span> <span className="text-gray-700">+91 9959195396</span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-rose-900">Email:</span> <span className="text-gray-700">support@dhobimatrimony.com</span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-rose-900">Address:</span> <br/>
            <span className="text-gray-700">Dhobi Matrimony Headquarters<br/>Mumbai, India</span>
          </div>
        </div>
      </main>
    </div>
  );
}
