import React from 'react';
import { motion } from 'framer-motion';
import type { QuizOption as QuizOptionType } from '../../types';

interface QuizOptionProps {
  option: QuizOptionType;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  disabled: boolean;
  onClick: () => void;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  index,
  isSelected,
  isCorrect,
  showFeedback,
  disabled,
  onClick,
}) => {
  // Determine the visual state
  const getStateStyles = () => {
    if (!showFeedback) {
      if (isSelected) {
        return 'bg-gradient-to-r from-neon-pink/30 to-electric-purple/30 border-neon-pink shadow-[0_0_20px_rgba(255,0,255,0.3)]';
      }
      return 'bg-white/5 border-white/20 hover:border-neon-cyan/50 hover:bg-white/10';
    }

    // Show feedback
    if (isCorrect) {
      return 'answer-correct bg-gradient-to-r from-vapor-success to-vapor-success-light border-vapor-success';
    }

    if (isSelected && !isCorrect) {
      return 'answer-incorrect bg-gradient-to-r from-vapor-error to-red-600 border-vapor-error';
    }

    // Not selected, not correct - dim it
    return 'bg-white/5 border-white/10 opacity-50';
  };

  return (
    <motion.button
      className={`
        w-full flex items-center gap-4 p-4
        border-2 rounded-xl
        text-left
        transition-all duration-300
        ${getStateStyles()}
        ${disabled ? 'cursor-default' : 'cursor-pointer'}
        touch-manipulation
      `}
      onClick={disabled ? undefined : onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      style={{ minHeight: '60px' }}
    >
      {/* Option Letter */}
      <div
        className={`
          flex-shrink-0 w-10 h-10 flex items-center justify-center
          rounded-lg font-display font-bold
          ${showFeedback && isCorrect
            ? 'bg-white/20 text-deep-purple'
            : showFeedback && isSelected && !isCorrect
            ? 'bg-white/20 text-white'
            : 'bg-white/10 text-white/70'
          }
        `}
      >
        {OPTION_LABELS[index]}
      </div>

      {/* Option Text */}
      <span
        className={`
          flex-1 font-medium
          ${showFeedback && isCorrect ? 'text-deep-purple' : 'text-white'}
        `}
      >
        {option.text}
      </span>

      {/* Feedback Icon */}
      {showFeedback && (
        <motion.span
          className="flex-shrink-0 text-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {isCorrect ? '✓' : isSelected ? '✗' : ''}
        </motion.span>
      )}
    </motion.button>
  );
};

export default QuizOption;
