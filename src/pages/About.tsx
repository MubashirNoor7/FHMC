import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Award, ShieldCheck, History, HeartPulse, GraduationCap, Microscope } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-secondary font-black text-xs uppercase tracking-[0.4em] block mb-4"
          >
            Institutional Profile
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter uppercase font-outfit"
          >
            About <span className="text-secondary italic font-serif">FHMC.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Frontier Homeopathic Medical College (FHMC) Peshawar is a premier institution dedicated to the advanced study and clinical practice of homeopathic medicine since 2015.
          </motion.p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-16 rounded-[4rem] text-white relative overflow-hidden group shadow-2xl"
          >
            <Target className="text-secondary mb-8 transition-transform group-hover:scale-110" size={48} />
            <h2 className="text-4xl font-black uppercase mb-6 tracking-tight">Our Mission</h2>
            <p className="text-white/70 text-lg leading-relaxed font-medium">
              To produce highly skilled homeopathic clinicians who combine profound philosophical understanding with modern medical diagnostics. We strive to elevate the standard of natural healing through rigorous academic training and clinical discipline.
            </p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-16 rounded-[4rem] border border-slate-100 relative overflow-hidden group shadow-xl"
          >
            <Eye className="text-primary mb-8 transition-transform group-hover:scale-110" size={48} />
            <h2 className="text-4xl font-black uppercase mb-6 tracking-tight text-primary">Our Vision</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              To be recognized as a global center of excellence for homeopathic education and research, pioneering new ways to integrate traditional wisdom with evidence-based medicine for the benefit of humanity.
            </p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full"></div>
          </motion.div>
        </div>

        {/* History Section */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img src="/image/Gallery 6.jpg" alt="FHMC Campus" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-secondary p-8 rounded-[2rem] shadow-xl text-white hidden md:block">
              <History size={32} className="mb-4" />
              <h4 className="font-black uppercase text-sm tracking-widest">Established</h4>
              <p className="text-3xl font-black">2015</p>
            </div>
          </motion.div>
          <div>
            <span className="text-secondary font-black text-xs uppercase tracking-[0.3em] block mb-4">The FHMC Story</span>
            <h2 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none mb-8">
              A Legacy of <br />Clinical Purity.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
              Founded under the visionary leadership of <strong className="text-primary font-black">Col. (Retd) Iqbal Shaheen</strong>, Frontier Homeopathic Medical College was established in Hayatabad, Peshawar, to bridge the gap in quality homeopathic education in Khyber Pakhtunkhwa.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              From its inception, FHMC has focused on maintaining the highest standards of clinical practice, eventually gaining affiliation with <strong className="text-primary">Khyber Medical University (KMU)</strong> and registration with <strong className="text-primary">HERA-KP (Reg No. 322)</strong>.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Award className="text-secondary" />, 
                title: "Excellence", 
                desc: "Unwavering commitment to academic and clinical superiority." 
              },
              { 
                icon: <ShieldCheck className="text-secondary" />, 
                title: "Integrity", 
                desc: "Honesty and ethical practice in every patient interaction." 
              },
              { 
                icon: <Microscope className="text-secondary" />, 
                title: "Innovation", 
                desc: "Applying modern research to classical homeopathic theory." 
              },
              { 
                icon: <HeartPulse className="text-secondary" />, 
                title: "Compassion", 
                desc: "Developing clinicians who treat the whole person, not just symptoms." 
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all text-center"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h4 className="font-black text-primary uppercase tracking-wider mb-2">{value.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Affiliation Recognition */}
        <div className="bg-slate-900 p-16 md:p-24 rounded-[4rem] text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <GraduationCap className="text-secondary mx-auto mb-8" size={64} />
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tighter">Recognized Standards</h2>
            <p className="text-white/70 text-xl leading-relaxed font-medium mb-12">
              FHMC is proudly affiliated with <strong className="text-secondary">Khyber Medical University (KMU)</strong> and recognized by the <strong className="text-secondary">National Council for Homoeopathy (NCH)</strong> Pakistan, ensuring our graduates are eligible for official registration and professional practice.
            </p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50">
              <span className="font-black tracking-widest uppercase">KMU Peshawar</span>
              <span className="font-black tracking-widest uppercase">HERA-KP #322</span>
              <span className="font-black tracking-widest uppercase">NCH Certified</span>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#52b788 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

      </div>
    </div>
  );
};

export default About;
