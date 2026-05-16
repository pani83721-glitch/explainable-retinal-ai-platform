export default function SettingsPage() {
  return (
    <div className="space-y-lg">
      <div className="flex flex-col gap-4">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Settings</h1>
        <p className="text-body-lg text-secondary">Manage display preferences, notifications, and account settings for your HealthAI Monitor experience.</p>
      </div>
      <div className="glass-card p-md rounded-xl shadow-sm">
        <h2 className="font-headline-sm text-headline-sm mb-4">Application Settings</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-secondary">Notification Preferences</label>
            <select className="rounded-xl border border-primary/10 bg-white px-4 py-3 w-full">
              <option>All alerts</option>
              <option>Only critical</option>
              <option>None</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-secondary">Theme</label>
            <select className="rounded-xl border border-primary/10 bg-white px-4 py-3 w-full">
              <option>System default</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-secondary">Data Export Format</label>
            <select className="rounded-xl border border-primary/10 bg-white px-4 py-3 w-full">
              <option>PDF</option>
              <option>CSV</option>
              <option>JSON</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
