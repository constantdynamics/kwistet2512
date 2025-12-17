import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, QuizResult } from '../components/quiz';
import { Button, Card } from '../components/ui';
import { useGame } from '../contexts/GameContext';
import { useUser } from '../contexts/UserContext';
import { checkQuizAvailability } from '../utils/quiz';
import { getRandomQuestions } from '../data/quizQuestions';
import { QUIZ_REQUIREMENTS } from '../types';

export const QuizPage: React.FC = () => {
  const {
    quizSession,
    isQuizActive,
    currentQuestion,
    selectedAnswer,
    showFeedback,
    isAnswerCorrect,
    startQuiz,
    submitAnswer,
    endQuiz,
    resetQuiz,
  } = useGame();

  const { preferences, recordQuizAnswer, recordQuizComplete } = useUser();
  const [availability, setAvailability] = useState(checkQuizAvailability());

  // Check availability on mount and periodically
  useEffect(() => {
    const checkAvailability = () => {
      setAvailability(checkQuizAvailability());
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleStartQuiz = useCallback(() => {
    const questions = getRandomQuestions(
      QUIZ_REQUIREMENTS.FACTS_PER_QUIZ,
      preferences.selectedCategories
    );
    startQuiz(questions);
  }, [preferences.selectedCategories, startQuiz]);

  const handleAnswerSelect = useCallback((index: number) => {
    if (!currentQuestion) return;

    submitAnswer(index);

    // Record the answer for stats
    const isCorrect = index === currentQuestion.correctAnswer;
    recordQuizAnswer(currentQuestion.category, isCorrect);
  }, [currentQuestion, submitAnswer, recordQuizAnswer]);

  const handleQuizComplete = useCallback(() => {
    if (quizSession?.completedAt) {
      recordQuizComplete(quizSession.perfectScore);
    }
  }, [quizSession, recordQuizComplete]);

  // Record completion when quiz ends
  useEffect(() => {
    if (quizSession?.completedAt) {
      handleQuizComplete();
    }
  }, [quizSession?.completedAt]);

  const handlePlayAgain = useCallback(() => {
    resetQuiz();
    // Re-check availability
    setAvailability(checkQuizAvailability());
  }, [resetQuiz]);

  // Quiz not available - show info
  if (!isQuizActive && !quizSession?.completedAt && !availability.canTakeQuiz) {
    return (
      <div className="space-y-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-6xl mb-4 block">🔒</span>
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            Quiz Niet Beschikbaar
          </h1>
          <p className="text-white/60 max-w-md mx-auto">
            {availability.reason}
          </p>
        </motion.div>

        {availability.factsNeeded && (
          <Card padding="md">
            <div className="text-center">
              <p className="text-white/70 mb-4">
                Je hebt nog <span className="text-neon-pink font-bold">{availability.factsNeeded}</span> feitjes nodig
              </p>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((QUIZ_REQUIREMENTS.MIN_LIFETIME_FACTS - availability.factsNeeded!) / QUIZ_REQUIREMENTS.MIN_LIFETIME_FACTS) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-white/40 mt-2">
                {QUIZ_REQUIREMENTS.MIN_LIFETIME_FACTS - availability.factsNeeded!} / {QUIZ_REQUIREMENTS.MIN_LIFETIME_FACTS} feitjes bekeken
              </p>
            </div>
          </Card>
        )}

        {availability.nextAvailableAt && (
          <Card padding="md">
            <div className="text-center">
              <p className="text-white/70 mb-2">Volgende quiz beschikbaar om:</p>
              <p className="text-xl font-display font-bold text-neon-cyan">
                {new Date(availability.nextAvailableAt).toLocaleTimeString('nl-NL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </Card>
        )}

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="secondary" onClick={() => window.location.href = '/'}>
            📚 Meer Feitjes Leren
          </Button>
        </motion.div>
      </div>
    );
  }

  // Quiz completed - show results
  if (quizSession?.completedAt) {
    return (
      <QuizResult
        session={quizSession}
        onPlayAgain={availability.canTakeQuiz ? handlePlayAgain : undefined}
      />
    );
  }

  // Quiz active - show question
  if (isQuizActive && currentQuestion) {
    return (
      <QuizQuestion
        question={currentQuestion}
        questionNumber={quizSession!.currentIndex + 1}
        totalQuestions={quizSession!.questions.length}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        isCorrect={isAnswerCorrect}
        onSelectAnswer={handleAnswerSelect}
      />
    );
  }

  // Ready to start quiz
  return (
    <div className="space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.span
          className="text-6xl mb-4 block"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎯
        </motion.span>
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Quiz Time!
        </h1>
        <p className="text-white/60">
          Test je kennis met {QUIZ_REQUIREMENTS.FACTS_PER_QUIZ} vragen
        </p>
      </motion.div>

      <Card variant="elevated" padding="lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-white/70">Aantal vragen</span>
            <span className="text-white font-semibold">{QUIZ_REQUIREMENTS.FACTS_PER_QUIZ}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-white/70">Categorieën</span>
            <span className="text-white font-semibold">
              {preferences.selectedCategories.length}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-white/70">Punten per correct antwoord</span>
            <span className="text-vapor-success font-semibold">+50</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-white/70">Perfect score bonus</span>
            <span className="text-neon-cyan font-semibold">+200</span>
          </div>
        </div>
      </Card>

      <Card padding="md" className="bg-gradient-to-br from-electric-purple/20 to-neon-pink/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-white font-semibold mb-1">Tips</p>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Antwoorden worden direct beoordeeld</li>
              <li>• Na 1,5 seconden ga je automatisch naar de volgende vraag</li>
              <li>• Er is geen tijdslimiet per vraag</li>
            </ul>
          </div>
        </div>
      </Card>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handleStartQuiz}
          className="min-w-[200px]"
        >
          🚀 Start Quiz
        </Button>
      </motion.div>
    </div>
  );
};

export default QuizPage;
