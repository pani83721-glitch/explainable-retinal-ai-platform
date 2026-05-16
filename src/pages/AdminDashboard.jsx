import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-lg">
      <nav className="flex items-center gap-2 text-label-sm text-secondary mb-4">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="hover:text-primary transition-colors">Dashboard</span>
      </nav>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Clinical Overview</h1>
          <p className="text-body-lg text-secondary">Real-time monitoring and predictive risk analysis for your department.</p>
        </div>
        <div className="flex gap-sm">
          <button className="flex items-center gap-xs px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
          <button
            onClick={() => navigate('/prediction')}
            className="flex items-center gap-xs px-md py-2 bg-primary text-white rounded-lg font-label-md shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Assessment
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        <div className="glass-card p-md rounded-xl ambient-shadow">
          <div className="flex justify-between items-start mb-sm">
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">group</span>
            </div>
            <span className="text-emerald-600 font-label-sm flex items-center">+2.4%</span>
          </div>
          <p className="text-secondary font-label-md">Total Patients</p>
          <h3 className="font-headline-md text-headline-md text-on-surface">1,240</h3>
        </div>
        <div className="glass-card p-md rounded-xl ambient-shadow">
          <div className="flex justify-between items-start mb-sm">
            <div className="p-2 bg-tertiary-fixed rounded-lg">
              <span className="material-symbols-outlined text-tertiary">monitor_heart</span>
            </div>
            <span className="text-secondary font-label-sm">Stable</span>
          </div>
          <p className="text-secondary font-label-md">Active Monitoring</p>
          <h3 className="font-headline-md text-headline-md text-on-surface">850</h3>
        </div>
        <div className="glass-card p-md rounded-xl ambient-shadow">
          <div className="flex justify-between items-start mb-sm">
            <div className="p-2 bg-error-container rounded-lg">
              <span className="material-symbols-outlined text-error">warning</span>
            </div>
            <span className="text-error font-label-sm">+5 today</span>
          </div>
          <p className="text-secondary font-label-md">High Risk</p>
          <h3 className="font-headline-md text-headline-md text-on-surface">42</h3>
        </div>
        <div className="glass-card p-md rounded-xl ambient-shadow">
          <div className="flex justify-between items-start mb-sm">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-on-secondary-container">notifications_active</span>
            </div>
            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">Urgent</span>
          </div>
          <p className="text-secondary font-label-md">New Alerts</p>
          <h3 className="font-headline-md text-headline-md text-on-surface">12</h3>
        </div>
      </div>
      <div className="space-y-sm">
        <h4 className="font-label-md text-label-md font-bold uppercase tracking-wider text-secondary">Quick Actions</h4>
        <div className="flex flex-wrap gap-sm">
          <button
            onClick={() => navigate('/prediction')}
            className="flex items-center gap-xs px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Create Prediction
          </button>
          <button
            onClick={() => navigate('/monitoring')}
            className="flex items-center gap-xs px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
            Monitor Patients
          </button>
          <button
            onClick={() => navigate('/alerts')}
            className="flex items-center gap-xs px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">warning</span>
            Review Alerts
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-xs px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            Patient History
          </button>
        </div>
      </div>
    </div>
  );
}
