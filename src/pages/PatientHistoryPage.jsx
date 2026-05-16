export default function PatientHistoryPage() {
  return (
    <div className="space-y-lg">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Patient History: Sarah J. Miller</h1>
          <p className="font-label-sm text-label-sm text-secondary">Dashboard &gt; Prediction &gt; Results &gt; Monitoring &gt; Alerts &gt; History</p>
        </div>
        <div className="flex gap-2">
          <button className="px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all">Back to Alerts</button>
          <button className="px-md py-2 bg-primary text-white rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-transform">Download Report</button>
        </div>
      </header>
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-md">
          <div className="flex justify-between items-center mb-md">
            <h2 className="font-headline-sm text-headline-sm">Risk Transition Timeline</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-label-sm bg-primary text-white rounded-full">6 Months</button>
              <button className="px-3 py-1 text-label-sm text-secondary hover:bg-surface-container rounded-full">1 Year</button>
            </div>
          </div>
          <div className="h-64 relative flex items-end justify-between px-4 pb-8 border-b border-outline-variant">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-2 rounded-t" style={{ height: `${[25, 20, 25, 45, 40, 65, 80, 100][index]}%`, backgroundColor: index >= 6 ? '#ef4444' : '#10b981' }} />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-label-sm text-secondary px-2">
            {['Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-md flex flex-col">
          <div className="flex items-center gap-4 mb-md">
            <div className="w-16 h-16 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]">person</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm">Sarah J. Miller</p>
              <span className="inline-flex items-center gap-1 text-label-sm text-error bg-error/10 px-2 py-0.5 rounded-full font-bold">CRITICAL CARE</span>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center py-2 border-b border-primary/5">
              <span className="font-label-md text-secondary">Primary Diagnosis</span>
              <span className="font-label-md text-on-surface">Type 2 Diabetes</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-primary/5">
              <span className="font-label-md text-secondary">Last HbA1c</span>
              <span className="font-label-md text-error">8.4% (Elevated)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-primary/5">
              <span className="font-label-md text-secondary">Attending Physician</span>
              <span className="font-label-md text-on-surface">Dr. Henderson</span>
            </div>
          </div>
          <button className="w-full mt-lg bg-primary text-white py-3 rounded-lg font-label-md hover:bg-primary-container transition-transform active:scale-95">
            Download Longitudinal Report
          </button>
        </div>
      </div>
    </div>
  );
}
