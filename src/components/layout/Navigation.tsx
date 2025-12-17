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
      className="fixed bottom-0 left-0 right-0 z-40 bg-deep-purple/95 backdrop-blur-lg border-t border-neon-pink/20 safe-area-pb"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-lg mx-auto px-4">
        <ul className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="relative flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 to-transparent rounded-lg"
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.span
                    className={`text-2xl relative ${isActive ? 'scale-110' : ''}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.icon}

                    {/* Badge indicator */}
                    {item.badge && (
                      <motion.span
                        className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.span>

                  {/* Label */}
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-neon-pink' : 'text-white/50'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Glow effect for active */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-neon-pink rounded-full blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
