import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useGame } from '../../contexts/GameContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isScreenShaking, showScorePopup, scorePopupValue } = useGame();

  return (
    <div
      className={`
        min-h-screen flex flex-col
        ${isScreenShaking ? 'screen-shake' : ''}
      `}
    >
      <Header />

      <main className="flex-1 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation />

      {/* Score Popup Animation */}
      <AnimatePresence>
        {showScorePopup && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-4xl font-display font-black text-vapor-success neon-text-cyan">
              +{scorePopupValue}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
