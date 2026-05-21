import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Welcome to Frontier Homeopathic Medical College! How can I assist you with admissions or course details?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Super-Mock: High-Fidelity Knowledge Engine
    try {
      const lowerInput = userMsg.toLowerCase().trim();
      let aiResponse = "";
      
      // Extended Institutional Knowledge Base
      const KNOWLEDGE_BASE = [
        {
          category: "Admissions Hub",
          keys: ['admission', 'apply', 'enroll', 'join', 'process', 'form'],
          res: "Admissions for the 2026-2027 session are officially open! You can pick up a prospectus from our Hayatabad campus or initiate your application through the 'Admissions' portal on this website."
        },
        {
          category: "Eligibility & Marks",
          keys: ['marks', 'score', 'result', 'low', 'percent', 'eligibility', 'fsc', 'matric'],
          res: "For BHMS (5-year degree), KMU requires at least 50% in F.Sc Pre-Medical. If your marks are around this range or you have concerns about the merit list, visit our office at Phase 5 Hayatabad to discuss your specific counseling case."
        },
        {
          category: "Entrance Test",
          keys: ['cat', 'test', 'entrance', 'entry', 'kmu cat'],
          res: "Yes, the KMU CAT (Common Admission Test) is mandatory for BHMS degree enrollment. Please ensure you have your CAT roll number or result card ready when submitting your documents."
        },
        {
          category: "Academic Choice",
          keys: ['bhms', 'degree', '5 year', 'doctor', 'university', 'kmu'],
          res: "Our flagship BHMS degree is a 5-year program fully affiliated with Khyber Medical University (KMU) Peshawar. It combines rigorous academic theory with advanced clinical diagnostic training."
        },
        {
          category: "Clinical Diploma",
          keys: ['dhms', 'diploma', '4 year', 'nch'],
          res: "The 4-year DHMS diploma is recognized by the National Council for Homoeopathy (NCH). It is an excellent clinical pathway for aspiring homeopathic clinicians, with flexible merit criteria."
        },
        {
          category: "Document Checklist",
          keys: ['document', 'checklist', 'requirements', 'papers', 'character CERT', 'domicile'],
          res: "Required documents (2 copies each, verified): 8 Photos, ID Card/B-Form, Father's ID, F.Sc Certificate, Matric Certificate, Domicile, Character Certificate, and the KMU CAT Result."
        },
        {
          category: "Financials",
          keys: ['fee', 'cost', 'expensive', 'price', 'dues', 'payment', 'money'],
          res: "FHMC maintains an affordable and competitive fee structure for both BHMS and DHMS. For specific 2026 dues, please visit the campus finance counter or call us at 0332 9585893."
        },
        {
          category: "Institutional Trust",
          keys: ['history', 'founder', 'since', 'established', 'col', 'iqbal', 'shaheen', '2015', 'vision', 'mission'],
          res: "FHMC was founded in 2015 by Col. (Retd) Iqbal Shaheen. Our vision is to elevate the standard of homeopathic medicine in KP through clinical masters and academic excellence."
        },
        {
          category: "Clinical OPD",
          keys: ['opd', 'clinic', 'hospital', 'patient', 'hands on', 'practice'],
          res: "We have dedicated in-house OPD clinics where students get hands-on clinical exposure under expert clinicians starting from their 3rd year in the program."
        },
        {
          category: "Logistics",
          keys: ['location', 'where', 'address', 'hayatabad', 'phase 5', 'timing', 'open', 'close', 'map'],
          res: "We are located at 15-B, Phase 5, Hayatabad, Peshawar. Our office is open for consultations Monday–Saturday, 08:00 AM to 02:00 PM."
        },
        {
          category: "Social Flow",
          keys: ['thanks', 'thank you', 'shukriya', 'jazakallah', 'ok', 'okay', 'fine', 'understood', 'good', 'great'],
          res: "You're very welcome! I'm here to ensure you have all the information you need to start your medical career. Do you have any questions about our faculty or clinical facilities?"
        },
        {
          category: "Greetings",
          keys: ['hello', 'hi', 'hey', 'assalam', 'a.a', 'aoa'],
          res: "Hello! Welcome to the Frontier Homeopathic Medical College digital assistant. How can I guide your path to becoming a clinical homeopathic doctor today?"
        }
      ];

      // Smart Intent Scoring Logic
      let bestMatch = null;
      let highestScore = 0;

      KNOWLEDGE_BASE.forEach(category => {
        let currentScore = 0;
        category.keys.forEach(key => {
          if (lowerInput.includes(key)) currentScore++;
        });
        if (currentScore > highestScore) {
          highestScore = currentScore;
          bestMatch = category;
        }
      });

      if (bestMatch && highestScore > 0) {
        aiResponse = bestMatch.res;
      } else {
        aiResponse = "That's an interesting question! While I'm still gathering some fine details, I can tell you all about our KMU-affiliated BHMS degree (5 years) and DHMS diploma (4 years). Would you like to know about our Hayatabad location or admission requirements?";
      }

      // Simulate Thinking Time (more natural)
      await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I apologize, I'm experiencing a brief system disruption. Please feel free to reach our office directly at 0332 9585893." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 w-80 md:w-96 overflow-hidden mb-4"
          >
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Brain size={20} /></div>
                <div>
                  <h4 className="font-bold text-sm">FHMC Assistant</h4>
                  <p className="text-[10px] text-white/70">Always Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            <div ref={scrollRef} className="h-80 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm font-medium",
                  msg.role === 'user' ? "bg-primary text-white ml-auto rounded-tr-none" : "bg-white text-slate-700 mr-auto rounded-tl-none shadow-sm"
                )}>{msg.text}</div>
              ))}
              {isTyping && <div className="text-slate-400 text-xs animate-pulse">Assistant is typing...</div>}
            </div>
            <div className="p-4 bg-white border-t flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your question..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary" />
              <button onClick={handleSend} className="bg-primary text-white p-2 rounded-xl"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="bg-primary text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all"><MessageSquare size={28} /></button>
    </div>
  );
};

export default GeminiChat;
