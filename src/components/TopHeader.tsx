import React from 'react';
import { Phone, MapPin, Mail, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_PHONES, CONTACT_EMAILS, COLLEGE_ADDRESS } from '../constants';

const TopHeader = () => {
  return (
    <div className="w-full z-[60] relative">
      {/* Announcement Banner - High Visibility at the very top */}
      <div className="bg-secondary text-white py-2 px-4 text-center text-xs md:text-sm font-black flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap uppercase tracking-widest">
        <GraduationCap size={16} className="shrink-0" />
        <motion.div
          animate={{ x: [20, 0] }}
          transition={{ duration: 0.5 }}
        >
          ADMISSIONS OPEN 2026-2027 • BHMS 5-YEAR DEGREE • KMU CAT MANDATORY
        </motion.div>
        <a href="/admissions" className="underline hover:text-white/80 ml-2 transition-colors font-black">Apply Now →</a>
      </div>
    </div>
  );
};

export default TopHeader;
