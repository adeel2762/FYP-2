import React from 'react';
import MatrixBackground from './MatrixBackground';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated = false }) => {
  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono overflow-x-hidden overflow-y-auto flex flex-col">
      <MatrixBackground />
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="relative z-10 flex-1 pt-16 md:pt-20 pb-16 md:pb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;