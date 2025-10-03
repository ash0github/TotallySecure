import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Transactions from './pages/Transactions';
import FinalTransactions from './pages/FinalTransactions';
import TransactionHistory from "./pages/TransactionHistory";


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

    </Routes>
  );
}

export default App;
