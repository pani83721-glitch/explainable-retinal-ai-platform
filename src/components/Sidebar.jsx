import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/prediction', label: 'Prediction Form', icon: 'edit_note' },
  { path: '/results', label: 'Prediction Results', icon: 'analytics' },
  { path: '/monitoring', label: 'Patient Monitoring', icon: 'monitor_heart' },
  { path: '/alerts', label: 'Alerts & Notifications', icon: 'notifications' },
  { path: '/history', label: 'Patient History', icon: 'history' },
  { path: '/settings', label: 'Settings', icon: 'settings' }
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white/60 backdrop-blur-xl border-r border-primary/10 shadow-md py-md z-40">
      <div className="px-md mb-xl">
        <span className="font-headline-sm text-headline-sm font-bold text-primary">HealthAI Monitor</span>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary font-bold border-r-4 border-primary'
                  : 'text-secondary hover:bg-surface-container hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-md mt-auto pt-md border-t border-primary/10">
        <div className="flex items-center gap-3">
          <img
            alt="Dr. Henderson"
            className="w-10 h-10 rounded-full bg-primary-container"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqmZ9F4rJo7hMOEg982S8lT2me5jErZaw766BrV_KXqBYRRty51401tTIeRY4a9Zy9jA8_SDp-S61YwvsORf8sXiGeE_0qYkM9avX-fxLx7IbZx8YdaFn6e3t7WPxVALCZNdwdf3FROYuymXmpfxoLcZj0z2USmUBjgUxQ1UawZIdvCqC_IOVUraNq-A2oweEVlKpoTuqCi-WTrZprXT-AwahCv2BEAhhWV4ar6pv5AzA9fbhvzSFRvvEpm2kCRwKHRrN7c_8akxud"
          />
          <div>
            <p className="font-label-md text-label-md font-bold text-primary">Dr. Henderson</p>
            <p className="text-[10px] text-secondary">Endocrinology Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
