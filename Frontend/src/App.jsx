import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import MFA from './pages/mfa';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mfa" element={<MFA />} />
    </Routes>
  );
}

export default App;
