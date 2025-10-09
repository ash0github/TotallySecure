import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Transactions from './pages/Transactions';
import FinalTransactions from './pages/FinalTransactions';
import TransactionHistory from "./pages/TransactionHistory";

import Profile from './pages/Profile';
import MFA from './pages/mfa';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/confirm-transfer" element={<FinalTransactions />} />
      <Route path="/history" element={<TransactionHistory />} />
      <Route path="/notifications" element={<Notifications />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/mfa" element={<MFA />} />

      {/* catch for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
