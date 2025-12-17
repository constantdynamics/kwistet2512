import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../ui';

interface SliderQuestionProps {
  question: string;
  min: number;
  max: number;
  correct: number;
  tolerance: number;
  unit: string;
  explanation?: string;
  onAnswer: (isCorrect: boolean, accuracy: number) => void;
}

export const SliderQuestion: React.FC<SliderQuestionProps> = ({
  question,
  min,
  max,
  correct,
  tolerance,
  unit,
  explanation,
  onAnswer,
}) => {
  const [value, setValue] = useState(Math.floor((min + max) / 2));
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const difference = Math.abs(value - correct);
    const percentageOff = (difference / correct) * 100;
    const correct_ = difference <= tolerance;
    const accuracy = Math.max(0, 100 - percentageOff);

    setIsCorrect(correct_);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(correct_, accuracy);
    }, 2000);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      {/* Question */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-xl font-display font-bold text-white mb-2">
          {question}
        </h2>
        <p className="text-white/60 text-sm">
          Schuif naar de juiste waarde (tolerantie: ±{tolerance} {unit})
        </p>
      </Card>

      {/* Slider Card */}
      <Card padding="lg">
        {/* Current Value Display */}
        <motion.div
          className="text-center mb-8"
          key={value}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
        >
          <span className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
            {value.toLocaleString()}
          </span>
          <span className="text-2xl text-white/60 ml-2">{unit}</span>
        </motion.div>

        {/* Slider */}
        <div className="relative mb-4">
          {/* Track Background */}
          <div className="h-3 bg-white/10 rounded-full">
            {/* Filled Track */}
            <motion.div
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full"
              style={{ width: `${percentage}%` }}
              initial={false}
              animate={{ width: `${percentage}%` }}
            />
          </div>

          {/* Slider Input */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            disabled={showFeedback}
            className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer disabled:cursor-default"
            style={{ margin: 0 }}
          />

          {/* Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg shadow-neon-pink/50 border-4 border-neon-pink"
            style={{ left: `calc(${percentage}% - 16px)` }}
            whileHover={!showFeedback ? { scale: 1.2 } : undefined}
          />
        </div>

        {/* Min/Max Labels */}
        <div className="flex justify-between text-sm text-white/50">
          <span>{min.toLocaleString()} {unit}</span>
          <span>{max.toLocaleString()} {unit}</span>
        </div>

        {/* Correct Answer Indicator (after feedback) */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              className="mt-4 relative h-2 bg-white/10 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Tolerance Range */}
              <div
                className="absolute h-full bg-vapor-success/30 rounded-full"
                style={{
                  left: `${((correct - tolerance - min) / (max - min)) * 100}%`,
                  width: `${((tolerance * 2) / (max - min)) * 100}%`,
                }}
              />
              {/* Correct Position */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-vapor-success rounded-full"
                style={{ left: `calc(${((correct - min) / (max - min)) * 100}% - 8px)` }}
              />
              {/* User Position */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
                  isCorrect ? 'bg-vapor-success' : 'bg-vapor-error'
                }`}
                style={{ left: `calc(${percentage}% - 6px)` }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Submit Button */}
      <AnimatePresence>
        {!showFeedback && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              Bevestig Antwoord
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

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
                ? `Correct! Het antwoord was ${correct.toLocaleString()} ${unit}`
                : `Helaas! Het correcte antwoord was ${correct.toLocaleString()} ${unit}`
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

export default SliderQuestion;
