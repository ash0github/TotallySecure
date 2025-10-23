import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Transactions from './pages/Transactions';
import FinalTransactions from './pages/FinalTransactions';
import TransactionHistory from "./pages/TransactionHistory";
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import MFA from './pages/mfa';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/admin/adminDashboard';

function App() {
  return (
    <Routes>  
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mfa" element={<MFA />} />

      {/* Protected Routes */}
      <Route path="/userdashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/confirm-transfer" element={<ProtectedRoute><FinalTransactions /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/admindashboard" element={<AdminDashboard />} />

      {/* catch for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
