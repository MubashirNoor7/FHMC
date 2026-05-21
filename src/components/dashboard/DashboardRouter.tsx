import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import StudentDashboard from '../../pages/dashboard/StudentDashboard';
import TeacherDashboard from '../../pages/dashboard/TeacherDashboard';
import AdminDashboard from '../../pages/dashboard/AdminDashboard';
import DashboardLayout from './DashboardLayout';
import { motion } from 'motion/react';
import { Book, CreditCard, User, Settings, GraduationCap, Users as UsersIcon, Calendar, Clock } from 'lucide-react';

// Sub-route components
const Courses = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Academic Courses</h2>
        <p className="text-slate-500 font-medium">Manage and view your active curriculum.</p>
      </div>
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner"><Book size={28} /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { name: 'Anatomy II', code: 'ANA-201', instructor: 'Dr. Ahmad Khan', credits: 4, progress: 65 },
        { name: 'Physiology II', code: 'PHY-202', instructor: 'Dr. Sara Ali', credits: 4, progress: 40 },
        { name: 'Homeopathic Pharmacy', code: 'HOM-203', instructor: 'Dr. Usman Zafar', credits: 3, progress: 85 },
        { name: 'Materia Medica I', code: 'MAT-204', instructor: 'Dr. Fatima Bibi', credits: 4, progress: 20 },
      ].map((course, i) => (
        <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-black text-xl text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tighter">{course.name}</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{course.code}</p>
            </div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-100">{course.credits} Credits</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600 font-medium tracking-tight">Instructor: <span className="text-slate-900 font-bold">{course.instructor}</span></p>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
            <button className="w-full mt-2 py-3 bg-slate-50 text-blue-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all">View Material</button>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Fees = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Fee Management</h2>
        <p className="text-slate-500 font-medium">Clear your dues and track transaction history.</p>
      </div>
      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner"><CreditCard size={28} /></div>
    </div>
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { desc: 'Semester 4 Tuition Fee', date: 'March 15, 2026', amount: 'Rs. 45,000', status: 'Pending' },
            { desc: 'Library Security Deposit', date: 'Feb 10, 2026', amount: 'Rs. 5,000', status: 'Paid' },
            { desc: 'Semester 3 Exam Fee', date: 'Jan 05, 2026', amount: 'Rs. 3,500', status: 'Paid' },
          ].map((item, i) => (
            <tr key={i} className="hover:bg-slate-50/30 transition-all font-medium">
              <td className="px-8 py-6 text-slate-900 font-bold">{item.desc}</td>
              <td className="px-8 py-6 text-sm text-slate-500">{item.date}</td>
              <td className="px-8 py-6 text-slate-900 font-black">{item.amount}</td>
              <td className="px-8 py-6">
                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${
                  item.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const ManagementView = ({ title, icon: Icon, description }: { title: string, icon: any, description: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner"><Icon size={40} /></div>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">{title}</h2>
      <p className="text-slate-500 max-w-sm font-medium">{description}</p>
      <div className="mt-10 grid grid-cols-2 gap-4 w-full max-w-md">
        <button className="py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">Export Data</button>
        <button className="py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">Configure</button>
      </div>
    </div>
  </motion.div>
);

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = React.useState(user?.name || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const [avatar, setAvatar] = React.useState(user?.avatar || '');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ name, email, avatar });
    alert('Profile updated successfully!');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase">Edit Account</h2>
        <form onSubmit={handleSave} className="space-y-8">
          <div className="flex items-center gap-10 mb-10">
            <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-[2rem] border-8 border-slate-50 shadow-inner object-cover" />
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Photo URL</label>
              <input 
                type="text" 
                value={avatar} 
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                disabled
                type="email" 
                value={email} 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all">
            Update Profile
          </button>
        </form>
      </div>
    </motion.div>
  );
};

import FileCenter from './FileCenter';

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const portalPath = `/portal/${user.role}`;

  return (
    <DashboardLayout>
      <Routes>
        <Route index element={
          user.role === 'student' ? <StudentDashboard /> :
          user.role === 'teacher' ? <TeacherDashboard /> :
          <AdminDashboard />
        } />
        
        {user.role === 'student' && (
          <>
            <Route path="courses" element={<Courses />} />
            <Route path="schedule" element={<ManagementView title="Class Schedule" icon={Calendar} description="Access your real-time lecture times and classroom locations." />} />
            <Route path="fees" element={<Fees />} />
            <Route path="files" element={<FileCenter />} />
          </>
        )}

        {user.role === 'teacher' && (
          <>
            <Route path="classes" element={<ManagementView title="My Classes" icon={GraduationCap} description="Manage students, attendance, and exam results for your subjects." />} />
            <Route path="schedule" element={<ManagementView title="Teaching Schedule" icon={Clock} description="Your weekly teaching timetable and upcoming seminar sessions." />} />
            <Route path="files" element={<FileCenter />} />
          </>
        )}

        {user.role === 'admin' && (
          <>
            <Route path="students" element={<ManagementView title="Student Database" icon={UsersIcon} description="Access the full registry of enrolled students across all departments." />} />
            <Route path="teachers" element={<ManagementView title="Faculty Portal" icon={GraduationCap} description="Manage teacher contracts, qualifications, and department assignments." />} />
            <Route path="settings" element={<ManagementView title="Core Settings" icon={Settings} description="Configure system performance, database backups, and security protocols." />} />
            <Route path="files" element={<FileCenter />} />
          </>
        )}

        <Route path="profile" element={<Profile />} />
        {/* Redirect to correct portal if unknown path */}
        <Route path="*" element={<Navigate to={portalPath} />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRouter;

