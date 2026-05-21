import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_PHONES, CONTACT_EMAILS, COLLEGE_ADDRESS, HERA_REG_NO } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold">F</div>
              <span className="font-outfit font-black text-2xl tracking-tighter uppercase">FHMC Peshawar</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Founded by <strong>Col. (Retd) Iqbal Shaheen</strong>. 
              Frontier Homeopathic Medical College is a premier institution 
              affiliated with Khyber Medical University (KMU).
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/fhmc.official" target="_blank" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-secondary transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-secondary transition-all"><Instagram size={18} /></a>
              <a href={`mailto:${CONTACT_EMAILS[0]}`} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-secondary transition-all"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-xs opacity-50">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Legacy</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admission Portal</Link></li>
              <li><Link to="/programs" className="hover:text-white transition-colors">Degree Programs</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Campus Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-xs opacity-50">Accreditation</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex flex-col">
                <span className="text-white font-bold">Khyber Medical University</span>
                <span className="text-[10px] uppercase">Official Affiliation</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white font-bold">HERA-KP Reg. No. {HERA_REG_NO}</span>
                <span className="text-[10px] uppercase">Provincial Registration</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white font-bold">NCH Pakistan</span>
                <span className="text-[10px] uppercase">Certified Practice</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-xs opacity-50">Contact Detail</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-secondary shrink-0" />
                <span>{COLLEGE_ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <div className="flex flex-col">
                  {CONTACT_PHONES.map((phone, i) => (
                    <span key={i}>{phone}</span>
                  ))}
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>{CONTACT_EMAILS[0]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 Frontier Homeopathic Medical College Peshawar. Reg No. {HERA_REG_NO}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="/portal/admin-access" className="text-white/20 hover:text-white transition-colors">Admin Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
