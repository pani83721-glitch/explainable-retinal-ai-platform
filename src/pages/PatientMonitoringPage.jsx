import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PatientMonitoringPage() {
  const location = useLocation();
  const patient = location.state?.patient || { name: 'Demo Patient', patient_id: 'DEMO-123' };

  const [report, setReport] = useState({
    patient_id: patient.patient_id,
    sugar_level: 120,
    fatigue_level: 5,
    medicine_taken: true,
    dizziness: false,
    symptoms: '',
    condition_description: ''
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/daily-report/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
      const data = await response.json();
      setStatus(data);
      if (data.alerts_triggered > 0) {
        alert("Alert triggered! The system detected worsening trends and has updated your risk assessment.");
      } else {
        alert("Report submitted successfully. Your condition appears stable.");
      }
    } catch (error) {
      console.error("Failed to submit report", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Daily Health Monitoring</h1>
          <p className="text-body-lg text-secondary">Submit your daily health vitals for continuous safety tracking.</p>
        </div>
        <div className="flex gap-sm">
          <Link to="/alerts" className="px-md py-2 bg-white border border-primary/20 text-primary rounded-lg font-label-md hover:bg-primary/5 transition-all">
            View My Alerts
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Report Form */}
        <div className="col-span-12 md:col-span-7">
          <form onSubmit={handleSubmit} className="glass-card p-gutter rounded-xl shadow-sm space-y-6">
            <h2 className="font-headline-sm text-headline-sm text-primary border-b pb-2">Submit Daily Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary">Sugar Level (mg/dL)</label>
                <input
                  type="number"
                  value={report.sugar_level}
                  onChange={(e) => setReport({...report, sugar_level: parseFloat(e.target.value)})}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary">Fatigue Level (1-10)</label>
                <input
                  type="range" min="1" max="10"
                  value={report.fatigue_level}
                  onChange={(e) => setReport({...report, fatigue_level: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-secondary">
                  <span>Low</span>
                  <span>Current: {report.fatigue_level}</span>
                  <span>Extreme</span>
                </div>
              </div>
            </div>

            <div className="flex gap-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={report.medicine_taken}
                  onChange={(e) => setReport({...report, medicine_taken: e.target.checked})}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-sm font-medium text-secondary">Medicine Taken</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={report.dizziness}
                  onChange={(e) => setReport({...report, dizziness: e.target.checked})}
                  className="w-5 h-5 accent-error"
                />
                <span className="text-sm font-medium text-secondary">Dizziness / Fainting</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">Specific Symptoms</label>
              <textarea
                value={report.symptoms}
                onChange={(e) => setReport({...report, symptoms: e.target.value})}
                placeholder="e.g., headache, blurry vision..."
                className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 h-24"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl font-headline-sm hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Daily Vitals"}
            </button>
          </form>
        </div>

        {/* Status/Logic Explanation */}
        <div className="col-span-12 md:col-span-5 space-y-md">
          <div className="glass-card p-md rounded-xl border-l-4 border-l-primary shadow-sm">
            <h3 className="font-label-md text-label-md text-primary uppercase mb-2">How Monitoring Works</h3>
            <p className="text-body-md text-secondary">
              Our rule-based safety layer analyzes your daily inputs for:
            </p>
            <ul className="mt-2 space-y-2 text-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                Sudden glucose spikes
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                Medication non-compliance
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                Combinations of symptoms (e.g., dizziness + high sugar)
              </li>
            </ul>
          </div>

          <div className="glass-card p-md rounded-xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-3xl">shield_moon</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-primary">Continuous Protection</h4>
            <p className="text-secondary font-body-md">
              Even if your initial discharge prediction was "Low Risk", this layer continuously monitors your health to detect any worsening trends early.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
