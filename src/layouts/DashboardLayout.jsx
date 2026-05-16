import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <Sidebar />
      <div className="lg:ml-64 min-h-screen">
        <Navbar />
        <main className="px-margin-desktop py-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
