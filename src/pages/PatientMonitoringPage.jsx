import { Link } from 'react-router-dom';

export default function PatientMonitoringPage() {
  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Patient Monitoring</h1>
          <p className="text-body-lg text-secondary">Real-time tracking of vital signs and clinical alerts.</p>
        </div>
        <div className="flex gap-sm">
          <button className="px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all">
            Refresh
          </button>
          <button className="px-md py-2 bg-primary text-white rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-transform">
            Export Summary
          </button>
        </div>
      </div>
      <div className="glass-card p-md rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-sm mb-md">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary">Health Advisory</h2>
            <p className="text-on-error-container font-body-lg mt-1">Your health reports indicate significant risk. Please visit the hospital immediately.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-md">
          <div className="glass-card p-md rounded-xl">
            <div className="flex items-center justify-between mb-sm">
              <span className="text-secondary font-label-md">Sugar Level</span>
              <span className="material-symbols-outlined text-primary">opacity</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-headline-md text-primary">142</span>
              <span className="text-secondary font-label-sm">mg/dL</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-error font-label-sm">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              12% from avg
            </div>
          </div>
          <div className="glass-card p-md rounded-xl">
            <div className="flex items-center justify-between mb-sm">
              <span className="text-secondary font-label-md">Sleep Quality</span>
              <span className="material-symbols-outlined text-primary">bedtime</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-headline-md text-primary">6.2</span>
              <span className="text-secondary font-label-sm">hours</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-secondary font-label-sm">
              <span className="material-symbols-outlined text-[14px]">remove</span>
              Baseline stable
            </div>
          </div>
          <div className="glass-card p-md rounded-xl">
            <div className="flex items-center justify-between mb-sm">
              <span className="text-secondary font-label-md">Avg Fatigue</span>
              <span className="material-symbols-outlined text-primary">energy_savings_leaf</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-headline-md text-primary">High</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-error font-label-sm">
              <span className="material-symbols-outlined text-[14px]">priority_high</span>
              Action Required
            </div>
          </div>
        </div>
        <div className="md:col-span-4 glass-card p-md rounded-xl flex flex-col items-center justify-center text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          <div className="relative z-10">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mb-md mx-auto" />
            <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Reassessment Triggered</h4>
            <p className="text-secondary font-body-md">AI analyzing reported symptoms for risk escalation...</p>
            <Link to="/alerts" className="mt-4 inline-flex items-center gap-1 text-primary font-label-md hover:underline">
              View live alerts
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
