import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Prediction Form', to: '/prediction' },
  { label: 'Prediction Results', to: '/results' },
  { label: 'Patient Monitoring', to: '/monitoring' },
  { label: 'Alerts & Notifications', to: '/alerts' },
  { label: 'Patient History', to: '/history' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-margin-desktop w-full h-16 bg-white/70 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="font-headline-md text-headline-md font-bold text-primary">HealthAI Monitor</span>
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4 text-primary">
        <button className="material-symbols-outlined p-2 scale-95 active:scale-90 transition-transform">notifications</button>
        <button className="material-symbols-outlined p-2 scale-95 active:scale-90 transition-transform">account_circle</button>
      </div>
    </header>
  );
}
