import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Clock, Send } from 'lucide-react';
import { CONTACT_PHONES, CONTACT_EMAILS, COLLEGE_ADDRESS } from '../constants';

const Contact = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 text-balance">
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase font-outfit">Official Contact</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Reach out to our administration office in Hayatabad, Peshawar for admissions, verification, and general inquiries.
          </p>
        </div>

        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row mb-24">
          <div className="lg:w-1/2 p-12 md:p-16 text-white">
            <h2 className="text-4xl font-bold mb-12 font-outfit uppercase tracking-tight">Institutional Channels</h2>
            <div className="space-y-10">
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 text-secondary border border-white/5 shadow-inner">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-secondary/80">Campus Location</h4>
                  <p className="text-white/80 leading-relaxed text-lg">{COLLEGE_ADDRESS}</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 text-secondary border border-white/5 shadow-inner">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-secondary/80">Phone Lines</h4>
                  {CONTACT_PHONES.map((phone, i) => (
                    <p key={i} className="text-white text-lg font-medium">{phone}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 text-secondary border border-white/5 shadow-inner">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-secondary/80">Email Inquiries</h4>
                  {CONTACT_EMAILS.map((email, i) => (
                    <p key={i} className="text-white text-lg font-medium">{email}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 text-secondary border border-white/5 shadow-inner">
                  <Clock size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-secondary/80">Admission Hours</h4>
                  <p className="text-white/80 text-lg">Mon - Sat: 8:00 AM - 2:00 PM</p>
                  <p className="text-white/40 text-sm mt-1 italic">Closed on Sundays and Public Holidays</p>
                </div>
              </div>
            </div>
            <div className="mt-16 flex gap-6">
              <a href="https://www.facebook.com/fhmc.official" target="_blank" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-secondary transition-all border border-white/5"><Facebook size={24} /></a>
              <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-secondary transition-all border border-white/5"><Twitter size={24} /></a>
              <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-secondary transition-all border border-white/5"><Instagram size={24} /></a>
            </div>
          </div>
          <div className="lg:w-1/2 bg-slate-50 p-12 md:p-24">
            <h3 className="text-3xl font-bold text-slate-800 mb-10">Send Us a Message</h3>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="e.g. Salman Ahmed" className="w-full px-8 py-5 rounded-3xl bg-white border border-slate-200 outline-none focus:border-primary transition-all font-medium shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" placeholder="salman.ahmed@gmail.com" className="w-full px-8 py-5 rounded-3xl bg-white border border-slate-200 outline-none focus:border-primary transition-all font-medium shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full px-8 py-5 rounded-3xl bg-white border border-slate-200 outline-none focus:border-primary transition-all font-medium shadow-sm appearance-none">
                  <option>General Inquiry</option>
                  <option>Admission Inquiry</option>
                  <option>Fee Structure</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                <textarea rows={5} placeholder="How can we help you today?" className="w-full px-8 py-5 rounded-3xl bg-white border border-slate-200 outline-none focus:border-primary transition-all font-medium shadow-sm"></textarea>
              </div>
              <button className="w-full bg-secondary text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-secondary/30 hover:bg-secondary/90 transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                Send Message <Send size={24} />
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-[4rem] overflow-hidden shadow-2xl h-[500px] border-8 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.964724281358!2d71.4363385!3d33.9934149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9172d17647307%3A0x6739646695735f66!2sFrontier%20Homeopathic%20Medical%20College!5e0!3m2!1sen!2s!4v1712155700000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
