import React from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { BookOpen, CreditCard, GraduationCap, Calendar, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Current Semester', value: '4th', icon: GraduationCap, color: 'blue' },
    { label: 'Enrolled Courses', value: '6', icon: BookOpen, color: 'emerald' },
    { label: 'Attendance', value: '92%', icon: Calendar, color: 'amber' },
    { label: 'Remaining Fee', value: 'Rs. 45,000', icon: CreditCard, color: 'rose' },
  ];

  const courses = [
    { id: 1, name: 'Anatomy II', code: 'ANA-201', progress: 75, status: 'In Progress' },
    { id: 2, name: 'Physiology II', code: 'PHY-202', progress: 60, status: 'In Progress' },
    { id: 3, name: 'Homeopathic Pharmacy', code: 'HOM-203', progress: 85, status: 'In Progress' },
    { id: 4, name: 'Materia Medica I', code: 'MAT-204', progress: 45, status: 'In Progress' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Welcome back, {user?.name}!</h1>
          <p className="text-slate-500">Here's what's happening with your studies today.</p>
        </div>
        <button 
          onClick={() => alert('Registration request sent! The administration will review your request.')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          Register for Next Semester <ArrowRight className="w-5 h-5" />
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
        {/* Course Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-outfit flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Course Progress
            </h3>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">{course.name}</p>
                      <p className="text-xs text-slate-500">{course.code}</p>
                    </div>
                    <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      className="h-full bg-blue-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity / Notifications */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-outfit flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-600" />
              Recent Updates
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Exam Schedule Posted', time: '2 hours ago', type: 'info' },
                { title: 'Fee Payment Confirmed', time: '1 day ago', type: 'success' },
                { title: 'New Assignment: Anatomy', time: '2 days ago', type: 'warning' },
              ].map((update, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`mt-1 p-1 rounded-full ${
                    update.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                    update.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{update.title}</p>
                    <p className="text-xs text-slate-500">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
