import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { 
  LayoutDashboard, 
  UserCircle, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut,
  Users,
  GraduationCap,
  Menu,
  X,
  Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = {
    student: [
      { icon: LayoutDashboard, label: 'Overview', path: '/portal/student' },
      { icon: BookOpen, label: 'My Courses', path: '/portal/student/courses' },
      { icon: Calendar, label: 'Schedule', path: '/portal/student/schedule' },
      { icon: CreditCard, label: 'Fee Status', path: '/portal/student/fees' },
      { icon: Cloud, label: 'File Center', path: '/portal/student/files' },
      { icon: UserCircle, label: 'Profile', path: '/portal/student/profile' },
    ],
    teacher: [
      { icon: LayoutDashboard, label: 'Overview', path: '/portal/teacher' },
      { icon: Users, label: 'My Classes', path: '/portal/teacher/classes' },
      { icon: Calendar, label: 'Schedule', path: '/portal/teacher/schedule' },
      { icon: Cloud, label: 'File Center', path: '/portal/teacher/files' },
      { icon: UserCircle, label: 'Profile', path: '/portal/teacher/profile' },
    ],
    admin: [
      { icon: LayoutDashboard, label: 'Overview', path: '/portal/admin' },
      { icon: GraduationCap, label: 'Students', path: '/portal/admin/students' },
      { icon: Users, label: 'Teachers', path: '/portal/admin/teachers' },
      { icon: Cloud, label: 'File Center', path: '/portal/admin/files' },
      { icon: Settings, label: 'Settings', path: '/portal/admin/settings' },
      { icon: UserCircle, label: 'Profile', path: '/portal/admin/profile' },
    ],
  };

  const currentMenu = menuItems[user.role];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className={`font-bold text-xl font-outfit ${!isSidebarOpen && 'hidden'}`}>
            FHMC <span className="text-blue-400">Portal</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {currentMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40">
          <h2 className="text-xl font-bold text-slate-800 font-outfit">
            {currentMenu.find(m => m.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role}</p>
            </div>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full border-2 border-blue-100"
            />
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
