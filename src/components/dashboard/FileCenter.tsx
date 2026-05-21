import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/AuthContext';
import { FileUp, File, Download, Trash2, Search, FileText, ImageIcon, Loader2, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FileCenter: React.FC = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from('academic-files').list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

      if (error) throw error;
      setFiles(data || []);
    } catch (err) {
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error } = await supabase.storage
        .from('academic-files')
        .upload(filePath, file);

      if (error) throw error;
      
      fetchFiles();
      alert('File uploaded successfully!');
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('academic-files')
        .download(fileName);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      alert('Download error: ' + err.message);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    
    try {
      const { error } = await supabase.storage
        .from('academic-files')
        .remove([fileName]);

      if (error) throw error;
      fetchFiles();
    } catch (err: any) {
      alert('Delete error: ' + err.message);
    }
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <FileText className="text-rose-500" />;
    if (['jpg', 'png', 'jpeg', 'gif'].includes(ext || '')) return <ImageIcon className="text-emerald-500" />;
    return <File className="text-blue-500" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Academic File Center</h2>
          <p className="text-slate-500 font-medium">Access lecture notes, assignments, and college resources.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 pl-11 pr-5 py-3 rounded-2xl outline-none focus:border-blue-500 transition-all shadow-sm w-64"
            />
          </div>
          <label className="bg-primary text-white px-6 py-3 rounded-2xl font-black transition-all flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 cursor-pointer">
            <FileUp className="w-5 h-5" /> {uploading ? 'Uploading...' : 'Upload File'}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="font-bold uppercase tracking-widest text-xs">Syncing with Cloud...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 gap-4">
          <Cloud className="w-16 h-16 opacity-20" />
          <p className="font-bold">No files found. Be the first to upload!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredFiles.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {getFileIcon(file.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate" title={file.name}>{file.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {(file.metadata?.size / 1024 / 1024).toFixed(2)} MB • {file.name.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownload(file.name)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-primary hover:text-white text-primary rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                  >
                    <Download size={16} /> Download
                  </button>
                  {user?.role === 'admin' && (
                    <button 
                      onClick={() => handleDelete(file.name)}
                      className="p-3 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default FileCenter;
