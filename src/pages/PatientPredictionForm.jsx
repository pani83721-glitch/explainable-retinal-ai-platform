import { useNavigate } from 'react-router-dom';

export default function PatientPredictionForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/results');
  };

  return (
    <div className="lg:flex gap-gutter">
      <div className="flex-1">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Patient Prediction Form</h1>
            <p className="font-body-lg text-body-lg text-secondary">Enter discharge data for automated readmission risk assessment.</p>
          </div>
          <div className="hidden sm:block">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Form Status: Incomplete</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8 pb-12">
          <section className="glass-card p-gutter rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/5">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-headline-sm text-headline-sm">Patient Demographics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Patient Name</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="Marcus Thorne" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Patient ID</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="88219-B" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Age</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="57" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Admission Date</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="Oct 12, 2024" />
              </div>
            </div>
          </section>

          <section className="glass-card p-gutter rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/5">
              <span className="material-symbols-outlined text-primary">monitor_heart</span>
              <h3 className="font-headline-sm text-headline-sm">Clinical Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">A1C</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="8.4%" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Insulin Status</label>
                <select className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3">
                  <option>Basal + Bolus</option>
                  <option>Oral Therapy</option>
                  <option>Insulin Pump</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Predicted Risk</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="High" />
              </div>
            </div>
          </section>

          <section className="glass-card p-gutter rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/5">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h3 className="font-headline-sm text-headline-sm">Risk Indicators</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">BMI</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="29.1" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Readmission Window</label>
                <input className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="30 days" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-sm">
            <button type="submit" className="bg-primary text-white px-xl py-md rounded-lg font-headline-sm text-headline-sm hover:shadow-lg transition-all scale-95 active:scale-90">
              Submit Prediction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
