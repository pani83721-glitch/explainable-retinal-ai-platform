import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PatientHistoryPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patientId = searchParams.get('id') || '88219-B'; // Default for demo

  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/patient/${patientId}/history`)
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch history", err);
        setLoading(false);
      });
  }, [patientId]);

  if (loading) return <div className="p-10 text-center text-secondary">Loading patient history...</div>;
  if (!history || !history.patient) return <div className="p-10 text-center text-error">Patient not found.</div>;

  const { patient, predictions, reports } = history;
  const latestPrediction = predictions[predictions.length - 1];

  return (
    <div className="space-y-lg">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Patient History: {patient.name}</h1>
          <p className="font-label-sm text-label-sm text-secondary">Longitudinal health tracking and risk assessments</p>
        </div>
        <div className="flex gap-2">
          <Link to="/alerts" className="px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all">Back to Alerts</Link>
          <button className="px-md py-2 bg-primary text-white rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-transform">Download Report</button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Risk Timeline */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-md">
          <div className="flex justify-between items-center mb-md">
            <h2 className="font-headline-sm text-headline-sm">Risk Transition History</h2>
          </div>
          <div className="h-64 relative flex items-end justify-start gap-4 px-4 pb-8 border-b border-outline-variant overflow-x-auto">
            {predictions.length > 0 ? predictions.map((pred, index) => (
              <div key={index} className="flex flex-col items-center min-w-[60px]">
                <div
                  className="w-8 rounded-t transition-all duration-500"
                  style={{
                    height: `${pred.risk_score * 100}%`,
                    backgroundColor: pred.risk_level === 'Red' ? '#ef4444' : (pred.risk_level === 'Yellow' ? '#f59e0b' : '#10b981')
                  }}
                />
                <span className="text-[10px] text-secondary mt-2 rotate-45 origin-left">
                  {new Date(pred.created_at).toLocaleDateString()}
                </span>
              </div>
            )) : (
              <div className="w-full text-center py-10 text-secondary">No predictions recorded yet.</div>
            )}
          </div>
          <div className="mt-8">
             <h3 className="font-label-md text-label-md font-bold mb-4">Daily Monitoring Logs</h3>
             <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {reports.map((report, idx) => (
                  <div key={idx} className="flex justify-between text-sm p-3 bg-surface-container-low rounded-lg">
                    <span>{new Date(report.created_at).toLocaleString()}</span>
                    <span className="font-bold">Sugar: {report.sugar_level} mg/dL</span>
                    <span className={report.medicine_taken ? "text-success" : "text-error"}>
                      Meds: {report.medicine_taken ? "Taken" : "Missed"}
                    </span>
                  </div>
                ))}
                {reports.length === 0 && <p className="text-secondary text-center italic">No daily reports submitted.</p>}
             </div>
          </div>
        </div>

        {/* Patient Profile Card */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-md flex flex-col">
          <div className="flex items-center gap-4 mb-md">
            <div className="w-16 h-16 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]">person</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm">{patient.name}</p>
              <span className={`inline-flex items-center gap-1 text-label-sm px-2 py-0.5 rounded-full font-bold ${latestPrediction?.risk_level === 'Red' ? 'text-error bg-error/10' : 'text-success bg-success/10'}`}>
                {latestPrediction?.risk_level || 'UNKNOWN'} RISK
              </span>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center py-2 border-b border-primary/5">
              <span className="font-label-md text-secondary">Patient ID</span>
              <span className="font-label-md text-on-surface">{patient.patient_id}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-primary/5">
              <span className="font-label-md text-secondary">Age Group</span>
              <span className="font-label-md text-on-surface">{patient.age}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-primary/5">
              <span className="font-label-md text-secondary">Gender</span>
              <span className="font-label-md text-on-surface">{patient.gender}</span>
            </div>
            {latestPrediction && (
              <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xs font-bold text-primary uppercase mb-1">Latest Recommendation</p>
                <p className="text-sm italic">"{latestPrediction.recommendation}"</p>
              </div>
            )}
          </div>
          <button className="w-full mt-lg bg-primary text-white py-3 rounded-lg font-label-md hover:bg-primary-container transition-transform active:scale-95">
            Download Longitudinal Report
          </button>
        </div>
      </div>
    </div>
  );
}
