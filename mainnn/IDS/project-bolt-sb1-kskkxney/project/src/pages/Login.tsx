import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/api';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(formData);
      
      if (response.ok) {
        // Login successful
        login(formData.username);
        navigate('/dashboard');
      } else {
        // Handle error response
        const errorText = await response.text();
        if (errorText.includes('Invalid username or password')) {
          setError('Invalid username or password');
        } else {
          setError('Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-center px-4 md:px-5 py-8 md:py-20">
        {/* Rotating Circles Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 hidden md:block">
          <div className="relative w-60 md:w-80 h-60 md:h-80">
            <div 
              className="absolute w-full h-full rounded-full animate-spin"
              style={{
                background: 'conic-gradient(from 0deg, transparent, #00f7ff, transparent)',
                animationDuration: '7s'
              }}
            />
            <div 
              className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin"
              style={{
                background: 'conic-gradient(from 0deg, transparent, #0f0, transparent)',
                animationDuration: '7s',
                animationDirection: 'reverse'
              }}
            />
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-slate-900/80 border border-cyan-400 p-4 md:p-6 lg:p-8 rounded-lg w-full max-w-md text-center relative z-10 shadow-cyan-400/50 shadow-xl">
          <h2 
            className="text-2xl md:text-3xl mb-4 md:mb-6 text-cyan-400"
            style={{ textShadow: '0 0 10px #00f7ff' }}
          >
            Login
          </h2>
          
          {error && (
            <p className="text-red-500 mb-3 md:mb-4 text-sm md:text-base">
              {error}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 md:p-3 mt-3 md:mt-4 border-2 rounded text-base md:text-lg font-mono cursor-pointer transition-all duration-300 ${
                loading 
                  ? 'bg-gray-500 border-gray-500 text-gray-300 cursor-not-allowed' 
                  : 'bg-cyan-400 border-cyan-400 text-black hover:bg-transparent hover:text-green-500 hover:border-green-500 hover:shadow-green-500/50 hover:shadow-xl'
              }`}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>
          
          <p className="mt-3 md:mt-4 text-cyan-400 text-sm md:text-base">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-green-500 no-underline hover:text-green-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;