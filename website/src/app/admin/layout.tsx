import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-pink-500">Dhobi Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-3 rounded hover:bg-gray-800 transition">
            📊 Dashboard
          </Link>
          <Link href="/admin/verifications" className="block px-4 py-3 rounded hover:bg-gray-800 transition">
            🛡️ Verifications
          </Link>
          <Link href="/admin/users" className="block px-4 py-3 rounded hover:bg-gray-800 transition">
            👥 User Management
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
