import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import BookingKiosk from './pages/BookingKiosk';

import UsersManagement from './pages/UsersManagement';
import CompaniesList from './pages/Companies/CompaniesList';
import GroupsList from './pages/Groups/GroupsList';
import BranchesList from './pages/Branches/BranchesList';
import MembersList from './pages/Members/MembersList';
import EndUsersList from './pages/EndUsers/EndUsersList';

import CompaniesList from './pages/Companies/CompaniesList';
import GroupsList from './pages/Groups/GroupsList';
import BranchesList from './pages/Branches/BranchesList';
import MembersList from './pages/Members/MembersList';
import EndUsersList from './pages/EndUsers/EndUsersList';
import PlansList from './pages/Plans/PlansList';

import DevicesList from './pages/Devices/DevicesList';



function App() {
  // محاكاة حالة المصادقة (سنربطها بالباكند لاحقاً)
  const isAuthenticated = true; // غيّر إلى false لتجربة صفحة تسجيل الدخول

  return (
    <BrowserRouter>
      <Routes>
        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<Login />} />
        
        {/* داشبورد الإدارة (محمي) */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        
        {/* شاشة العميل (كيوسك) - عامة */}
        <Route path="/kiosk" element={<BookingKiosk />} />

        <Route path="/users-management" element={<UsersManagement />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/groups" element={<GroupsList />} />
        <Route path="/branches" element={<BranchesList />} />
        <Route path="/members" element={<MembersList />} />
        <Route path="/end-users" element={<EndUsersList />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/groups" element={<GroupsList />} />
        <Route path="/branches" element={<BranchesList />} />
        <Route path="/members" element={<MembersList />} />
        <Route path="/end-users" element={<EndUsersList />} />
        <Route path="/plans" element={<PlansList />} />
        <Route path="/devices" element={<DevicesList />} />

        {/* إعادة التوجيه الافتراضية */}
        <Route path="/" element={<Navigate to="/kiosk" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;