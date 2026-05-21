import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admissions from './pages/Admissions';
import Programs from './pages/Programs';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import DashboardRouter from './components/dashboard/DashboardRouter';

// Protected Route Wrapper to handle role-based redirects
const PortalGuard = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-black text-primary text-2xl uppercase animate-pulse">Loading Portal...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (user.role !== allowedRole) {
    // Redirect to their correct portal if they are logged in but on the wrong path
    return <Navigate to={`/portal/${user.role}`} />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="programs" element={<Programs />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
          </Route>
          
          {/* Secret Role-Specific Login Access */}
          <Route path="/portal/admin-access" element={<Login forcedRole="admin" />} />
          <Route path="/portal/faculty-access" element={<Login forcedRole="teacher" />} />
          <Route path="/portal/student-access" element={<Login forcedRole="student" />} />

          {/* New Role-Specific Portal Paths (Protected) */}
          <Route 
            path="/portal/admin/*" 
            element={<PortalGuard allowedRole="admin"><DashboardRouter /></PortalGuard>} 
          />
          <Route path="/portal/teacher/*" element={<PortalGuard allowedRole="teacher"><DashboardRouter /></PortalGuard>} />
          <Route path="/portal/student/*" element={<PortalGuard allowedRole="student"><DashboardRouter /></PortalGuard>} />

          {/* Legacy & Fallback Redirects */}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/dashboard/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
