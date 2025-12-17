import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui';

interface TrueFalseQuestionProps {
  statement: string;
  isTrue: boolean;
  explanation: string;
  source?: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  statement,
  isTrue,
  explanation,
  source,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectAnswer = (answer: boolean) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const correct = answer === isTrue;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="text-center">
        <motion.span
          className="text-4xl inline-block"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🤔
        </motion.span>
        <h2 className="text-lg font-display font-bold text-neon-cyan mt-2">
          Waar of Niet Waar?
        </h2>
      </div>

      {/* Statement */}
      <Card variant="elevated" padding="lg">
        <p className="text-xl text-white text-center leading-relaxed font-medium">
          "{statement}"
        </p>
      </Card>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* TRUE Button */}
        <motion.button
          onClick={() => handleSelectAnswer(true)}
          disabled={showFeedback}
          className={`
            p-6 rounded-2xl border-2
            transition-all duration-300
            ${showFeedback
              ? isTrue
                ? 'bg-vapor-success/30 border-vapor-success'
                : selectedAnswer === true
                  ? 'bg-vapor-error/30 border-vapor-error'
                  : 'bg-white/5 border-white/10 opacity-50'
              : selectedAnswer === true
                ? 'bg-vapor-success/20 border-vapor-success'
                : 'bg-white/5 border-white/20 hover:border-vapor-success/50 hover:bg-vapor-success/10'
            }
            ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
          `}
          whileHover={!showFeedback ? { scale: 1.02 } : undefined}
          whileTap={!showFeedback ? { scale: 0.98 } : undefined}
        >
          <motion.span
            className="text-4xl block mb-2"
            animate={showFeedback && isTrue ? { scale: [1, 1.3, 1] } : undefined}
            transition={{ duration: 0.5 }}
          >
            ✓
          </motion.span>
          <span className={`
            font-display font-bold text-lg
            ${showFeedback && isTrue ? 'text-vapor-success' : 'text-white'}
          `}>
            WAAR
          </span>
        </motion.button>

        {/* FALSE Button */}
        <motion.button
          onClick={() => handleSelectAnswer(false)}
          disabled={showFeedback}
          className={`
            p-6 rounded-2xl border-2
            transition-all duration-300
            ${showFeedback
              ? !isTrue
                ? 'bg-vapor-success/30 border-vapor-success'
                : selectedAnswer === false
                  ? 'bg-vapor-error/30 border-vapor-error'
                  : 'bg-white/5 border-white/10 opacity-50'
              : selectedAnswer === false
                ? 'bg-vapor-error/20 border-vapor-error'
                : 'bg-white/5 border-white/20 hover:border-vapor-error/50 hover:bg-vapor-error/10'
            }
            ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
          `}
          whileHover={!showFeedback ? { scale: 1.02 } : undefined}
          whileTap={!showFeedback ? { scale: 0.98 } : undefined}
        >
          <motion.span
            className="text-4xl block mb-2"
            animate={showFeedback && !isTrue ? { scale: [1, 1.3, 1] } : undefined}
            transition={{ duration: 0.5 }}
          >
            ✗
          </motion.span>
          <span className={`
            font-display font-bold text-lg
            ${showFeedback && !isTrue ? 'text-vapor-success' : 'text-white'}
          `}>
            NIET WAAR
          </span>
        </motion.button>
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
                ? 'Correct!'
                : `Helaas! Dit is ${isTrue ? 'waar' : 'niet waar'}.`
              }
            </motion.div>

            <motion.div
              className="p-4 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <p className="text-sm text-white/70">
                <span className="text-neon-cyan font-semibold">Uitleg: </span>
                {explanation}
              </p>
              {source && (
                <p className="text-xs text-white/40 mt-2 italic">
                  Bron: {source}
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrueFalseQuestion;
