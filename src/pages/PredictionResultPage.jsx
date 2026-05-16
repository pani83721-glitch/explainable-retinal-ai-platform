import { Link } from 'react-router-dom';

export default function PredictionResultPage() {
  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Analysis for Marcus Thorne</h1>
          <p className="text-on-surface-variant font-body-md">Patient ID: 88219-B | Room: 402-A | Admitted: Oct 12, 2024</p>
        </div>
        <div className="flex gap-sm flex-wrap">
          <button className="px-md py-2 border border-primary text-primary rounded-lg font-label-md flex items-center gap-2 hover:bg-primary/5 transition-all">
            <span className="material-symbols-outlined text-sm">share</span>
            Export PDF
          </button>
          <Link
            to="/monitoring"
            className="px-md py-2 bg-primary text-white rounded-lg font-label-md flex items-center gap-2 shadow-sm hover:opacity-90 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            Start Monitoring
          </Link>
          <button className="px-md py-2 bg-secondary text-white rounded-lg font-label-md flex items-center gap-2 shadow-sm active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-sm">clinical_notes</span>
            Update Record
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-md">
        <div className="col-span-12 md:col-span-4 glass-card border border-primary/10 rounded-xl p-md flex flex-col items-center justify-center text-center space-y-md shadow-sm">
          <h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest self-start">Current Status</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12" />
              <circle className="text-error" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeLinecap="round" strokeWidth="12" strokeDasharray="502.4" strokeDashoffset="60.48" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-lg text-headline-lg text-error">88%</span>
              <span className="font-label-sm text-label-sm text-secondary">Risk Score</span>
            </div>
          </div>
          <div className="bg-error/10 text-error px-xl py-3 rounded-xl flex items-center gap-3 border border-error/20">
            <span className="material-symbols-outlined">warning</span>
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight">High Risk</span>
          </div>
          <p className="text-on-surface-variant font-body-md px-md">
            Probable readmission within 30 days due to glycemic instability and cardiac history.
          </p>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-md">
          <div className="glass-card border-l-4 border-l-primary border-primary/10 rounded-xl p-md shadow-sm">
            <div className="flex items-start gap-md">
              <div className="p-sm bg-primary/10 rounded-full text-primary">
                <span className="material-symbols-outlined">medical_information</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Consultation Recommendation</h3>
                <p className="text-on-surface font-body-lg font-bold">Daily Physical Consultation Required</p>
                <p className="text-on-surface-variant font-body-md mt-2">Adjusted insulin regimen and morning cardiac telemetry review highly suggested to mitigate immediate risks.</p>
              </div>
            </div>
          </div>
          <div className="glass-card border border-primary/10 rounded-xl p-md shadow-sm grid grid-cols-2 gap-md">
            <div className="p-md bg-surface-container-low rounded-lg border border-primary/5">
              <span className="font-label-sm text-label-sm text-secondary uppercase">Initial Prediction (Oct 12)</span>
              <div className="flex items-end gap-2 mt-2">
                <span className="font-headline-md text-headline-md text-primary">64%</span>
                <span className="font-label-md text-label-md text-secondary-fixed-dim pb-1">Moderate</span>
              </div>
            </div>
            <div className="p-md bg-surface-container-low rounded-lg border border-error/10">
              <div className="flex justify-between items-start">
                <span className="font-label-sm text-label-sm text-secondary uppercase">Latest Reassessment (Now)</span>
                <span className="text-error material-symbols-outlined text-sm">trending_up</span>
              </div>
              <div className="flex items-end gap-2 mt-2">
                <span className="font-headline-md text-headline-md text-error">88%</span>
                <span className="font-label-md text-label-md text-secondary-fixed-dim pb-1">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
