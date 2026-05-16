import { useState } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PatientPredictionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    patient_id: '',
    age: '[50-60)',
    gender: 'Female',
    time_in_hospital: 3,
    num_lab_procedures: 40,
    num_procedures: 1,
    num_medications: 15,
    number_outpatient: 0,
    number_emergency: 0,
    number_inpatient: 1,
    diag_1: '250',
    number_diagnoses: 5,
    max_glu_serum: 'None',
    A1Cresult: 'None',
    metformin: 'No',
    insulin: 'No',
    change: 'No',
    diabetesMed: 'Yes'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // 1. Create/Check Patient
      await fetch('http://localhost:8000/patients/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          patient_id: formData.patient_id
        }),
      });

      // 2. Get Prediction
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: formData.patient_id,
          features: formData
        }),
      });
      const result = await response.json();

      // Navigate to results with data
      navigate('/results', { state: { result, patient: formData } });
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to connect to backend. Please ensure the server is running.");
    } finally {
      setLoading(false);
    }
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
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
              {loading ? "Processing..." : "Form Status: Ready"}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8 pb-12">
          {/* Patient Demographics */}
          <section className="glass-card p-gutter rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/5">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-headline-sm text-headline-sm">Patient Demographics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Patient Name</label>
                <input
                  name="name" required
                  value={formData.name} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="Marcus Thorne"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Patient ID</label>
                <input
                  name="patient_id" required
                  value={formData.patient_id} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" placeholder="88219-B"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Age Range</label>
                <select
                  name="age" value={formData.age} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3"
                >
                  <option>[50-60)</option>
                  <option>[60-70)</option>
                  <option>[70-80)</option>
                  <option>[80-90)</option>
                  <option>[90-100)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Gender</label>
                <select
                  name="gender" value={formData.gender} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3"
                >
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
            </div>
          </section>

          {/* Hospitalization Details */}
          <section className="glass-card p-gutter rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/5">
              <span className="material-symbols-outlined text-primary">hospital</span>
              <h3 className="font-headline-sm text-headline-sm">Hospitalization Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Time in Hospital (days)</label>
                <input type="number" name="time_in_hospital" value={formData.time_in_hospital} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Previous Inpatient Visits</label>
                <input type="number" name="number_inpatient" value={formData.number_inpatient} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Num Medications</label>
                <input type="number" name="num_medications" value={formData.num_medications} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3" />
              </div>
            </div>
          </section>

          {/* Clinical Results */}
          <section className="glass-card p-gutter rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/5">
              <span className="material-symbols-outlined text-primary">monitor_heart</span>
              <h3 className="font-headline-sm text-headline-sm">Clinical Indicators</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">A1C Result</label>
                <select name="A1Cresult" value={formData.A1Cresult} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3">
                  <option>None</option>
                  <option>Norm</option>
                  <option>&gt;7</option>
                  <option>&gt;8</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Insulin</label>
                <select name="insulin" value={formData.insulin} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3">
                  <option>No</option>
                  <option>Steady</option>
                  <option>Up</option>
                  <option>Down</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-secondary">Medication Change</label>
                <select name="change" value={formData.change} onChange={handleChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3">
                  <option value="No">No Change</option>
                  <option value="Ch">Changed</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-sm">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-xl py-md rounded-lg font-headline-sm text-headline-sm hover:shadow-lg transition-all scale-95 active:scale-90 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Submit for Discharge Prediction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
