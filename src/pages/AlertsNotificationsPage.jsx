import { Link } from 'react-router-dom';

export default function AlertsNotificationsPage() {
  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Medical Alerts Central</h1>
          <p className="text-body-lg text-on-surface-variant">Real-time monitoring and intervention management</p>
        </div>
        <Link
          to="/history"
          className="px-md py-2 bg-primary text-white rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-transform"
        >
          View Patient History
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-gutter">
          <div className="glass-card p-md rounded-xl shadow-sm bg-white">
            <h2 className="font-headline-sm text-headline-sm mb-4">Severity Filters</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-red-50/50 border border-red-100 hover:bg-red-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error">emergency</span>
                  <span className="font-label-md text-error">Critical (Red)</span>
                </div>
                <span className="bg-error text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">12</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-amber-50/50 border border-amber-100 hover:bg-amber-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600">warning</span>
                  <span className="font-label-md text-amber-700">Abnormal (Yellow)</span>
                </div>
                <span className="bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">28</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-green-50/50 border border-green-100 hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <span className="font-label-md text-green-700">Stable (Green)</span>
                </div>
                <span className="bg-green-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">142</span>
              </button>
            </div>
          </div>
          <div className="glass-card p-md rounded-xl shadow-sm bg-white flex-1">
            <h2 className="font-headline-sm text-headline-sm mb-4">Alert Distribution</h2>
            <div className="h-64 relative flex items-end justify-between px-2 pt-8">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div key={day} className="w-8 bg-surface-container-highest rounded-t-sm relative h-full">
                  <div
                    className={`absolute bottom-0 w-full rounded-t-sm ${
                      index === 2
                        ? 'bg-amber-400'
                        : index === 4
                        ? 'bg-green-500'
                        : 'bg-error'
                    }`}
                    style={{ height: `${[40, 65, 85, 55, 95][index]}%` }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-secondary">{day}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-between items-center text-label-sm text-outline">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-error" /> Critical</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Abnormal</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Stable</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-8 space-y-md">
          <div className="glass-card p-md rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="font-headline-sm text-headline-sm">Active Alert Feed</h2>
                <p className="text-body-md text-secondary">Prioritized patient alerts for the current shift.</p>
              </div>
              <button className="px-md py-2 bg-primary text-white rounded-lg font-label-md hover:opacity-90">Resolve Selected</button>
            </div>
            <div className="space-y-4">
              {[
                { severity: 'Critical', label: 'Cardiac arrhythmia detected', patient: 'Marcus Thorne', time: '2m ago' },
                { severity: 'Abnormal', label: 'Spiking insulin reading', patient: 'Harper Lee', time: '14m ago' },
                { severity: 'Stable', label: 'Medication adherence missed', patient: 'Nina Patel', time: '35m ago' }
              ].map((item) => (
                <div key={item.label} className="glass-card p-md rounded-xl border border-primary/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-label-sm uppercase tracking-wide text-secondary">{item.severity}</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mt-2">{item.label}</h3>
                    <p className="text-body-md text-on-surface-variant mt-1">{item.patient} · {item.time}</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
