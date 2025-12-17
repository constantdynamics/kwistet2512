import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { ProgressBar } from '../ui';

export const Header: React.FC = () => {
  const location = useLocation();
  const { stats } = useUser();

  return (
    <motion.header
      className="sticky top-0 z-40 bg-deep-purple/80 backdrop-blur-lg border-b border-neon-pink/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🌊
            </motion.div>
            <h1 className="font-display text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
              KnowledgeWave
            </h1>
          </Link>

          {/* Stats Summary */}
          <div className="flex items-center gap-4">
            {/* Streak */}
            {stats.currentStreak > 0 && (
              <motion.div
                className="flex items-center gap-1 text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <span className="text-orange-400">🔥</span>
                <span className="text-white font-semibold">{stats.currentStreak}</span>
              </motion.div>
            )}

            {/* Level & XP */}
            <Link to="/profile" className="flex flex-col items-end min-w-[100px]">
              <div className="flex items-center gap-2">
                <span className="text-neon-cyan text-xs font-display">LVL</span>
                <span className="text-white font-bold">{stats.level}</span>
              </div>
              <div className="w-full">
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
              className="px-3 py-1 bg-gradient-to-r from-neon-pink/20 to-electric-purple/20 rounded-full border border-neon-pink/30"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-neon-pink font-mono text-sm font-bold">
                {stats.totalPoints.toLocaleString()}
              </span>
              <span className="text-white/50 text-xs ml-1">pts</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
