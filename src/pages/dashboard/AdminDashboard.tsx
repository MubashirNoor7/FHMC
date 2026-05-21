import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { Users, GraduationCap, ShieldCheck, TrendingUp, Search, Plus, MoreHorizontal, UserPlus, Clock, X, Mail, Shield, CheckCircle2, AlertCircle, Trash2, FileText, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'applications'>('users');
  const [counts, setCounts] = useState({
    students: '0',
    applications: '0',
    faculty: '0',
  });
  const [profiles, setProfiles] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' as 'student'|'teacher'|'admin' });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Applications
      const { data: appList, error: appError } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (appError) {
        console.error('DATABASE ERROR (Applications):', appError.message, appError.details);
      } else {
        console.log('SUCCESS: Fetched', appList?.length || 0, 'applications.');
        setApplications(appList || []);
      }

      // Fetch Users/Profiles
      const { data: profileList, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profError) {
        console.error('Error fetching profiles:', profError);
      } else {
        setProfiles(profileList || []);
        const sCount = profileList.filter(p => p.role === 'student').length;
        const fCount = profileList.filter(p => p.role === 'teacher').length;
        setCounts({
          students: sCount.toString(),
          applications: (appList?.length || 0).toString(),
          faculty: fCount.toString(),
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInviteUser = async (email: string, name: string, role: string) => {
    try {
      // Switch to signInWithOtp which CREATES the user if they don't exist
      // and sends a professional 'Magic Link' to their email.
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/login?invite=true`,
        },
      });

      if (error) throw error;
      alert(`Professional Invitation sent to ${email}! They will receive a secure login link in their Gmail.`);
    } catch (err: any) {
      alert('Invite Error: ' + err.message);
    }
  };

  const deleteApplication = async (id: number) => {
    if (!window.confirm('Are you sure you want to permanently delete this application?')) return;
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Delete Error: ' + err.message);
    }
  };

  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error('Update Error:', err);
      alert('Error updating application.');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add to profile table first
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: crypto.randomUUID(), 
          ...newUser,
          status: 'Pending'
        }]);

      if (error) throw error;
      
      // Send the invitation email immediately
      await handleInviteUser(newUser.email, newUser.name, newUser.role);
      
      setIsAddModalOpen(false);
      setNewUser({ name: '', email: '', role: 'student' });
      fetchData();
    } catch (err: any) {
      alert('Error adding user: ' + err.message);
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Students', value: counts.students, icon: GraduationCap, color: 'blue', trend: '+12%' },
    { label: 'New Applications', value: counts.applications, icon: FileText, color: 'rose', trend: 'Live' },
    { label: 'Total Faculty', value: counts.faculty, icon: Users, color: 'emerald', trend: '+2' },
    { label: 'Security Status', value: 'Active', icon: ShieldCheck, color: 'amber', trend: 'Secure' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Command Center</h1>
          <p className="text-slate-500 font-medium">Managing FHMC Digital Infrastructure.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search directory..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 pl-11 pr-5 py-3 rounded-2xl outline-none focus:border-blue-500 transition-all shadow-sm w-64"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-black transition-all flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
          >
            <UserPlus className="w-5 h-5" /> Invite User
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                {stat.trend}
              </span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-10">
            <button 
              onClick={() => setActiveTab('users')}
              className={`pb-6 -mb-6 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'users' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              System Users
              {activeTab === 'users' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`pb-6 -mb-6 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'applications' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Student Applications
              {activeTab === 'applications' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
              {applications.filter(a => a.status === 'Pending').length > 0 && (
                <span className="ml-2 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {applications.filter(a => a.status === 'Pending').length}
                </span>
              )}
            </button>
          </div>
          <button onClick={fetchData} className="p-2 text-slate-400 hover:text-primary transition-all self-center">
            <Clock className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            {activeTab === 'users' ? (
              <>
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-10 py-5">Verified User</th>
                    <th className="px-10 py-5">Privilege</th>
                    <th className="px-10 py-5">Email Address</th>
                    <th className="px-10 py-5">Access Status</th>
                    <th className="px-10 py-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProfiles.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-all group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <img src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`} className="w-10 h-10 rounded-xl" alt="P" />
                          <span className="font-bold text-slate-800">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${
                          u.role === 'admin' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                          u.role === 'teacher' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-sm font-medium text-slate-500">{u.email}</td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                          <span className="text-xs font-bold text-slate-700">{u.status || 'Active'}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleInviteUser(u.email, u.name, u.role)}
                            className="p-2 text-slate-400 hover:text-primary bg-slate-50 rounded-lg transition-all"
                            title="Resend Invite"
                          >
                            <Send size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <>
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-10 py-5">Applicant</th>
                    <th className="px-10 py-5">Program</th>
                    <th className="px-10 py-5">Information</th>
                    <th className="px-10 py-5">Status</th>
                    <th className="px-10 py-5">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-all">
                      <td className="px-10 py-6">
                        <p className="font-bold text-slate-800">{u.full_name}</p>
                        <p className="text-xs text-slate-400 font-medium">Applied {new Date(u.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg uppercase">{u.program}</span>
                      </td>
                      <td className="px-10 py-6 text-sm">
                        <div className="space-y-1">
                          <p className="font-medium text-slate-600 flex items-center gap-2"><Mail size={12} /> {u.email}</p>
                          <p className="font-medium text-slate-600 flex items-center gap-2"><TrendingUp size={12} /> {u.education}</p>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${
                          u.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                          u.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              updateApplicationStatus(u.id, 'Accepted');
                              handleInviteUser(u.email, u.full_name, 'student');
                            }}
                            className="p-2 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            title="Approve & Send Invitation"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => deleteApplication(u.id)}
                            className="p-2 text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                            title="Delete Permanently"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>

      {/* Invite/Add User Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Send Invitation</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all"><X /></button>
                </div>
                <form onSubmit={handleAddUser} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recipient Name</label>
                    <input 
                      required
                      type="text" 
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      placeholder="e.g. Professor Omar" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-bold text-slate-700 shadow-inner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                    <input 
                      required
                      type="email" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="name@gmail.com" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-bold text-slate-700 shadow-inner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Portal Access Level</label>
                    <select 
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-black text-slate-700 uppercase tracking-tighter appearance-none cursor-pointer"
                    >
                      <option value="student">Student Portal</option>
                      <option value="teacher">Faculty Portal</option>
                      <option value="admin">Admin Console</option>
                    </select>
                  </div>
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
                  >
                    {loading ? 'Sending...' : 'Send Secure Invite'} <Send size={24} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;


