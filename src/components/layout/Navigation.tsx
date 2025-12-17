import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { checkQuizAvailability } from '../../utils/quiz';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  badge?: number | string;
}

export const Navigation: React.FC = () => {
  const location = useLocation();
  
  const quizAvailability = checkQuizAvailability();

  const navItems: NavItem[] = [
    { to: '/', icon: '📚', label: 'Feitjes' },
    {
      to: '/quiz',
      icon: '🎯',
      label: 'Quiz',
      badge: quizAvailability.canTakeQuiz ? '!' : undefined,
    },
    { to: '/badges', icon: '🏆', label: 'Badges' },
    { to: '/profile', icon: '👤', label: 'Profiel' },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A0B2E]/95 backdrop-blur-xl border-t border-[#FF00FF]/30 shadow-[0_-4px_30px_rgba(255,0,255,0.15)]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FFFF]/50 to-transparent" />

      <div className="w-full max-w-2xl mx-auto px-4">
        <ul className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <li key={item.to} className="flex-1">
                <NavLink
                  to={item.to}
                  className="relative flex flex-col items-center gap-1.5 py-2 transition-all duration-300"
                >
                  {/* Active background glow */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#FF00FF]/20 via-[#FF00FF]/5 to-transparent rounded-xl"
                      layoutId="nav-active-bg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className={`text-2xl ${isActive ? 'filter drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]' : ''}`}>
                      {item.icon}
                    </span>

                    {/* Badge */}
                    {item.badge && (
                      <motion.span
                        className="absolute -top-1 -right-2 w-4 h-4 bg-gradient-to-br from-[#FF00FF] to-[#FF0080] rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,0,255,0.8)]"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'text-[#FF00FF] drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FF00FF] rounded-full shadow-[0_0_10px_rgba(255,0,255,1)]"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;
