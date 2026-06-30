'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, pendingApprovals: 0, approvedProfiles: 0, premiumRevenue: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/profiles/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Platform Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} color="bg-blue-500" />
        <StatCard title="Pending Verifications" value={stats.pendingApprovals} color="bg-orange-500" />
        <StatCard title="Approved Profiles" value={stats.approvedProfiles} color="bg-green-500" />
        <StatCard title="Premium Revenue" value={`₹${stats.premiumRevenue.toLocaleString()}`} color="bg-purple-500" />
      </div>

      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Activity Logs</h3>
        <p className="text-gray-500 italic">Analytical charts will render here once connected to Chart.js</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string, value: string | number, color: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-t-4 border-transparent" style={{ borderTopColor: color.replace('bg-', '') }}>
      <h4 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">{title}</h4>
      <p className={`text-4xl font-bold text-gray-800`}>{value}</p>
    </div>
  );
}
