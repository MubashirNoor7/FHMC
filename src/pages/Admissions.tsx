import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, CheckCircle2, Calendar, CreditCard, 
  MapPin, Clock, ShieldCheck, Users, Star, 
  ArrowRight, Download, ClipboardList, AlertCircle
} from 'lucide-react';
import AdmissionsForm from '../components/AdmissionsForm';

const Admissions = () => {
  const steps = [
    { 
      icon: <CheckCircle2 />, 
      title: "Step 1: KMU CAT Entry Test", 
      desc: "Register and appear in the KMU CAT Entry Test through KMU's official portal. This test is MANDATORY for all candidates." 
    },
    { 
      icon: <Users />, 
      title: "Step 2: Eligibility Verification", 
      desc: "Verify you meet the F.Sc Pre-Medical criteria and have a valid CAT score as per KMU enrollment policy." 
    },
    { 
      icon: <MapPin />, 
      title: "Step 3: Collect Prospectus", 
      desc: "Visit the FHMC Admissions Office at 15-B, Phase 5, Hayatabad to obtain the official prospectus and form." 
    },
    { 
      icon: <ClipboardList />, 
      title: "Step 4: Submission", 
      desc: "Submit your completed application with all 7 required attested documents to the admissions desk." 
    },
    { 
      icon: <CreditCard />, 
      title: "Step 5: Enrollment", 
      desc: "Wait for the departmental merit list announcement. Confirm your seat by paying the designated admission fees." 
    },
  ];

  const requirements = [
    { title: "SSC (Matric)", desc: "Attested certificates and marks sheet." },
    { title: "HSSC (F.Sc)", desc: "Pre-Medical certificates and marks sheet." },
    { title: "KMU CAT Result", desc: "Official result card of the Entry Test." },
    { title: "Domicile Certificate", desc: "KPK Province preferred for open merit." },
    { title: "Passport Photographs", desc: "4 recent color photos (Passport size)." },
    { title: "Identity Document", desc: "Copy of CNIC or B-Form (under 18)." },
    { title: "Character Certificate", desc: "Issued by the last attended institution." },
  ];

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Institutional Header */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 border border-secondary/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Session 2025 - 2026 Admissions Open
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-black text-primary mb-8 tracking-tighter uppercase leading-none">
              Start Your Medical <br/> <span className="text-secondary opacity-50 italic">Journey.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              FHMC Peshawar follows the centralized admission policy of Khyber Medical University (KMU). Join Pakistan's 98% recommended homeopathic institution.
            </p>
          </motion.div>
          
          {/* Decorative stats behind header */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full opacity-5 pointer-events-none select-none">
            <span className="text-[20rem] font-black text-slate-900 leading-none">BHMS</span>
          </div>
        </div>

        {/* Social Proof & Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { label: 'Community Rating', value: '98%', sub: 'Recommend rate' },
            { label: 'FB Followers', value: '6,286', sub: 'Active engagement' },
            { label: 'Campus check-ins', value: '534+', sub: 'Verified visits' },
            { label: 'HERA Reg No.', value: '322', sub: 'Since Sept 2015' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 text-center transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-2">
              <h4 className="text-4xl font-black text-primary mb-1 tracking-tighter">{stat.value}</h4>
              <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          
          {/* Left Column: Eligibility & Docs */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-primary p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <AlertCircle className="text-secondary mb-6" size={40} />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Mandatory Eligibility</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4 text-sm font-medium border-b border-white/10 pb-4">
                    <span className="text-secondary">●</span>
                    F.Sc Pre-Medical (Part I & II) Passed.
                  </li>
                  <li className="flex gap-4 text-sm font-medium border-b border-white/10 pb-4">
                    <span className="text-secondary">●</span>
                    Official KMU CAT Score is Mandatory.
                  </li>
                  <li className="flex gap-4 text-sm font-medium">
                    <span className="text-secondary">●</span>
                    KPK Domicile (Required for Merit Seats).
                  </li>
                </ul>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full scale-150"></div>
            </motion.div>

            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-primary uppercase tracking-tight">Required Documents</h3>
                <Download size={20} className="text-slate-300" />
              </div>
              <div className="space-y-5">
                {requirements.map((req, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{req.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{req.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white">
              <Clock className="text-secondary mb-6" size={32} />
              <h4 className="text-lg font-black uppercase tracking-widest mb-4">Admissions Office Hours</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-white/50 font-bold">Mon - Sat</span>
                  <span className="text-xs font-black">08:00 AM - 02:00 PM</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-xs text-white/50 font-bold">Sunday</span>
                  <span className="text-[10px] font-black uppercase text-secondary">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workflow */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Admission Roadmap</h2>
              <p className="text-slate-500 font-medium max-w-xl">Follow our streamlined 5-step process to secure your seat at Frontier Homeopathic Medical College.</p>
            </div>

            <div className="relative space-y-12">
              <div className="absolute left-[31px] top-4 bottom-4 w-px bg-slate-100 hidden md:block" />
              {steps.map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col md:flex-row gap-8 group"
                >
                  <div className="w-16 h-16 bg-white rounded-3xl shadow-lg border border-slate-50 flex items-center justify-center text-primary z-10 shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                    {step.icon}
                  </div>
                  <div className="pt-4">
                    <h4 className="text-xl font-black text-primary uppercase tracking-tight mb-2 group-hover:text-secondary transition-colors">{step.title}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium text-lg max-w-2xl">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Application Call to Action */}
            <div className="mt-20 p-12 bg-slate-50 rounded-[4rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-md">
                <h3 className="text-2xl font-black text-primary mb-2 uppercase tracking-tight">Ready to Apply?</h3>
                <p className="text-slate-500 font-medium">Download the electronic form or start your online registration below.</p>
              </div>
              <div className="flex gap-4">
                <a href="#apply-now" className="bg-primary hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20">
                  Online Registration
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div id="apply-now" className="scroll-mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">Initial Registration Form</h2>
            <p className="text-slate-500 font-medium mb-12">Please fill in the details according to your matriculation certificates.</p>
          </div>
          <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 p-2 md:p-12 border border-slate-100">
            <AdmissionsForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admissions;

