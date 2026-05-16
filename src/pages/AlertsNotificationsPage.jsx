import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AlertsNotificationsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/dashboard/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch alerts", err);
        setLoading(false);
      });
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'red': return 'text-error border-error/20 bg-error/5';
      case 'yellow': return 'text-warning border-warning/20 bg-warning/5';
      case 'green': return 'text-success border-success/20 bg-success/5';
      default: return 'text-primary border-primary/20 bg-primary/5';
    }
  };

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
                <span className="bg-error text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {alerts.filter(a => a.severity === 'Red').length}
                </span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-amber-50/50 border border-amber-100 hover:bg-amber-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600">warning</span>
                  <span className="font-label-md text-amber-700">Abnormal (Yellow)</span>
                </div>
                <span className="bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {alerts.filter(a => a.severity === 'Yellow').length}
                </span>
              </button>
            </div>
          </div>

          <div className="glass-card p-md rounded-xl shadow-sm bg-white flex-1">
            <h2 className="font-headline-sm text-headline-sm mb-4">Safety Innovation</h2>
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
              <p className="text-sm text-secondary italic">
                "Even if the ML prediction misses a patient initially, our continuous monitoring layer detects worsening health trends later."
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-8 space-y-md">
          <div className="glass-card p-md rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="font-headline-sm text-headline-sm">Active Alert Feed</h2>
                <p className="text-body-md text-secondary">Prioritized patient alerts from logic-based monitoring.</p>
              </div>
              <button className="px-md py-2 bg-primary text-white rounded-lg font-label-md hover:opacity-90">Resolve All</button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-10 text-secondary">Loading alerts...</div>
              ) : alerts.length === 0 ? (
                <div className="text-center py-10 text-secondary border-2 border-dashed rounded-xl">No active alerts found.</div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className={`glass-card p-md rounded-xl border ${getSeverityColor(alert.severity)} flex items-center justify-between gap-4`}>
                    <div>
                      <span className="font-label-sm uppercase tracking-wide opacity-70">{alert.severity} Severity · {alert.type}</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">{alert.message}</h3>
                      <p className="text-body-md text-on-surface-variant mt-1">
                        Patient: <strong>{alert.patient_name}</strong> · {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary">chevron_right</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
