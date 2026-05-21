import React from 'react';
import { motion } from 'motion/react';
import { FACULTY } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';

const Faculty = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-display font-bold text-primary mb-6">Our Distinguished Faculty</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Guided by the best minds in homeopathic medicine.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center mb-24">
          {FACULTY.map((f) => (
            <div key={f.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 group hover:shadow-2xl transition-all">
              <div className="w-56 h-56 mx-auto rounded-full overflow-hidden mb-8 border-8 border-slate-50 group-hover:border-secondary transition-all shadow-xl">
                <img 
                  src={f.image} 
                  alt={f.name} 
                  className="w-full h-full object-cover scale-110" 
                  style={{ objectPosition: 'center 20%' }}
                  referrerPolicy="no-referrer" 
                />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">{f.name}</h4>
              <p className="text-secondary font-bold text-lg mb-4">{f.designation}</p>
              <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Qualification</p>
                <p className="text-slate-700 font-bold text-sm">{f.qualification}</p>
              </div>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-white transition-all text-slate-400"><Mail size={18} /></a>
                <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-white transition-all text-slate-400"><Phone size={18} /></a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-primary mb-6">Join Our Faculty</h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Frontier Homeopathic Medical College is always looking for passionate educators and 
                experienced practitioners to join our team. If you are dedicated to the advancement of 
                homeopathic medicine, we would love to hear from you.
              </p>
              <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                View Career Opportunities
              </button>
            </div>
            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src="/image/Gallery 1.jpg" alt="Faculty Group" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
