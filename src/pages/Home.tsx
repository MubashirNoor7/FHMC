import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, GraduationCap, Award, Users, Activity, Clock, 
  BookOpen, Stethoscope, Search, Beaker, ShieldCheck, Microscope, 
  CheckCircle2, Building2, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROGRAMS, FACULTY, GALLERY_IMAGES, HERO_IMAGES } from '../constants';

// Helper to map icons to program categories
const getProgramIcon = (iconName: string) => {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap size={28} />;
    case 'Award': return <Award size={28} />;
    case 'BookOpen': return <BookOpen size={28} />;
    case 'Stethoscope': return <Stethoscope size={28} />;
    case 'Search': return <Search size={28} />;
    case 'Beaker': return <Beaker size={28} />;
    case 'ShieldCheck': return <ShieldCheck size={28} />;
    case 'Activity': return <Activity size={28} />;
    default: return <GraduationCap size={28} />;
  }
};

// New Animated Counter Component
const AnimatedCounter = ({ target, suffix = "" }: { target: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/\D/g, ''));
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / numericTarget));
        
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= numericTarget) clearInterval(timer);
        }, stepTime > 10 ? stepTime : 10);
      }}
      className="inline-block"
    >
      {count}{suffix}
    </motion.span>
  );
};

const Home = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section - Refined for Prestige */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentHeroIndex}
              src={HERO_IMAGES[currentHeroIndex]} 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              alt="FHMC Campus" 
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/20 backdrop-blur-md border border-secondary/30 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                SESSION 2026-2027 NOW OPEN
              </div>
              <h1 className="text-6xl md:text-8xl text-white font-display leading-[1.1] mb-8 tracking-tighter uppercase font-black">
                Master the Art of <span className="text-secondary italic font-serif">Healing.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed font-medium max-w-2xl border-l-4 border-secondary pl-6">
                Frontier Homeopathic Medical College: Pakistan's premier institution for modern homeopathic clinical excellence and academic rigor.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/admissions" className="bg-secondary hover:bg-secondary/95 text-white px-12 py-5 rounded-2xl font-black flex items-center gap-3 transition-all shadow-2xl shadow-secondary/40 hover:scale-[1.05]">
                  APPLY FOR ADMISSION <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 text-white/40 uppercase text-[10px] font-black tracking-widest vertical-text"
        >
          SCROLL TO EXPLORE
          <div className="w-px h-20 bg-white/20 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary"></div>
          </div>
        </motion.div>
      </section>

      {/* Institutional Notice Board - Auto-scrolling marquee */}
      <div className="bg-primary text-white py-4 overflow-hidden border-b border-white/10 relative z-30">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
          {[
            "OFFICIAL ADMISSIONS OPEN FOR SESSION 2025-2026",
            "MANDATORY: KMU CAT REQUIRED FOR BHMS 5-YEAR ENROLLMENT",
            "REGISTRATION STATUS: HERA KP NO. 322 (SINCE 2015)",
            "AFFILIATED WITH KHYBER MEDICAL UNIVERSITY (KMU) PESHAWAR",
            "OFFICE HOURS: MON-SAT (08:00 AM - 02:00 PM)",
            "TRUSTED INSTITUTION: 98% RECOMMENDATION RATE ON FACEBOOK",
            "LOCATED AT: 15-B, PHASE 5, HAYATABAD, PESHAWAR"
          ].map((notice, i) => (
            <div key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              {notice}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Registry - Dark sleek bar */}
      <div className="bg-slate-950 py-10 border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-70">
            <div className="flex flex-col items-center gap-2 group cursor-default">
              <span className="text-white font-black text-2xl tracking-tighter group-hover:text-secondary transition-colors uppercase">KMU</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Affiliated University</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-default border-l border-white/10 pl-8">
              <span className="text-white font-black text-2xl tracking-tighter group-hover:text-secondary transition-colors uppercase">HERA-KP</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">REG NO. 322</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-default border-l border-white/10 pl-8">
              <span className="text-white font-black text-2xl tracking-tighter group-hover:text-secondary transition-colors uppercase">NCH</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Certified Pakistan</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-default border-l border-white/10 pl-8">
              <span className="text-white font-black text-2xl tracking-tighter group-hover:text-secondary transition-colors uppercase">HEC</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Recognized Body</span>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's Vision - High Contrast Section */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
            >
              <div className="relative z-10 aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-slate-50">
                <img src="/image/Director of FHMC.jpg" alt="Col. Iqbal Shaheen" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-12 -right-12 bg-primary p-12 rounded-[3rem] shadow-2xl shadow-primary/30 z-20 max-w-xs hidden md:block">
                <Quote className="text-secondary mb-4" size={40} />
                <p className="text-white/80 font-medium italic text-lg leading-relaxed mb-6">
                  "Our mission is to produce homeopathic clinicians who combine profound philosophical knowledge with practical medical mastery."
                </p>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-white font-black uppercase text-sm tracking-widest">Col. (Retd) Iqbal Shaheen</h4>
                  <p className="text-secondary text-[10px] font-black uppercase tracking-widest">Founder & Director</p>
                </div>
              </div>
              {/* Decorative behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
            </motion.div>
            
            <div>
              <div className="mb-12">
                <span className="text-secondary font-black text-xs uppercase tracking-[0.3em] block mb-4">THE LEGACY SINCE 2015</span>
                <h2 className="text-5xl md:text-6xl text-primary font-display font-black leading-tight mb-8">A Visionary Foundation for <span className="text-secondary underline decoration-4 decoration-secondary/30">Homeopathic</span> Excellence.</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8">
                  Founded by the distinguished <strong>Col. (Retd) Iqbal Shaheen</strong>, Frontier Homeopathic Medical College (FHMC) was established as a beacon of clinical purity in Peshawar. 
                </p>
                <div className="space-y-6">
                  <div className="flex gap-6 items-start p-6 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl group">
                    <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <GraduationCap />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase text-sm tracking-wider mb-1">KMU Affiliated Academic Standard</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Rigorous medical curriculum aligned with Khyber Medical University directives.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start p-6 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl group">
                    <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Stethoscope />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase text-sm tracking-wider mb-1">Practical Clinical Immersion</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">In-house OPD facilities providing real-world diagnostic training from day one.</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/about" className="inline-flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
                EXPLORE OUR FULL HISTORY <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why FHMC - 3 Pillars Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl text-primary font-display font-black tracking-tighter mb-6 uppercase">Why Pursue Medicine at <span className="text-secondary">FHMC</span>?</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mb-8"></div>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              We provide the infrastructure and expertise required to bridge the gap between classical theory and modern medical practice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Building2 size={32} />, 
                title: "Premium Infrastructure", 
                desc: "State-of-the-art anatomy labs, a digital library, and modern lecture theaters designed for high-focus medical learning." 
              },
              { 
                icon: <Microscope size={32} />, 
                title: "Research Facilities", 
                desc: "Equipped diagnostic laboratories for pathology and clinical observation, allowing students to verify treatment results." 
              },
              { 
                icon: <CheckCircle2 size={32} />, 
                title: "Professional Placement", 
                desc: "Our graduates are prepared for roles in public health, private clinics, and homeopathic research institutions globally." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all h-full"
              >
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-3xl flex items-center justify-center mb-10 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-primary uppercase mb-6 tracking-tight tracking-wider">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Gallery - High Impact Visuals */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-black text-xs uppercase tracking-[0.3em] block mb-4">OUR CAMPUS LIFE</span>
            <h2 className="text-5xl md:text-6xl text-primary font-display font-black tracking-tighter uppercase leading-none">Facilities <span className="text-slate-300">&</span> Campus.</h2>
          </div>
          <Link to="/gallery" className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-primary/20">
            View All Photos
          </Link>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 row-span-2 rounded-[3rem] overflow-hidden shadow-2xl group relative h-[600px]">
            <img src="/image/Gallery 6.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-12">
              <p className="text-white font-black text-2xl uppercase tracking-tighter">Main Lecture Hall</p>
            </div>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl group relative h-[288px]">
            <img src="/image/646037952_1361993262611693_7580584875219610477_n.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl group relative h-[288px]">
            <img src="/image/Gallery 5.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="col-span-2 rounded-[3rem] overflow-hidden shadow-xl group relative h-[288px]">
            <img src="/image/558257599_1234482742029413_354682217562667196_n.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-all">
               <span className="text-white font-black text-sm uppercase tracking-widest text-center px-6">Official Academic Seminars</span>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs - The Full Curriculum Grid */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#52b788 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
            <div className="max-w-2xl">
              <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] block mb-4">OUR CURRICULUM</span>
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none mb-6">Medical <span className="text-secondary">Excellence</span> <br/>Programs.</h2>
              <p className="text-white/50 font-medium text-lg leading-relaxed">
                From foundation diplomas to advanced post-graduate specializations in clinical philosophy and materia medica.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((prog) => (
              <Link to="/programs" key={prog.id} className="block group">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="relative bg-white/5 border border-white/10 p-10 rounded-[3rem] group-hover:bg-white group-hover:border-white transition-all overflow-hidden h-full flex flex-col"
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 text-white group-hover:bg-primary group-hover:text-white rounded-2xl flex items-center justify-center mb-10 transition-colors shadow-inner">
                      {getProgramIcon(prog.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary leading-tight transition-colors">{prog.title}</h3>
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-1 bg-secondary h-4 group-hover:h-6 transition-all"></div>
                      <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{prog.duration}</span>
                    </div>
                    <p className="text-sm text-white/50 group-hover:text-slate-600 font-medium leading-relaxed mb-auto">
                      {prog.description}
                    </p>
                    <div className="mt-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary group-hover:text-primary transition-colors hover:gap-4">
                      EXPLORE CURRICULUM <ArrowRight size={14} />
                    </div>
                  </div>
                  {/* Decorative background circle on hover */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full group-hover:bg-primary/5 transition-all"></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Statistics - Final Professional Footer Block */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center p-20 rounded-[4rem] bg-slate-50 border border-slate-100 shadow-sm">
            {[
              { label: 'Active Students', value: '500', suffix: '+' },
              { label: 'Specialized Faculty', value: '30', suffix: '+' },
              { label: 'Years Experience', value: '25', suffix: '+' },
              { label: 'Clinical OPD Rate', value: '98', suffix: '%' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <h4 className="text-5xl md:text-6xl font-black text-primary mb-3 tracking-tighter">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </h4>
                <div className="w-8 h-1 bg-secondary mb-4 rounded-full"></div>
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
