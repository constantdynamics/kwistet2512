import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../ui';
import type { QuizOption } from '../../types';

interface MemoryQuestionProps {
  displayContent: {
    text: string;
    highlight?: string;
    imageUrl?: string;
  };
  displayTime: number; // seconds
  question: string;
  options: QuizOption[];
  correctAnswer: number;
  explanation?: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const MemoryQuestion: React.FC<MemoryQuestionProps> = ({
  displayContent,
  displayTime,
  question,
  options,
  correctAnswer,
  explanation,
  onAnswer,
}) => {
  const [phase, setPhase] = useState<'memorize' | 'question' | 'feedback'>('memorize');
  const [timeLeft, setTimeLeft] = useState(displayTime);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Countdown timer during memorize phase
  useEffect(() => {
    if (phase !== 'memorize') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('question');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const handleSelectAnswer = useCallback((index: number) => {
    if (phase !== 'question') return;

    setSelectedAnswer(index);
    const correct = index === correctAnswer;
    setIsCorrect(correct);
    setPhase('feedback');

    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  }, [phase, correctAnswer, onAnswer]);

  return (
    <div className="space-y-6">
      {/* Phase: Memorize */}
      <AnimatePresence mode="wait">
        {phase === 'memorize' && (
          <motion.div
            key="memorize"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-4"
          >
            {/* Timer */}
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/20 rounded-full border border-neon-pink/50"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-2xl">🧠</span>
                <span className="font-display font-bold text-neon-pink">
                  Onthoud dit! {timeLeft}s
                </span>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-pink to-vapor-error"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: displayTime, ease: 'linear' }}
              />
            </div>

            {/* Content to memorize */}
            <Card variant="elevated" padding="lg" className="relative overflow-hidden">
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-neon-cyan rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                    '0 0 40px rgba(0, 255, 255, 0.6)',
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {displayContent.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={displayContent.imageUrl}
                    alt="Onthoud dit"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <p className="text-xl text-white leading-relaxed text-center">
                {displayContent.highlight ? (
                  <>
                    {displayContent.text.split(displayContent.highlight)[0]}
                    <span className="text-neon-cyan font-bold bg-neon-cyan/20 px-2 rounded">
                      {displayContent.highlight}
                    </span>
                    {displayContent.text.split(displayContent.highlight)[1]}
                  </>
                ) : (
                  displayContent.text
                )}
              </p>
            </Card>

            <p className="text-center text-white/50 text-sm">
              Let goed op de details - je krijgt straks een vraag!
            </p>
          </motion.div>
        )}

        {/* Phase: Question */}
        {phase === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card variant="elevated" padding="lg">
              <div className="text-center mb-2">
                <span className="text-3xl">❓</span>
              </div>
              <h2 className="text-xl font-display font-bold text-white text-center">
                {question}
              </h2>
            </Card>

            <div className="space-y-3">
              {options.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleSelectAnswer(index)}
                  className="w-full flex items-center gap-4 p-4 border-2 rounded-xl text-left bg-white/5 border-white/20 hover:border-neon-cyan/50 hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 font-display font-bold text-white/70">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 text-white font-medium">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase: Feedback */}
        {phase === 'feedback' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card variant="elevated" padding="lg">
              <h2 className="text-xl font-display font-bold text-white text-center mb-6">
                {question}
              </h2>

              <div className="space-y-3">
                {options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === correctAnswer;

                  let stateClass = 'bg-white/5 border-white/10 opacity-50';
                  if (isCorrectOption) {
                    stateClass = 'bg-vapor-success/20 border-vapor-success';
                  } else if (isSelected && !isCorrectOption) {
                    stateClass = 'bg-vapor-error/20 border-vapor-error';
                  }

                  return (
                    <div
                      key={option.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl ${stateClass}`}
                    >
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-display font-bold ${
                          isCorrectOption ? 'bg-vapor-success/30 text-vapor-success' : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-white font-medium">{option.text}</span>
                      {isCorrectOption && <span className="text-xl">✓</span>}
                      {isSelected && !isCorrectOption && <span className="text-xl">✗</span>}
                    </div>
                  );
                })}
              </div>
            </Card>

            <motion.div
              className={`
                text-center py-4 px-6 rounded-lg font-display font-bold text-lg
                ${isCorrect
                  ? 'bg-vapor-success/20 text-vapor-success border border-vapor-success/30'
                  : 'bg-vapor-error/20 text-vapor-error border border-vapor-error/30'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCorrect ? 'Goed onthouden!' : 'Helaas, probeer het volgende keer beter te onthouden'}
            </motion.div>

            {explanation && (
              <motion.div
                className="p-4 bg-white/5 rounded-lg border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-white/70">
                  <span className="text-neon-cyan font-semibold">Uitleg: </span>
                  {explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryQuestion;
