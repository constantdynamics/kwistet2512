import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../ui';

interface SequenceQuestionProps {
  sequence: (string | number)[];
  missingIndex: number;
  options: (string | number)[];
  correctAnswer: number;
  explanation?: string;
  patternHint?: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const SequenceQuestion: React.FC<SequenceQuestionProps> = ({
  sequence,
  missingIndex,
  options,
  correctAnswer,
  explanation,
  patternHint,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    const correct = index === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-xl font-display font-bold text-white mb-2">
          Wat komt er op de plaats van het vraagteken?
        </h2>
        {patternHint && (
          <p className="text-white/60 text-sm">
            Hint: {patternHint}
          </p>
        )}
      </Card>

      {/* Sequence Display */}
      <Card padding="lg">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {sequence.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="text-white/30 text-2xl mx-1">→</span>
              )}
              <motion.div
                className={`
                  min-w-[60px] h-16 flex items-center justify-center
                  rounded-xl font-display font-bold text-xl
                  ${index === missingIndex
                    ? showFeedback
                      ? isCorrect
                        ? 'bg-vapor-success/30 border-2 border-vapor-success text-vapor-success'
                        : 'bg-vapor-error/30 border-2 border-vapor-error text-vapor-error'
                      : 'bg-neon-pink/20 border-2 border-neon-pink border-dashed text-neon-pink'
                    : 'bg-white/10 border-2 border-white/20 text-white'
                  }
                `}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {index === missingIndex ? (
                  showFeedback ? (
                    options[correctAnswer]
                  ) : (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ?
                    </motion.span>
                  )
                ) : (
                  item
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === correctAnswer;

          let stateClass = 'bg-white/5 border-white/20 hover:border-neon-cyan/50';

          if (showFeedback) {
            if (isCorrectOption) {
              stateClass = 'bg-vapor-success/20 border-vapor-success';
            } else if (isSelected && !isCorrectOption) {
              stateClass = 'bg-vapor-error/20 border-vapor-error';
            } else {
              stateClass = 'bg-white/5 border-white/10 opacity-50';
            }
          } else if (isSelected) {
            stateClass = 'bg-neon-pink/20 border-neon-pink';
          }

          return (
            <motion.button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={showFeedback}
              className={`
                p-4 border-2 rounded-xl text-center
                font-display font-bold text-xl
                transition-all duration-200
                ${stateClass}
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={!showFeedback ? { scale: 1.02 } : undefined}
              whileTap={!showFeedback ? { scale: 0.98 } : undefined}
            >
              <span className={showFeedback && isCorrectOption ? 'text-vapor-success' : 'text-white'}>
                {option}
              </span>
              {showFeedback && (
                <span className="ml-2">
                  {isCorrectOption ? '✓' : isSelected ? '✗' : ''}
                </span>
              )}
            </motion.button>
          );
        })}
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
              {isCorrect ? 'Correct! Je herkende het patroon!' : 'Helaas, dat is niet het juiste patroon'}
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

export default SequenceQuestion;
