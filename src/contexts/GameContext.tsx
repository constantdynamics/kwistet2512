import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

import type { QuizSession, QuizQuestion, QuizAnswer } from '../types';
import { generateQuizQuestion, createQuizSession, calculateQuizScore } from '../utils/quiz';
import { saveQuizSession } from '../utils/storage';
import { soundManager } from '../utils/sounds';

interface GameContextType {
  // Quiz state
  quizSession: QuizSession | null;
  isQuizActive: boolean;
  currentQuestion: QuizQuestion | null;
  selectedAnswer: number | null;
  showFeedback: boolean;
  isAnswerCorrect: boolean | null;

  // Quiz actions
  startQuiz: (questions: QuizQuestion[]) => void;
  submitAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  endQuiz: () => QuizSession | null;
  resetQuiz: () => void;

  // Screen effects
  triggerScreenShake: () => void;
  isScreenShaking: boolean;
  showScorePopup: boolean;
  scorePopupValue: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scorePopupValue, setScorePopupValue] = useState(0);

  const isQuizActive = quizSession !== null && !quizSession.completedAt;
  const currentQuestion = quizSession?.questions[quizSession.currentIndex] ?? null;

  const triggerScreenShake = useCallback(() => {
    setIsScreenShaking(true);
    setTimeout(() => setIsScreenShaking(false), 300);
  }, []);

  const showScoreAnimation = useCallback((points: number) => {
    setScorePopupValue(points);
    setShowScorePopup(true);
    setTimeout(() => setShowScorePopup(false), 1000);
  }, []);

  const startQuiz = useCallback((questions: QuizQuestion[]) => {
    // Randomize answers for each question
    const randomizedQuestions = questions.map(q => {
      const { options, correctIndex } = generateQuizQuestion({
        id: q.id,
        question: q.question,
        options: q.options.map(o => o.text),
        correctAnswer: q.correctAnswer as number,
      });

      return {
        ...q,
        options,
        correctAnswer: correctIndex,
      };
    });

    const session = createQuizSession(randomizedQuestions);
    setQuizSession(session);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsAnswerCorrect(null);
  }, []);

  const submitAnswer = useCallback((answerIndex: number) => {
    if (!quizSession || !currentQuestion || showFeedback) return;

    // 1. Immediately show selection
    setSelectedAnswer(answerIndex);

    // 2. Check correctness
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    // 3. Instant feedback
    if (isCorrect) {
      soundManager.playCorrect();
      triggerScreenShake();
      showScoreAnimation(50);
    } else {
      soundManager.playIncorrect();
    }

    setShowFeedback(true);

    // 4. Record the answer
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      isCorrect,
      answeredAt: new Date().toISOString(),
      timeSpent: 0, // Could track time if needed
    };

    setQuizSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        answers: [...prev.answers, answer],
        score: prev.score + (isCorrect ? 50 : 0),
      };
    });

    // 5. Auto-progress after 1.5s (NO CONFIRM BUTTON)
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  }, [quizSession, currentQuestion, showFeedback, triggerScreenShake, showScoreAnimation]);

  const nextQuestion = useCallback(() => {
    if (!quizSession) return;

    const nextIndex = quizSession.currentIndex + 1;

    if (nextIndex >= quizSession.questions.length) {
      // Quiz complete
      const { isPerfect } = calculateQuizScore(
        quizSession.answers.filter(a => a.isCorrect).length + (isAnswerCorrect ? 1 : 0),
        quizSession.questions.length
      );

      setQuizSession(prev => {
        if (!prev) return prev;
        const completed: QuizSession = {
          ...prev,
          completedAt: new Date().toISOString(),
          score: prev.score + (isPerfect ? 200 : 0),
          perfectScore: isPerfect,
        };
        saveQuizSession(completed);
        return completed;
      });
    } else {
      // Move to next question
      setQuizSession(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          currentIndex: nextIndex,
        };
      });
    }

    // Reset feedback state
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsAnswerCorrect(null);
  }, [quizSession, isAnswerCorrect]);

  const endQuiz = useCallback((): QuizSession | null => {
    const finalSession = quizSession;
    setQuizSession(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsAnswerCorrect(null);
    return finalSession;
  }, [quizSession]);

  const resetQuiz = useCallback(() => {
    setQuizSession(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsAnswerCorrect(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        quizSession,
        isQuizActive,
        currentQuestion,
        selectedAnswer,
        showFeedback,
        isAnswerCorrect,
        startQuiz,
        submitAnswer,
        nextQuestion,
        endQuiz,
        resetQuiz,
        triggerScreenShake,
        isScreenShaking,
        showScorePopup,
        scorePopupValue,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
