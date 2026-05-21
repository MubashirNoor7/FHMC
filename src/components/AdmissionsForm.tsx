import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, Phone, BookOpen, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdmissionsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: 'BHMS',
    previousEducation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation for demo if Supabase keys aren't set
    // BUT we write the code as if it's real
    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          { 
            full_name: formData.fullName, 
            email: formData.email, 
            phone: formData.phone, 
            program: formData.program,
            education: formData.previousEducation
          }
        ]);

      if (error) throw error;
      
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      alert('Application Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center border-2 border-emerald-100"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h3>
        <p className="text-slate-600 text-lg mb-8">
          Thank you, {formData.fullName}. Your application for {formData.program} has been submitted successfully. 
          Our admission office will contact you shortly.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-primary font-bold hover:underline"
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-black text-primary mb-2 uppercase tracking-tight">Registration 2025-2026</h3>
            <p className="text-slate-500 font-medium italic">Apply officially for Bachelor (BHMS) or Diploma (DHMS) tracks.</p>
          </div>
          <a 
            href="https://wa.me/923329585893" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Phone size={14} /> WhatsApp Helpline
          </a>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <User size={14} className="text-secondary" /> Full Name (As per SSC)
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Ahmed Khan"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-medium"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} className="text-secondary" /> Official Email
            </label>
            <input
              required
              type="email"
              placeholder="ahmed.khan@gmail.com"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-medium"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <Phone size={14} className="text-secondary" /> WhatsApp Number
            </label>
            <input
              required
              type="tel"
              placeholder="+92 3XX XXXXXXX"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-medium"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap size={14} className="text-secondary" /> Choice of Program
            </label>
            <select
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none appearance-none font-black text-primary"
              value={formData.program}
              onChange={e => setFormData({...formData, program: e.target.value})}
            >
              <option value="BHMS">BHMS (5 Years Degree)</option>
              <option value="DHMS">DHMS (4 Years Diploma)</option>
              <option value="DHP">DHP (2 Years Technical)</option>
              <option value="PGDHMS">PGDHMS (2 Years Specialist)</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={14} className="text-secondary" /> KMU CAT Score (Mandatory for BHMS)
            </label>
            <input
              required
              type="text"
              placeholder="Enter your CAT result or Roll No."
              className="w-full px-6 py-4 rounded-2xl border-2 border-secondary/20 bg-secondary/5 focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-black text-primary"
              value={formData.kmuCatScore || ''}
              onChange={e => setFormData({...formData, kmuCatScore: e.target.value} as any)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <BookOpen size={14} className="text-secondary" /> F.Sc Marks (Obtained / Total)
            </label>
            <input
              required
              type="text"
              placeholder="e.g. 850 / 1100"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-medium"
              value={formData.previousEducation}
              onChange={e => setFormData({...formData, previousEducation: e.target.value})}
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Clock className="animate-spin" size={20} /> Processing...
                </>
              ) : (
                <>
                  Submit Application <Send size={20} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionsForm;
