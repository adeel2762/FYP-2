import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-slate-900/80 text-cyan-400 text-center p-2 md:p-4 border-t border-cyan-400 shadow-cyan-400/30 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <p className="text-xs md:text-sm">© 2025 DeepThreat. All rights reserved.</p>
        <div className="mt-1 md:mt-2 flex flex-wrap justify-center gap-2 md:gap-4">
          <Link 
            to="/privacy" 
            className="text-cyan-400 no-underline transition-all duration-300 hover:text-green-500 hover:shadow-green-500 text-xs md:text-sm"
            style={{ textShadow: '0 0 10px #00f7ff' }}
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-cyan-400 no-underline transition-all duration-300 hover:text-green-500 hover:shadow-green-500 text-xs md:text-sm"
            style={{ textShadow: '0 0 10px #00f7ff' }}
          >
            Terms of Service
          </Link>
          <Link 
            to="/contact" 
            className="text-cyan-400 no-underline transition-all duration-300 hover:text-green-500 hover:shadow-green-500 text-xs md:text-sm"
            style={{ textShadow: '0 0 10px #00f7ff' }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;