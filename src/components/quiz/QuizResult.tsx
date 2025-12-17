import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { QuizSession } from '../../types';
import { getQuizGrade } from '../../utils/quiz';
import { Card, Button, ProgressBar } from '../ui';

interface QuizResultProps {
  session: QuizSession;
  onPlayAgain?: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ session, onPlayAgain }) => {
  const correctCount = session.answers.filter(a => a.isCorrect).length;
  const totalQuestions = session.questions.length;
  const percentage = (correctCount / totalQuestions) * 100;
  const { grade, color, message } = getQuizGrade(percentage);

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-6xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          {percentage === 100 ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : percentage >= 40 ? '💪' : '📚'}
        </motion.div>

        <motion.h1
          className="font-display text-3xl font-black mb-2"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {grade}
        </motion.h1>

        <motion.p
          className="text-white/70 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {message}
        </motion.p>
      </motion.div>

      {/* Score Card */}
      <Card variant="elevated" padding="lg">
        <div className="space-y-6">
          {/* Score */}
          <div className="text-center">
            <motion.div
              className="text-5xl font-display font-black text-white mb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.5 }}
            >
              {correctCount}/{totalQuestions}
            </motion.div>
            <p className="text-white/50 text-sm">vragen correct</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <ProgressBar
              value={correctCount}
              max={totalQuestions}
              size="lg"
              variant={percentage >= 60 ? 'success' : 'default'}
            />
            <p className="text-center text-sm text-white/60">
              {percentage.toFixed(0)}% score
            </p>
          </div>

          {/* Points Breakdown */}
          <div className="bg-white/5 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Correcte antwoorden</span>
              <span className="text-vapor-success font-mono">
                +{correctCount * 50} punten
              </span>
            </div>
            {session.perfectScore && (
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Perfect score bonus</span>
                <span className="text-neon-cyan font-mono">
                  +200 punten
                </span>
              </div>
            )}
            <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
              <span className="text-white">Totaal</span>
              <span className="text-neon-pink font-mono">
                +{session.score} punten
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Question Review */}
      <Card padding="md">
        <h3 className="font-display text-lg font-bold text-white mb-4">
          Vraag Overzicht
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {session.questions.map((question, index) => {
            const answer = session.answers[index];
            const isCorrect = answer?.isCorrect ?? false;

            return (
              <motion.div
                key={question.id}
                className={`
                  w-10 h-10 flex items-center justify-center
                  rounded-lg font-display font-bold text-sm
                  ${isCorrect
                    ? 'bg-vapor-success/30 text-vapor-success border border-vapor-success/50'
                    : 'bg-vapor-error/30 text-vapor-error border border-vapor-error/50'
                  }
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                {index + 1}
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link to="/" className="flex-1">
          <Button variant="secondary" fullWidth>
            Meer Feitjes Leren
          </Button>
        </Link>
        {onPlayAgain && (
          <Button variant="primary" fullWidth onClick={onPlayAgain} className="flex-1">
            Nieuwe Quiz
          </Button>
        )}
      </motion.div>

      {/* Share */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          className="text-neon-cyan text-sm hover:text-white transition-colors"
          onClick={() => {
            const text = `Ik haalde ${percentage.toFixed(0)}% op de KnowledgeWave quiz! 🌊🧠`;
            if (navigator.share) {
              navigator.share({ text });
            } else {
              navigator.clipboard.writeText(text);
            }
          }}
        >
          Deel je score →
        </button>
      </motion.div>
    </div>
  );
};

export default QuizResult;
