import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { UserRole } from '../types/auth';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, ShieldCheck, Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  forcedRole?: UserRole;
}

const Login: React.FC<LoginProps> = ({ forcedRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState<UserRole>(forcedRole || 'student');
  const [searchParams] = useSearchParams();
  const [isInviteFlow, setIsInviteFlow] = useState(false);
  
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If we have a forced role, ensure it's set
    if (forcedRole) setRole(forcedRole);

    // If user is already logged in, send them to their portal
    if (user) {
      navigate(`/portal/${user.role}`);
    }

    // Check for restoration hashes (Supabase Auth link)
    if (window.location.hash.includes('type=recovery') || window.location.hash.includes('type=invite')) {
      setIsInviteFlow(true);
    }
  }, [user, navigate, forcedRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isInviteFlow) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        alert('Password set successfully! You can now log in.');
        setIsInviteFlow(false);
        return;
      }

      await login(email, password);
    } catch (error: any) {
      console.error('Auth failed:', error);
      alert(error.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const portalInfo = {
    admin: { label: 'Admin Console', icon: ShieldCheck, color: 'slate', desc: 'Secure management portal for college administration.' },
    teacher: { label: 'Faculty Portal', icon: BookOpen, color: 'emerald', desc: 'Access class management, schedule and grading tools.' },
    student: { label: 'Student Portal', icon: GraduationCap, color: 'blue', desc: 'Access your courses, schedule and fee information.' },
  };

  const currentPortal = portalInfo[role];

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-10 text-center">
            <div className={`w-20 h-20 bg-blue-50 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner`}>
              {isInviteFlow ? <UserCheck size={40} /> : <currentPortal.icon size={40} />}
            </div>
            <h1 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter">
              {isInviteFlow ? 'Set Password' : currentPortal.label}
            </h1>
            <p className="text-slate-500 mt-2 font-medium px-4">
              {isInviteFlow ? 'Choose a secure password for your account' : currentPortal.desc}
            </p>
          </div>

          <div className="px-10 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isInviteFlow ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:border-primary outline-none transition-all shadow-inner"
                        placeholder="yourname@fhmc.edu.pk"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:border-primary outline-none transition-all shadow-inner"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:border-primary outline-none transition-all shadow-inner"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/95 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : isInviteFlow ? 'Set Password' : 'Enter Portal'}
                {!isLoading && <ArrowRight className="w-6 h-6" />}
              </button>
            </form>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Security Advisory</p>
              <p className="text-sm text-slate-500 font-medium px-4 leading-relaxed">
                You are accessing a restricted FHMC node. All activity is logged for security audits.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
