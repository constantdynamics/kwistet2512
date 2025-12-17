import { v4 as uuidv4 } from 'uuid';
import type { QuizQuestion, QuizOption, QuizSession, ViewedFact, QuizAvailability } from '../types';
import { QUIZ_REQUIREMENTS } from '../types';
import { getViewedFacts, getLastQuizTime, getUserStats } from './storage';

/**
 * Fisher-Yates shuffle algorithm for randomizing array
 * NON-NEGOTIABLE: Answer positions must be randomized
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate quiz question with randomized answer positions
 * Target: Each position (A,B,C,D) ~25% of the time correct
 */
export const generateQuizQuestion = (
  questionData: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    imageUrl?: string;
  }
): { options: QuizOption[]; correctIndex: number } => {
  // Create option objects with correctness tracking
  const optionsWithCorrectness = questionData.options.map((text, index) => ({
    id: uuidv4(),
    text,
    isCorrect: index === questionData.correctAnswer,
  }));

  // Shuffle the options
  const shuffledOptions = shuffleArray(optionsWithCorrectness);

  // Find new correct answer index
  const correctIndex = shuffledOptions.findIndex(opt => opt.isCorrect);

  // Return options without isCorrect flag (to not expose answer)
  const options: QuizOption[] = shuffledOptions.map(opt => ({
    id: opt.id,
    text: opt.text,
  }));

  return { options, correctIndex };
};

/**
 * Check if user can take a quiz
 */
export const checkQuizAvailability = (): QuizAvailability => {
  const stats = getUserStats();
  const viewedFacts = getViewedFacts();
  const lastQuizTime = getLastQuizTime();

  // Check minimum lifetime facts
  if (viewedFacts.length < QUIZ_REQUIREMENTS.MIN_LIFETIME_FACTS) {
    return {
      canTakeQuiz: false,
      reason: `Je moet eerst ${QUIZ_REQUIREMENTS.MIN_LIFETIME_FACTS} feitjes bekijken voordat je een quiz kunt doen.`,
      factsNeeded: QUIZ_REQUIREMENTS.MIN_LIFETIME_FACTS - viewedFacts.length,
    };
  }

  // Check cooldown
  if (lastQuizTime) {
    const lastQuiz = new Date(lastQuizTime);
    const cooldownEnd = new Date(lastQuiz.getTime() + QUIZ_REQUIREMENTS.COOLDOWN_HOURS * 60 * 60 * 1000);
    const now = new Date();

    if (now < cooldownEnd) {
      return {
        canTakeQuiz: false,
        reason: `Je kunt pas over ${formatTimeRemaining(cooldownEnd)} weer een quiz doen.`,
        nextAvailableAt: cooldownEnd.toISOString(),
      };
    }
  }

  return { canTakeQuiz: true };
};

/**
 * Format time remaining until quiz available
 */
const formatTimeRemaining = (targetDate: Date): string => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours} uur en ${minutes} minuten`;
  }
  return `${minutes} minuten`;
};

/**
 * Create a new quiz session from viewed facts
 */
export const createQuizSession = (questions: QuizQuestion[]): QuizSession => {
  return {
    id: uuidv4(),
    questions,
    currentIndex: 0,
    answers: [],
    startedAt: new Date().toISOString(),
    score: 0,
    perfectScore: false,
  };
};

/**
 * Calculate quiz score
 */
export const calculateQuizScore = (
  correctAnswers: number,
  totalQuestions: number
): { score: number; percentage: number; isPerfect: boolean } => {
  const percentage = (correctAnswers / totalQuestions) * 100;
  const isPerfect = percentage === 100;

  // Base points for correct answers
  let score = correctAnswers * 50;

  // Perfect quiz bonus
  if (isPerfect) {
    score += 200;
  }

  return { score, percentage, isPerfect };
};

/**
 * Get quiz grade based on percentage
 */
export const getQuizGrade = (percentage: number): { grade: string; color: string; message: string } => {
  if (percentage === 100) {
    return { grade: 'PERFECT', color: '#00FF41', message: 'Ongelooflijk! Perfecte score!' };
  }
  if (percentage >= 80) {
    return { grade: 'EXCELLENT', color: '#39FF14', message: 'Uitstekend gedaan!' };
  }
  if (percentage >= 60) {
    return { grade: 'GOOD', color: '#00FFFF', message: 'Goed bezig!' };
  }
  if (percentage >= 40) {
    return { grade: 'FAIR', color: '#FF00FF', message: 'Niet slecht, blijf oefenen!' };
  }
  return { grade: 'NEEDS WORK', color: '#FF0080', message: 'Tijd om meer te leren!' };
};

/**
 * Validate answer distribution (for testing)
 * Target: ~25% for each position with ±5% tolerance
 */
export const validateAnswerDistribution = (
  iterations: number = 1000
): { isValid: boolean; distribution: Record<number, number> } => {
  const positions: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };

  for (let i = 0; i < iterations; i++) {
    const testQuestion = {
      id: 'test',
      question: 'Test?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
    };
    const { correctIndex } = generateQuizQuestion(testQuestion);
    positions[correctIndex]++;
  }

  const percentages = Object.values(positions).map(count => (count / iterations) * 100);
  const isValid = percentages.every(p => p >= 20 && p <= 30);

  return { isValid, distribution: positions };
};
