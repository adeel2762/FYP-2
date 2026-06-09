import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  useEffect(() => {
    // Glitch effect for panels
    const interval = setInterval(() => {
      const panels = document.querySelectorAll('.panel');
      panels.forEach(panel => {
        if (Math.random() > 0.9) {
          (panel as HTMLElement).style.transform = `translateX(${Math.random() * 4 - 2}px)`;
          setTimeout(() => {
            (panel as HTMLElement).style.transform = 'translateX(0)';
          }, 50);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container relative z-10 px-4 md:px-8">
        <section className="relative text-center mb-8 md:mb-12 p-8 md:p-20 rounded-lg overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70 blur-sm"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
            }}
          />
          <div className="relative z-10">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-cyan-400 animate-pulse"
              style={{ 
                textShadow: '0 0 20px #00f7ff, 0 0 30px #00f7ff, 0 0 40px #00f7ff',
                animation: 'neonGlow 2s ease-in-out infinite alternate'
              }}
            >
              Cybersecurity Reinvented
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-cyan-300 px-4">
              Real-time threat detection and network monitoring at your fingertips.
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-6 md:px-8 py-2 md:py-3 text-lg md:text-xl text-black bg-cyan-400 border-2 border-cyan-400 rounded transition-all duration-300 no-underline hover:bg-transparent hover:text-green-500 hover:border-green-500"
              style={{
                boxShadow: '0 0 10px #00f7ff, 0 0 20px #00f7ff'
              }}
            >
              Explore Dashboard
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 p-2 md:p-4">
          <div className="panel bg-slate-900/80 border border-cyan-400 p-4 md:p-6 rounded relative overflow-hidden transition-all duration-300 hover:border-green-500 hover:shadow-cyan-400/50 hover:shadow-lg">
            <div className="relative z-10 bg-slate-950/90 p-3 md:p-4 rounded">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-cyan-400">REAL-TIME MONITORING</h3>
              <div className="h-2.5 bg-slate-800 mb-4 rounded overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded"
                  style={{ 
                    width: '75%',
                    boxShadow: '0 0 10px #0f0'
                  }}
                />
              </div>
              <p className="text-sm md:text-base text-cyan-300">Continuous surveillance for instant threat detection.</p>
            </div>
          </div>

          <div className="panel bg-slate-900/80 border border-cyan-400 p-4 md:p-6 rounded relative overflow-hidden transition-all duration-300 hover:border-green-500 hover:shadow-cyan-400/50 hover:shadow-lg">
            <div className="relative z-10 bg-slate-950/90 p-3 md:p-4 rounded">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-cyan-400">ADVANCED THREAT DETECTION</h3>
              <div className="h-2.5 bg-slate-800 mb-4 rounded overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded"
                  style={{ 
                    width: '90%',
                    boxShadow: '0 0 10px #0f0'
                  }}
                />
              </div>
              <p className="text-sm md:text-base text-cyan-300">Utilizing AI for proactive threat detection.</p>
            </div>
          </div>

          <div className="panel bg-slate-900/80 border border-cyan-400 p-4 md:p-6 rounded relative overflow-hidden transition-all duration-300 hover:border-green-500 hover:shadow-cyan-400/50 hover:shadow-lg md:col-span-2 lg:col-span-1">
            <div className="relative z-10 bg-slate-950/90 p-3 md:p-4 rounded">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-cyan-400">SEAMLESS INTEGRATION</h3>
              <div className="h-2.5 bg-slate-800 mb-4 rounded overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded"
                  style={{ 
                    width: '90%',
                    boxShadow: '0 0 10px #0f0'
                  }}
                />
              </div>
              <p className="text-sm md:text-base text-cyan-300">Effortlessly integrates with our IDS to enhance threat detection.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes neonGlow {
          from {
            text-shadow: 0 0 10px #00f7ff, 0 0 20px #00f7ff, 0 0 30px #00f7ff;
          }
          to {
            text-shadow: 0 0 20px #00f7ff, 0 0 30px #00f7ff, 0 0 40px #00f7ff;
          }
        }
        
        .panel::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, #00f7ff, transparent);
          animation: animate 4s linear infinite;
        }
        
        @keyframes animate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

export default Home;