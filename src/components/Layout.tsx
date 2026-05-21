import React from 'react';
import { Outlet } from 'react-router-dom';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import GeminiChat from './GeminiChat';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-secondary/30">
      <TopHeader />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <GeminiChat />
    </div>
  );
};

export default Layout;
