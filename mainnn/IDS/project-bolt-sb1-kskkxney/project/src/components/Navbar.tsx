import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated: propIsAuthenticated }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated: contextIsAuthenticated } = useAuth();
  
  // Use prop if provided, otherwise use context
  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : contextIsAuthenticated;

  const navLinkClass = `
    text-cyan-400 no-underline text-base md:text-lg transition-all duration-300 relative
    hover:text-green-500 hover:scale-110
    after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 
    after:left-0 after:bg-green-500 after:transition-all after:duration-300
    hover:after:w-full
  `;

  const logoClass = `
    text-xl md:text-2xl text-cyan-400 no-underline transition-all duration-300 relative
    hover:text-green-500 hover:scale-110
    after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 
    after:left-0 after:bg-green-500 after:transition-all after:duration-300
    hover:after:w-full
  `;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 py-3 md:py-4 bg-slate-900/30 border-b border-cyan-400 shadow-cyan-400/20 shadow-lg z-50">
      <Link 
        to="/" 
        className={logoClass}
        style={{ textShadow: '0 0 10px #00f7ff' }}
      >
        DeepThreat
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 lg:gap-8">
        {!isAuthenticated ? (
          <>
            <Link 
              to="/login" 
              className={navLinkClass}
              style={{ textShadow: location.pathname === '/login' ? '0 0 15px #0f0' : '0 0 10px #00f7ff' }}
            >
              LOGIN
            </Link>
            <Link 
              to="/signup" 
              className={navLinkClass}
            >
              SIGN UP
            </Link>
          </>
        ) : (
          <Link 
            to="/dashboard" 
            className={navLinkClass}
          >
            DASHBOARD
          </Link>
        )}
        <Link 
          to="/about" 
          className={navLinkClass}
        >
          ABOUT US
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-cyan-400 hover:text-green-500 transition-colors duration-300 p-2"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Navigation */}
      <div className={`
        md:hidden fixed top-16 left-0 w-full bg-slate-900/95 border-b border-cyan-400 
        transition-all duration-300 ease-in-out z-40
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="flex flex-col gap-4 p-6">
          {!isAuthenticated ? (
            <>
              <Link 
                to="/login" 
                className={`${navLinkClass} text-center py-2`}
                style={{ textShadow: location.pathname === '/login' ? '0 0 15px #0f0' : '0 0 10px #00f7ff' }}
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
              <Link 
                to="/signup" 
                className={`${navLinkClass} text-center py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                SIGN UP
              </Link>
            </>
          ) : (
            <Link 
              to="/dashboard" 
              className={`${navLinkClass} text-center py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              DASHBOARD
            </Link>
          )}
          <Link 
            to="/about" 
            className={`${navLinkClass} text-center py-2`}
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT US
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;