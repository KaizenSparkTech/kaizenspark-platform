import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, Zap } from 'lucide-react';

const LiveDashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [users, setUsers] = useState(0);
  const [apiResponse, setApiResponse] = useState(0);
  const [automation, setAutomation] = useState(0);

  useEffect(() => {
    // Animate numbers
    const revenueTarget = 245800;
    const usersTarget = 12450;
    const apiTarget = 98.5;
    const automationTarget = 1247;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      setRevenue(Math.floor(eased * revenueTarget));
      setUsers(Math.floor(eased * usersTarget));
      setApiResponse(parseFloat((eased * apiTarget).toFixed(1)));
      setAutomation(Math.floor(eased * automationTarget));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Generate smooth wave data points
  const generateWavePoints = (segments: number, amplitude: number, frequency: number) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 100;
      const y = 50 + Math.sin((i / segments) * Math.PI * frequency) * amplitude + Math.random() * 10;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const mainChartPoints = generateWavePoints(30, 20, 2);
  const apiChartPoints = generateWavePoints(15, 8, 1.5);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-full max-w-2xl"
    >
      {/* Main dashboard container */}
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-black/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Top stats row */}
        <div className="relative grid grid-cols-2 gap-4 mb-6">
          {/* Active Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 group hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-slate-500">Active Users</p>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{users.toLocaleString()}</p>
            <p className="text-xs text-cyan-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last month
            </p>
          </motion.div>

          {/* Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 group hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <p className="text-xs text-slate-500">Revenue</p>
            </div>
            <p className="text-3xl font-bold text-white mb-1">${revenue.toLocaleString()}</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +18% from last month
            </p>
          </motion.div>
        </div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative bg-slate-950/30 backdrop-blur-sm border border-slate-800/30 rounded-xl p-4 mb-4 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-500">Performance Metrics</p>
              <p className="text-sm font-semibold text-white">Last 6 months</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>Live</span>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="relative h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />

              {/* Gradient fill */}
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <motion.polygon
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                points={`0,100 ${mainChartPoints} 100,100`}
                fill="url(#chartGradient)"
              />

              {/* Main line */}
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
                points={mainChartPoints}
                fill="none"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing dots */}
              {[20, 40, 60, 80].map((x, i) => (
                <motion.circle
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  cx={x}
                  cy={50 + Math.sin((x / 100) * Math.PI * 2) * 20}
                  r="2"
                  fill="rgb(59, 130, 246)"
                  className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                />
              ))}
            </svg>

            {/* Month labels */}
            <div className="flex justify-between mt-2 text-[10px] text-slate-600">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats row */}
        <div className="relative grid grid-cols-2 gap-4">
          {/* API Response */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 group hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <p className="text-xs text-slate-500">API Response</p>
            </div>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-white">{apiResponse}%</p>
              {/* Mini chart */}
              <svg className="w-16 h-8 mb-1" viewBox="0 0 100 50" preserveAspectRatio="none">
                <motion.polyline
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.3, duration: 1.5 }}
                  points={apiChartPoints}
                  fill="none"
                  stroke="rgb(168, 85, 247)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Automation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 group hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <p className="text-xs text-slate-500">Automation</p>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{automation.toLocaleString()}</p>
            <p className="text-xs text-cyan-400">Tasks completed</p>
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              y: [null, Math.random() * -50 - 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LiveDashboard;
