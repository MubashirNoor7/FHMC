import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { Users, Calendar, BookOpen, Clock, CheckCircle2, MoreVertical, X, Plus, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', subject: '', schedule_time: '', room: '' });

  const fetchTeacherData = async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await supabase
          .from('classes')
          .select('*')
          .eq('teacher_id', user.id); // In real app, only show their classes
        
        if (data) setClasses(data);
      }
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, [user]);

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('classes')
        .insert([{
          ...newClass,
          teacher_id: user?.id
        }]);

      if (error) throw error;
      setIsAddModalOpen(false);
      setNewClass({ name: '', subject: '', schedule_time: '', room: '' });
      fetchTeacherData();
    } catch (err) {
      alert('Error adding class. Please try again.');
    }
  };

  const stats = [
    { label: 'Total Students', value: '145', icon: Users, color: 'blue' },
    { label: 'Active Classes', value: classes.length.toString(), icon: BookOpen, color: 'emerald' },
    { label: 'Hours This Week', value: '18h', icon: Clock, color: 'amber' },
    { label: 'Assignments Pending', value: '12', icon: CheckCircle2, color: 'rose' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Welcome back, Prof. {user?.name}!</h1>
          <p className="text-slate-500">You have {classes.length} classes management today.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
        >
          <Plus size={20} /> Add New Class
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-outfit flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Live Teaching Schedule
              </h3>
              <button className="text-blue-600 text-sm font-bold hover:underline">View Full Calendar</button>
            </div>
            <div className="space-y-4">
              {classes.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No classes scheduled yet.</p>
                </div>
              ) : (
                classes.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-5 rounded-2xl border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group shadow-sm">
                    <div className="text-center min-w-[80px]">
                      <p className="text-sm font-bold text-blue-600 uppercase tracking-tighter">{item.schedule_time || 'TBD'}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-slate-900">{item.subject}</p>
                      <p className="text-sm text-slate-500 font-medium">{item.name} • Room {item.room}</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-xl">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions / Classes */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-outfit">My Classes</h3>
            <div className="space-y-4">
              {['BHMS 2nd Year', 'BHMS 4th Year', 'DHMS 1st Year', 'DHMS 3rd Year'].map((cls, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all group">
                  <span className="font-bold text-slate-700">{cls}</span>
                  <button onClick={() => alert('Opening Management Panel for ' + cls)} className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">Manage</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Class Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Add New Class</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
                </div>
                <form onSubmit={handleAddClass} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Class / Year</label>
                    <input 
                      required
                      type="text" 
                      value={newClass.name}
                      onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                      placeholder="e.g. BHMS 3rd Year" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject Name</label>
                    <input 
                      required
                      type="text" 
                      value={newClass.subject}
                      onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                      placeholder="e.g. Materia Medica" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Time</label>
                      <input 
                        required
                        type="text" 
                        value={newClass.schedule_time}
                        onChange={(e) => setNewClass({...newClass, schedule_time: e.target.value})}
                        placeholder="09:00 AM" 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Room</label>
                      <input 
                        required
                        type="text" 
                        value={newClass.room}
                        onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                        placeholder="Hall A" 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" 
                      />
                    </div>
                  </div>
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
                  >
                    {loading ? 'Adding...' : 'Save Class'} <Plus size={24} />
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

export default TeacherDashboard;

