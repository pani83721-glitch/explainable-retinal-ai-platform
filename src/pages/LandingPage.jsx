import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-mesh font-body-md text-on-background min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between px-margin-desktop w-full h-16 bg-white/70 backdrop-blur-md shadow-sm border-b border-primary/10">
        <div className="flex items-center gap-2">
          <span className="font-headline-md text-headline-md font-bold text-primary">HealthAI Monitor</span>
        </div>
        <nav className="hidden xl:flex items-center gap-6">
          <Link className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md" to="/dashboard">Dashboard</Link>
          <Link className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md" to="/prediction">Prediction Form</Link>
          <Link className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md" to="/results">Prediction Results</Link>
          <Link className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md" to="/monitoring">Patient Monitoring</Link>
          <Link className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md" to="/alerts">Alerts & Notifications</Link>
          <Link className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md" to="/history">Patient History</Link>
        </nav>
        <div className="flex items-center gap-4 text-primary">
          <button className="material-symbols-outlined p-2 scale-95 active:scale-90 transition-transform">notifications</button>
          <button className="material-symbols-outlined p-2 scale-95 active:scale-90 transition-transform">account_circle</button>
        </div>
      </header>
      <main className="flex-grow">
        <section className="px-margin-desktop py-xl md:py-32 grid lg:grid-cols-2 gap-md items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-md">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Next-Gen Clinical AI</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg mb-md text-on-surface">
              AI Readmission Prediction + Intelligent Patient Monitoring System
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg leading-relaxed">
              Harness the power of predictive analytics to reduce hospital readmissions by up to 30%. Our glassmorphic dashboard provides real-time clinical insights and automated risk stratification for every patient.
            </p>
            <div className="flex flex-wrap gap-md">
              <Link to="/prediction" className="bg-primary text-white px-xl py-md rounded-lg font-headline-sm text-headline-sm hover:shadow-lg transition-all scale-95 active:scale-90 inline-block text-center">Start Prediction</Link>
              <Link to="/dashboard" className="border border-primary text-primary px-xl py-md rounded-lg font-headline-sm text-headline-sm hover:bg-primary/5 transition-all inline-block text-center">Open Dashboard</Link>
            </div>
          </div>
          <div className="relative lg:h-[500px] mt-xl lg:mt-0 flex items-center justify-center">
            <div className="glass-panel w-full h-[400px] rounded-xl shadow-xl overflow-hidden relative p-md">
              <div className="flex items-center justify-between mb-md">
                <div className="h-4 w-32 bg-primary/20 rounded-full" />
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-error" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <div className="glass-panel p-md rounded-lg border-primary/5">
                  <div className="flex items-center gap-2 mb-xs">
                    <span className="material-symbols-outlined text-primary">monitor_heart</span>
                    <span className="font-label-sm text-label-sm text-primary">Vitals Stream</span>
                  </div>
                  <div className="h-16 w-full bg-primary/10 rounded flex items-end p-xs gap-1">
                    <div className="w-2 bg-primary/40 h-8 rounded-t-sm" />
                    <div className="w-2 bg-primary/40 h-12 rounded-t-sm" />
                    <div className="w-2 bg-primary/40 h-6 rounded-t-sm" />
                    <div className="w-2 bg-primary/40 h-10 rounded-t-sm" />
                    <div className="w-2 bg-primary/40 h-14 rounded-t-sm" />
                  </div>
                </div>
                <div className="glass-panel p-md rounded-lg border-primary/5">
                  <span className="font-label-sm text-label-sm text-secondary block mb-xs">Risk Index</span>
                  <span className="font-headline-md text-headline-md text-error">84%</span>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full mt-2">
                    <div className="h-full bg-error w-[84%] rounded-full" />
                  </div>
                </div>
                <div className="col-span-2 glass-panel p-md rounded-lg border-primary/5 flex items-center gap-md">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">patient_list</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md font-bold">Active Patients</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">12 High Priority Alerts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10 hidden md:block">
              <img className="w-full h-full object-cover" alt="A modern healthcare dashboard on a tablet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6G8bTrl7uiQEG6enb8owK4vL0fuc_cjwYCPOAZ9MRyDzeuxIQOayucjt5lX0KgBbZHZz_s-7Z4ADxSKK4Wxg-w1Th9ABrQN6ryfBpTBwa2xdzIvPJDGcWCcACIbbVieDrErdEsXX2fkGQiyzmwg_hxuBPPD0Ne4lKSdKbM_1yGWxrJxDZr5n7ayJDcYnENKQTxPld9O0wznktOM-EuNvJZ_JlCFJnBt7bjD_RfKTN0Bt9ur_kS5wyUuiJpFm2c0qHr1o2ceRPAkSh" />
            </div>
          </div>
        </section>
        <section className="px-margin-desktop py-lg bg-surface-container-low/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="text-center p-md">
              <p className="font-headline-lg text-headline-lg text-primary">12k+</p>
              <p className="font-label-md text-label-md text-on-surface-variant">Patients Monitored</p>
            </div>
            <div className="text-center p-md">
              <p className="font-headline-lg text-headline-lg text-primary">94.2%</p>
              <p className="font-label-md text-label-md text-on-surface-variant">Prediction Accuracy</p>
            </div>
            <div className="text-center p-md">
              <p className="font-headline-lg text-headline-lg text-primary">30%</p>
              <p className="font-label-md text-label-md text-on-surface-variant">Readmission Reduction</p>
            </div>
            <div className="text-center p-md">
              <p className="font-headline-lg text-headline-lg text-primary">HIPAA</p>
              <p className="font-label-md text-label-md text-on-surface-variant">Secure Compliant</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
