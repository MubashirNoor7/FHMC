import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import { LOGO_IMAGE } from '../constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Programs', href: '/programs' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/about' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={cn(
      "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-effect shadow-md py-3" : "bg-white/95 backdrop-blur-sm border-b border-slate-100 py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden p-1 border border-slate-100">
              <img src={LOGO_IMAGE} alt="FHMC Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-black text-2xl leading-none text-slate-900 tracking-tighter uppercase">
                FHMC <span className="text-secondary">Peshawar</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return item.href.startsWith('/#') ? (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-sm font-black uppercase tracking-tighter transition-colors hover:text-secondary text-slate-600"
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.label} 
                  to={item.href}
                  className={cn(
                    "text-sm font-black uppercase tracking-tighter transition-colors hover:text-secondary",
                    isActive ? "text-secondary border-b-2 border-secondary pb-1" : "text-slate-600"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/admissions" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-secondary/20">
              Apply Now
            </Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className={isScrolled || !isHome ? "text-primary" : "text-white"} /> : <Menu className={isScrolled || !isHome ? "text-primary" : "text-white"} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                item.href.startsWith('/#') ? (
                  <a 
                    key={item.label} 
                    href={item.href}
                    className="block text-slate-600 font-bold hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    key={item.label} 
                    to={item.href}
                    className="block text-slate-600 font-bold hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Link to="/admissions" className="block w-full bg-primary text-white py-3 rounded-xl font-bold text-center">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
