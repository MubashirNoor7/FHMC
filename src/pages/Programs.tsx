import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, Award, Clock, CheckCircle2, 
  BookOpen, Stethoscope, Search, Beaker, ShieldCheck, Activity 
} from 'lucide-react';
import { PROGRAMS } from '../constants';
import { cn } from '../lib/utils';

// Helper to map icons to program categories (matching Home.tsx)
const getProgramIcon = (iconName: string) => {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap size={32} />;
    case 'Award': return <Award size={32} />;
    case 'BookOpen': return <BookOpen size={32} />;
    case 'Stethoscope': return <Stethoscope size={32} />;
    case 'Search': return <Search size={32} />;
    case 'Beaker': return <Beaker size={32} />;
    case 'ShieldCheck': return <ShieldCheck size={32} />;
    case 'Activity': return <Activity size={32} />;
    default: return <GraduationCap size={32} />;
  }
};

// Helper to map programs to specific institutional photos
const getProgramImage = (id: string) => {
  const mapping: Record<string, string> = {
    'bhms': '/image/Gallery 6.jpg',
    'dhms': '/image/Gallery 1.jpg',
    'md-philosophy': '/image/Gallery 5.jpg',
    'md-materia': '/image/logo-sign.jpg',
    'md-repertory': '/image/Gallery 4.jpg',
    'dhp': '/image/646037952_1361993262611693_7580584875219610477_n.jpg',
    'pgdhms': '/image/558257599_1234482742029413_354682217562667196_n.jpg',
    'mlt-short': '/image/486097591_1077548594389496_3370746818051149490_n.jpg',
  };
  return mapping[id] || '/image/hero.jpg';
};

const Programs = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] block mb-4">OUR CURRICULUM</span>
          <h1 className="text-5xl md:text-7xl font-display font-black text-primary mb-6 tracking-tighter uppercase">Academic Programs</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Explore our comprehensive homeopathic medical education programs, from foundation diplomas to advanced MD research specializations.
          </p>
        </div>

        <div className="space-y-32">
          {PROGRAMS.map((prog, i) => (
            <div key={prog.id} className={cn(
              "flex flex-col lg:flex-row gap-16 items-center",
              i % 2 !== 0 && "lg:flex-row-reverse"
            )}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl bg-slate-100 border-8 border-slate-50">
                  <img src={getProgramImage(prog.id)} alt={prog.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-10 shadow-inner">
                  {getProgramIcon(prog.icon)}
                </div>
                <h2 className="text-4xl font-black text-primary mb-6 leading-tight tracking-tight uppercase">
                  {prog.title.split(' (').shift()}
                </h2>
                <div className="flex flex-col gap-3 mb-10">
                  <span className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.2em] bg-secondary/10 px-4 py-2 rounded-full self-start">
                    <Clock size={16} /> {prog.duration}
                  </span>
                  <span className="text-sm font-bold text-slate-500 italic flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" /> {prog.affiliation}
                  </span>
                </div>
                <p className="text-slate-600 mb-10 leading-relaxed text-lg font-medium">
                  {prog.description}
                </p>
                <div className="space-y-6 mb-12">
                  <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest border-l-4 border-secondary pl-4">Key Academic Learning Areas:</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {prog.learningAreas.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center text-slate-600">
                        <CheckCircle2 size={18} className="text-secondary shrink-0" />
                        <span className="text-sm font-bold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="bg-primary text-white px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-primary/30">
                  View Full Prospectus
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
