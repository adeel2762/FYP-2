import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { getLatestTraffic, getAnomalyStats, startTrafficMonitoring, stopTrafficMonitoring, testEmailNotification, logoutUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface TrafficData {
  timestamp: string;
  src_ip: string;
  dest_ip: string;
  protocol: string;
  prediction: string;
}

interface AnomalyStats {
  total_traffic: number;
  total_anomalies: number;
  recent_anomalies_24h: number;
  active_users: number;
  anomaly_percentage: number;
  latest_anomalies: TrafficData[];
}

const Dashboard: React.FC = () => {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [anomalyStats, setAnomalyStats] = useState<AnomalyStats | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchTrafficData();
      fetchAnomalyStats();
      
      // Set up periodic data refresh
      const interval = setInterval(() => {
        fetchTrafficData();
        fetchAnomalyStats();
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchTrafficData = async () => {
    try {
      const data = await getLatestTraffic();
      setTrafficData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      setError('Failed to fetch traffic data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnomalyStats = async () => {
    try {
      const stats = await getAnomalyStats();
      setAnomalyStats(stats);
    } catch (error) {
      console.error('Error fetching anomaly stats:', error);
    }
  };

  const handleStartMonitoring = async () => {
    try {
      const response = await startTrafficMonitoring();
      if (response.status === 'success') {
        setIsMonitoring(true);
        alert('Traffic monitoring started successfully!');
      } else {
        alert('Failed to start monitoring: ' + response.message);
      }
    } catch (error) {
      console.error('Error starting monitoring:', error);
      alert('Error starting monitoring. Please try again.');
    }
  };

  const handleStopMonitoring = async () => {
    try {
      const response = await stopTrafficMonitoring();
      if (response.status === 'success') {
        setIsMonitoring(false);
        alert('Traffic monitoring stopped.');
      } else {
        alert('Failed to stop monitoring: ' + response.message);
      }
    } catch (error) {
      console.error('Error stopping monitoring:', error);
      alert('Error stopping monitoring. Please try again.');
    }
  };

  const handleTestEmail = async () => {
    try {
      const response = await testEmailNotification();
      if (response.status === 'success') {
        alert(response.message);
      } else {
        alert('Failed to send test email: ' + response.message);
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      alert('Error sending test email. Please check your email configuration.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      logout(); // Force logout even if API call fails
      navigate('/');
    }
  };

  const getRowColor = (prediction: string) => {
    const anomalyKeywords = ['anomaly', 'attack', 'malicious', 'intrusion', 'suspicious', 'dos', 'ddos', 'malware'];
    const isAnomaly = anomalyKeywords.some(keyword => prediction.toLowerCase().includes(keyword));
    return isAnomaly ? 'bg-red-900/50 border-red-500' : 'bg-slate-800/50';
  };

  if (loading) {
    return (
      <Layout isAuthenticated={true}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-cyan-400 text-xl">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isAuthenticated={true}>
      <div className="px-2 md:px-4 lg:px-5 py-4 md:py-8">
        {/* Header with user info and controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 
            className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-0 text-cyan-400 text-center"
            style={{ textShadow: '0 0 10px #00f7ff' }}
          >
            🚀 IDS Dashboard
          </h2>
          
          <div className="flex flex-wrap gap-2 md:gap-4">
            <span className="text-cyan-400 text-sm md:text-base">
              Welcome, {currentUser}!
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        {anomalyStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800 border border-cyan-400 p-4 rounded-lg">
              <h3 className="text-cyan-400 text-lg mb-2">Total Traffic</h3>
              <p className="text-2xl text-white">{anomalyStats.total_traffic}</p>
            </div>
            <div className="bg-slate-800 border border-red-400 p-4 rounded-lg">
              <h3 className="text-red-400 text-lg mb-2">Total Anomalies</h3>
              <p className="text-2xl text-white">{anomalyStats.total_anomalies}</p>
            </div>
            <div className="bg-slate-800 border border-yellow-400 p-4 rounded-lg">
              <h3 className="text-yellow-400 text-lg mb-2">Recent (24h)</h3>
              <p className="text-2xl text-white">{anomalyStats.recent_anomalies_24h}</p>
            </div>
            <div className="bg-slate-800 border border-green-400 p-4 rounded-lg">
              <h3 className="text-green-400 text-lg mb-2">Active Users</h3>
              <p className="text-2xl text-white">{anomalyStats.active_users}</p>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <button
            onClick={handleStartMonitoring}
            disabled={isMonitoring}
            className={`px-4 py-2 rounded text-white ${
              isMonitoring 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isMonitoring ? 'Monitoring Active' : 'Start Monitoring'}
          </button>
          
          <button
            onClick={handleStopMonitoring}
            disabled={!isMonitoring}
            className={`px-4 py-2 rounded text-white ${
              !isMonitoring 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Stop Monitoring
          </button>
          
          <button
            onClick={handleTestEmail}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Test Email Alert
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 p-4 rounded-lg mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Traffic Data Table */}
        <div className="bg-slate-900/80 border border-cyan-400 rounded-lg p-4 md:p-6 shadow-cyan-400/20 shadow-lg">
          <h3 
            className="text-lg md:text-xl mb-4 text-cyan-400"
            style={{ textShadow: '0 0 5px #00f7ff' }}
          >
            � Recent Network Traffic
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-cyan-400">
                  <th className="text-left p-2 md:p-3 text-cyan-400 font-mono">Timestamp</th>
                  <th className="text-left p-2 md:p-3 text-cyan-400 font-mono">Source IP</th>
                  <th className="text-left p-2 md:p-3 text-cyan-400 font-mono">Dest IP</th>
                  <th className="text-left p-2 md:p-3 text-cyan-400 font-mono">Protocol</th>
                  <th className="text-left p-2 md:p-3 text-cyan-400 font-mono">Prediction</th>
                </tr>
              </thead>
              <tbody>
                {trafficData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-400">
                      No traffic data available. Start monitoring to see live data.
                    </td>
                  </tr>
                ) : (
                  trafficData.map((traffic, index) => (
                    <tr 
                      key={index}
                      className={`border-b border-slate-600 hover:bg-slate-700/50 ${getRowColor(traffic.prediction)}`}
                    >
                      <td className="p-2 md:p-3 text-green-400 font-mono text-xs md:text-sm">
                        {traffic.timestamp}
                      </td>
                      <td className="p-2 md:p-3 text-cyan-400 font-mono">
                        {traffic.src_ip}
                      </td>
                      <td className="p-2 md:p-3 text-cyan-400 font-mono">
                        {traffic.dest_ip}
                      </td>
                      <td className="p-2 md:p-3 text-yellow-400 font-mono">
                        {traffic.protocol}
                      </td>
                      <td className="p-2 md:p-3 font-mono">
                        <span className={`px-2 py-1 rounded text-xs ${
                          getRowColor(traffic.prediction) === 'bg-red-900/50 border-red-500'
                            ? 'bg-red-600 text-white'
                            : 'bg-green-600 text-white'
                        }`}>
                          {traffic.prediction}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Anomalies Section */}
        {anomalyStats && anomalyStats.latest_anomalies.length > 0 && (
          <div className="mt-6 bg-red-900/20 border border-red-500 rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl mb-4 text-red-400">
              🚨 Recent Anomalies
            </h3>
            <div className="space-y-2">
              {anomalyStats.latest_anomalies.map((anomaly, index) => (
                <div key={index} className="bg-red-900/30 border border-red-600 p-3 rounded">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-red-400">
                      {anomaly.timestamp}
                    </span>
                    <span className="text-cyan-400">
                      {anomaly.src_ip} → {anomaly.dest_ip}
                    </span>
                    <span className="text-yellow-400">
                      {anomaly.protocol}
                    </span>
                    <span className="text-red-400 font-bold">
                      {anomaly.prediction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Traffic Data Table (for larger screens) */}
        <div className="bg-slate-900/80 border border-cyan-400 rounded-lg overflow-hidden shadow-cyan-400/50 shadow-xl max-w-7xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-cyan-400 min-w-[600px]">
              <thead>
                <tr className="bg-slate-950/90 border-b border-cyan-400">
                  <th 
                    className="p-2 md:p-3 lg:p-4 text-left text-cyan-400 text-xs md:text-sm lg:text-base"
                    style={{ textShadow: '0 0 10px #00f7ff' }}
                  >
                    Timestamp
                  </th>
                  <th 
                    className="p-2 md:p-3 lg:p-4 text-left text-cyan-400 text-xs md:text-sm lg:text-base"
                    style={{ textShadow: '0 0 10px #00f7ff' }}
                  >
                    Source IP
                  </th>
                  <th 
                    className="p-2 md:p-3 lg:p-4 text-left text-cyan-400 text-xs md:text-sm lg:text-base"
                    style={{ textShadow: '0 0 10px #00f7ff' }}
                  >
                    Destination IP
                  </th>
                  <th 
                    className="p-2 md:p-3 lg:p-4 text-left text-cyan-400 text-xs md:text-sm lg:text-base"
                    style={{ textShadow: '0 0 10px #00f7ff' }}
                  >
                    Protocol
                  </th>
                  <th 
                    className="p-2 md:p-3 lg:p-4 text-left text-cyan-400 text-xs md:text-sm lg:text-base"
                    style={{ textShadow: '0 0 10px #00f7ff' }}
                  >
                    Prediction
                  </th>
                </tr>
              </thead>
              <tbody>
                {trafficData.map((traffic, index) => (
                  <tr 
                    key={index}
                    className="border-b border-cyan-400/20 transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-cyan-400/30 hover:shadow-lg"
                  >
                    <td className="p-2 md:p-3 text-xs md:text-sm lg:text-base">{traffic.timestamp}</td>
                    <td className="p-2 md:p-3 text-xs md:text-sm lg:text-base">{traffic.src_ip}</td>
                    <td className="p-2 md:p-3 text-xs md:text-sm lg:text-base">{traffic.dest_ip}</td>
                    <td className="p-2 md:p-3 text-xs md:text-sm lg:text-base">{traffic.protocol}</td>
                    <td 
                      className={`p-2 md:p-3 font-bold text-xs md:text-sm lg:text-base ${
                        traffic.prediction.includes('Normal') 
                          ? 'text-green-500' 
                          : 'text-red-500'
                      }`}
                      style={{
                        textShadow: traffic.prediction.includes('Normal') 
                          ? '0 0 10px #0f0' 
                          : '0 0 10px #ff5252'
                      }}
                    >
                      {traffic.prediction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Mobile-friendly note */}
        <div className="mt-4 text-center text-cyan-400/70 text-xs md:hidden">
          <p>Scroll horizontally to view all data</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;