import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES } from '../constants';
import { X, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(6);

  const showMore = () => {
    setVisibleItems(prev => Math.min(prev + 6, GALLERY_IMAGES.length));
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-display font-bold text-primary mb-6">Campus Gallery</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A glimpse into our vibrant academic environment and campus life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {GALLERY_IMAGES.slice(0, visibleItems).map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 6) * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl scale-50 group-hover:scale-100 transition-transform">
                  <ZoomIn size={28} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleItems < GALLERY_IMAGES.length && (
          <div className="mt-16 text-center">
            <button 
              onClick={showMore}
              className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              View More Images
            </button>
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedImage(null)}
            >
              <button className="absolute top-10 right-10 text-white hover:scale-110 transition-all"><X size={40} /></button>
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={selectedImage} 
                alt="Selected" 
                className="max-w-full max-h-full rounded-3xl shadow-2xl object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-display font-bold text-slate-800 mb-6">Follow Us for More Updates</h2>
          <div className="flex justify-center gap-6">
            <a href="#" className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100 font-bold hover:shadow-xl transition-all">Facebook</a>
            <a href="#" className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100 font-bold hover:shadow-xl transition-all">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
