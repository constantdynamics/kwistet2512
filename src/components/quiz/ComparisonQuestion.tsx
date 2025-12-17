import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui';

interface ComparisonQuestionProps {
  question: string;
  itemA: {
    name: string;
    image?: string;
    emoji?: string;
  };
  itemB: {
    name: string;
    image?: string;
    emoji?: string;
  };
  correctAnswer: 'A' | 'B';
  comparison: string; // e.g., "ouder", "groter", "sneller"
  explanation?: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const ComparisonQuestion: React.FC<ComparisonQuestionProps> = ({
  question,
  itemA,
  itemB,
  correctAnswer,
  comparison,
  explanation,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectAnswer = (answer: 'A' | 'B') => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  const renderItem = (item: typeof itemA, label: 'A' | 'B') => {
    const isSelected = selectedAnswer === label;
    const isCorrectOption = label === correctAnswer;

    let stateClass = 'border-white/20 hover:border-neon-cyan/50';

    if (showFeedback) {
      if (isCorrectOption) {
        stateClass = 'border-vapor-success shadow-[0_0_30px_rgba(0,255,65,0.5)]';
      } else if (isSelected && !isCorrectOption) {
        stateClass = 'border-vapor-error';
      } else {
        stateClass = 'border-white/10 opacity-50';
      }
    } else if (isSelected) {
      stateClass = 'border-neon-pink shadow-[0_0_20px_rgba(255,0,255,0.5)]';
    }

    return (
      <motion.button
        onClick={() => handleSelectAnswer(label)}
        disabled={showFeedback}
        className={`
          flex-1 p-6 rounded-2xl
          bg-white/5 border-2
          transition-all duration-300
          ${stateClass}
          ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
        `}
        whileHover={!showFeedback ? { scale: 1.02 } : undefined}
        whileTap={!showFeedback ? { scale: 0.98 } : undefined}
      >
        {/* Image or Emoji */}
        <div className="text-6xl mb-4">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl mx-auto"
            />
          ) : (
            item.emoji || '❓'
          )}
        </div>

        {/* Name */}
        <h3 className={`
          font-display font-bold text-lg
          ${showFeedback && isCorrectOption ? 'text-vapor-success' : 'text-white'}
        `}>
          {item.name}
        </h3>

        {/* Feedback indicator */}
        {showFeedback && (
          <motion.div
            className="mt-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            {isCorrectOption ? (
              <span className="text-2xl">✓</span>
            ) : isSelected ? (
              <span className="text-2xl">✗</span>
            ) : null}
          </motion.div>
        )}
      </motion.button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <Card variant="elevated" padding="lg">
        <div className="text-center">
          <span className="text-3xl mb-2 block">⚔️</span>
          <h2 className="text-xl font-display font-bold text-white">
            {question}
          </h2>
          <p className="text-white/60 text-sm mt-2">
            Wat is {comparison}?
          </p>
        </div>
      </Card>

      {/* VS Battle */}
      <div className="flex gap-4 items-stretch">
        {renderItem(itemA, 'A')}

        {/* VS Badge */}
        <div className="flex items-center">
          <motion.div
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-neon-pink to-electric-purple font-display font-black text-white text-sm"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VS
          </motion.div>
        </div>

        {renderItem(itemB, 'B')}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <>
            <motion.div
              className={`
                text-center py-4 px-6 rounded-lg font-display font-bold text-lg
                ${isCorrect
                  ? 'bg-vapor-success/20 text-vapor-success border border-vapor-success/30'
                  : 'bg-vapor-error/20 text-vapor-error border border-vapor-error/30'
                }
              `}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {isCorrect
                ? `Correct! ${correctAnswer === 'A' ? itemA.name : itemB.name} is ${comparison}!`
                : `Helaas! ${correctAnswer === 'A' ? itemA.name : itemB.name} is ${comparison}.`
              }
            </motion.div>

            {explanation && (
              <motion.div
                className="p-4 bg-white/5 rounded-lg border border-white/10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p className="text-sm text-white/70">
                  <span className="text-neon-cyan font-semibold">Uitleg: </span>
                  {explanation}
                </p>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparisonQuestion;
