import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { ProgressBar } from '../ui';

export const Header: React.FC = () => {
  const { stats } = useUser();

  return (
    <motion.header
      className="sticky top-0 z-40 bg-[#1A0B2E]/90 backdrop-blur-xl border-b border-[#FF00FF]/30 shadow-[0_4px_30px_rgba(255,0,255,0.15)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF00FF]" />
      
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              🌊
            </motion.div>
            <div className="flex flex-col">
              <h1 className="font-display text-xl font-bold bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF00FF] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                KnowledgeWave
              </h1>
              <span className="text-[10px] text-[#00FFFF]/60 uppercase tracking-[0.3em] -mt-0.5">Learn Daily</span>
            </div>
          </Link>

          {/* Stats Summary */}
          <div className="flex items-center gap-3">
            {/* Streak */}
            {stats.currentStreak > 0 && (
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/40"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <motion.span 
                  className="text-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔥
                </motion.span>
                <span className="text-white font-bold text-sm">{stats.currentStreak}</span>
              </motion.div>
            )}

            {/* Level & XP */}
            <Link 
              to="/profile" 
              className="flex flex-col items-end min-w-[90px] px-3 py-1.5 rounded-xl bg-[#2D1B69]/50 border border-[#8000FF]/30 hover:border-[#8000FF]/60 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#00FFFF] text-[10px] font-display tracking-wider">LVL</span>
                <span className="text-white font-bold text-lg leading-none">{stats.level}</span>
              </div>
              <div className="w-full mt-1">
                <ProgressBar
                  value={stats.currentLevelProgress}
                  max={stats.currentLevelProgress + stats.pointsToNextLevel}
                  size="sm"
                  variant="xp"
                />
              </div>
            </Link>

            {/* Points */}
            <motion.div
              className="px-4 py-2 bg-gradient-to-r from-[#FF00FF]/20 to-[#8000FF]/20 rounded-xl border border-[#FF00FF]/40 shadow-[0_0_15px_rgba(255,0,255,0.2)]"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,0,255,0.4)' }}
            >
              <span className="text-[#FF00FF] font-mono text-sm font-bold neon-text-pink">
                {stats.totalPoints.toLocaleString()}
              </span>
              <span className="text-white/40 text-xs ml-1">pts</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
