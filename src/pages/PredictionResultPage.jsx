import { Link, useLocation } from 'react-router-dom';

export default function PredictionResultPage() {
  const location = useLocation();
  const { result, patient } = location.state || {
    result: { risk_level: 'High', probability: 0.88, recommendation: 'Daily Physical Consultation Required' },
    patient: { name: 'Marcus Thorne', patient_id: '88219-B' }
  };

  const getRiskColorClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'green': return 'text-success border-success/20 bg-success/10';
      case 'yellow': return 'text-warning border-warning/20 bg-warning/10';
      case 'red': return 'text-error border-error/20 bg-error/10';
      default: return 'text-primary border-primary/20 bg-primary/10';
    }
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'green': return '#4CAF50';
      case 'yellow': return '#FFC107';
      case 'red': return '#F44336';
      default: return '#2196F3';
    }
  };

  const dashOffset = 502.4 - (502.4 * result.probability);

  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Analysis for {patient.name}</h1>
          <p className="text-on-surface-variant font-body-md">Patient ID: {patient.patient_id} | Admitted: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-sm flex-wrap">
          <button className="px-md py-2 border border-primary text-primary rounded-lg font-label-md flex items-center gap-2 hover:bg-primary/5 transition-all">
            <span className="material-symbols-outlined text-sm">share</span>
            Export PDF
          </button>
          <Link
            to="/monitoring"
            state={{ patient }}
            className="px-md py-2 bg-primary text-white rounded-lg font-label-md flex items-center gap-2 shadow-sm hover:opacity-90 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            Start Monitoring
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-md">
        <div className="col-span-12 md:col-span-4 glass-card border border-primary/10 rounded-xl p-md flex flex-col items-center justify-center text-center space-y-md shadow-sm">
          <h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest self-start">Current Status</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12" />
              <circle
                style={{ color: getRiskColor(result.risk_level), strokeDashoffset: dashOffset }}
                cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeLinecap="round" strokeWidth="12" strokeDasharray="502.4"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-headline-lg text-headline-lg`} style={{ color: getRiskColor(result.risk_level) }}>
                {Math.round(result.probability * 100)}%
              </span>
              <span className="font-label-sm text-label-sm text-secondary">Risk Score</span>
            </div>
          </div>
          <div className={`${getRiskColorClass(result.risk_level)} px-xl py-3 rounded-xl flex items-center gap-3 border`}>
            <span className="material-symbols-outlined">
              {result.risk_level === 'Red' ? 'warning' : (result.risk_level === 'Yellow' ? 'info' : 'check_circle')}
            </span>
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight">{result.risk_level} Risk</span>
          </div>
          <p className="text-on-surface-variant font-body-md px-md">
            {result.risk_level === 'Red' ? 'Probable readmission within 30 days. Immediate attention required.' :
             result.risk_level === 'Yellow' ? 'Moderate risk detected. Regular monitoring suggested.' :
             'Low risk of readmission. Stable condition.'}
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
                <p className="text-on-surface font-body-lg font-bold">{result.recommendation}</p>
                <p className="text-on-surface-variant font-body-md mt-2">The AI model analyzed clinical indicators including history, medications, and glycemic markers to generate this recommendation.</p>
              </div>
            </div>
          </div>

          <div className="glass-card border border-primary/10 rounded-xl p-md shadow-sm">
             <h3 className="font-headline-sm text-headline-sm mb-4">Input Data Summary</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-sm">
                  <span className="text-secondary block">Age</span>
                  <span className="font-bold">{patient.age}</span>
                </div>
                <div className="text-sm">
                  <span className="text-secondary block">Insulin</span>
                  <span className="font-bold">{patient.insulin}</span>
                </div>
                <div className="text-sm">
                  <span className="text-secondary block">A1C Result</span>
                  <span className="font-bold">{patient.A1Cresult}</span>
                </div>
                <div className="text-sm">
                  <span className="text-secondary block">Meds Count</span>
                  <span className="font-bold">{patient.num_medications}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
