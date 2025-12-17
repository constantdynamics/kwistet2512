import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion as QuizQuestionType } from '../../types';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';
import { Card } from '../ui';
import QuizOption from './QuizOption';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
  onSelectAnswer: (index: number) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onSelectAnswer,
}) => {
  return (
    <div className="space-y-6">
      {/* Progress & Category */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{CATEGORY_ICONS[question.category]}</span>
          <span className="text-sm text-white/60">
            {CATEGORY_LABELS[question.category]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-neon-cyan">
            {questionNumber}
          </span>
          <span className="text-white/40">/</span>
          <span className="text-white/60">{totalQuestions}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Card */}
      <Card variant="elevated" padding="lg">
        {/* Question Image */}
        {question.imageUrl && (
          <motion.div
            className="mb-6 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src={question.imageUrl}
              alt="Quiz afbeelding"
              className="w-full h-48 object-cover"
            />
          </motion.div>
        )}

        {/* Question Text */}
        <motion.h2
          className="text-xl md:text-2xl font-display font-bold text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={question.id}
        >
          {question.question}
        </motion.h2>

        {/* Answer Options */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {question.options.map((option, index) => (
              <QuizOption
                key={option.id}
                option={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === question.correctAnswer}
                showFeedback={showFeedback}
                disabled={showFeedback}
                onClick={() => onSelectAnswer(index)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Explanation (shown after answer) */}
        <AnimatePresence>
          {showFeedback && question.explanation && (
            <motion.div
              className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-white/70">
                <span className="text-neon-cyan font-semibold">Uitleg: </span>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Feedback Message */}
      <AnimatePresence>
        {showFeedback && (
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
            exit={{ opacity: 0 }}
          >
            {isCorrect ? 'Correct! +50 punten' : 'Helaas, dat is niet juist'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizQuestion;
