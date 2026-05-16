import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdminDashboard from '../pages/AdminDashboard';
import PatientPredictionForm from '../pages/PatientPredictionForm';
import PredictionResultPage from '../pages/PredictionResultPage';
import PatientMonitoringPage from '../pages/PatientMonitoringPage';
import AlertsNotificationsPage from '../pages/AlertsNotificationsPage';
import PatientHistoryPage from '../pages/PatientHistoryPage';
import SettingsPage from '../pages/SettingsPage';
import DashboardLayout from '../layouts/DashboardLayout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/prediction" element={<PatientPredictionForm />} />
        <Route path="/results" element={<PredictionResultPage />} />
        <Route path="/monitoring" element={<PatientMonitoringPage />} />
        <Route path="/alerts" element={<AlertsNotificationsPage />} />
        <Route path="/history" element={<PatientHistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
