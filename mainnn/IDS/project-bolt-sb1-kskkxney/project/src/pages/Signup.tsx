import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { signUpUser } from '../services/api';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await signUpUser(signupData);
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorText = await response.text();
        if (errorText.includes('Username already taken')) {
          setError('Username already taken');
        } else if (errorText.includes('Email already registered')) {
          setError('Email already registered');
        } else if (errorText.includes('Password must be at least 8 characters')) {
          setError('Password must be at least 8 characters');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 md:px-5 py-8 md:py-20">
        <div className="bg-slate-900/80 border border-cyan-400 p-4 md:p-6 lg:p-8 rounded-lg w-full max-w-md text-center shadow-cyan-400/50 shadow-xl">
          <h2 
            className="text-2xl md:text-3xl mb-4 md:mb-6 text-cyan-400"
            style={{ textShadow: '0 0 10px #00f7ff' }}
          >
            Sign Up
          </h2>
          
          {error && (
            <p className="text-red-500 mb-3 md:mb-4 text-sm md:text-base">
              {error}
            </p>
          )}
          
          {success && (
            <p className="text-green-500 mb-3 md:mb-4 text-sm md:text-base">
              Account created successfully!
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
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
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 characters)"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
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
              {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
            </button>
          </form>
          
          <p className="mt-3 md:mt-4 text-cyan-400 text-sm md:text-base">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-green-500 no-underline hover:text-green-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;