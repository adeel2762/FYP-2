import React, { useState } from 'react';
import Layout from '../components/Layout';
import { submitContactForm } from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await submitContactForm(formData);
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorText = await response.text();
        if (errorText.includes('All fields are required')) {
          setError('All fields are required');
        } else if (errorText.includes('Invalid email address')) {
          setError('Invalid email address');
        } else {
          setError('Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
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
            Contact Us
          </h2>
          
          {submitted && (
            <p className="text-green-500 mb-3 md:mb-4 text-sm md:text-base">
              Message sent successfully! We'll get back to you soon.
            </p>
          )}

          {error && (
            <p className="text-red-500 mb-3 md:mb-4 text-sm md:text-base">
              {error}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-cyan-400 rounded bg-slate-950/90 text-cyan-400 font-mono outline-none resize-vertical transition-all duration-300 focus:border-green-500 focus:shadow-green-500/50 focus:shadow-lg text-sm md:text-base md:rows-4"
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
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;