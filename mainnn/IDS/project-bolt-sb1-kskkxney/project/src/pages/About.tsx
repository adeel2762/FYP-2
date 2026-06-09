import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 md:px-5 py-8 md:py-20">
        <div className="bg-slate-900/80 border border-cyan-400 p-4 md:p-6 lg:p-8 rounded-lg w-full max-w-4xl text-left shadow-cyan-400/50 shadow-xl">
          <h2 
            className="text-2xl md:text-3xl mb-4 md:mb-6 text-cyan-400 text-center"
            style={{ textShadow: '0 0 10px #00f7ff' }}
          >
            About DeepThreat
          </h2>
          <div className="space-y-3 md:space-y-4 text-cyan-300 leading-relaxed text-sm md:text-base">
            <p>
              DeepThreat is an innovative intrusion detection system designed to secure smart home networks. 
              Leveraging advanced machine learning and deep learning techniques, DeepThreat monitors network 
              traffic in real-time to identify and classify potential security threats, ensuring the safety 
              of your connected devices.
            </p>
            <p>
              Our mission is to provide robust, user-friendly cybersecurity solutions for the modern smart home. 
              By analyzing network patterns and detecting anomalies, DeepThreat empowers users to protect their 
              privacy and maintain control over their IoT ecosystems.
            </p>
            <p>
              Developed as a Final Year Project, DeepThreat combines cutting-edge technology with a sleek, 
              cyberpunk-inspired interface to deliver a seamless and effective security experience.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;