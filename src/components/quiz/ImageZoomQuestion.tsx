import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Card } from '../ui';
import type { QuizOption } from '../../types';

interface ImageZoomQuestionProps {
  question: string;
  imageUrl: string;
  options: QuizOption[];
  correctAnswer: number;
  explanation?: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const ImageZoomQuestion: React.FC<ImageZoomQuestionProps> = ({
  question,
  imageUrl,
  options,
  correctAnswer,
  explanation,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === correctAnswer;

    // Delay callback for feedback animation
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <Card variant="elevated" padding="md">
        <h2 className="text-xl font-display font-bold text-white">
          {question}
        </h2>
      </Card>

      {/* Zoomable Image */}
      <Card padding="none" className="overflow-hidden">
        <div className="relative">
          {/* Zoom controls hint */}
          <motion.div
            className="absolute top-2 right-2 z-10 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="px-2 py-1 bg-black/50 rounded text-xs text-white/70">
              Pinch of scroll om te zoomen
            </span>
          </motion.div>

          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={5}
            centerOnInit
            doubleClick={{ mode: 'zoomIn' }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Zoom buttons */}
                <div className="absolute bottom-2 right-2 z-10 flex gap-2">
                  <button
                    onClick={() => zoomIn()}
                    className="w-10 h-10 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="w-10 h-10 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="px-3 h-10 bg-black/50 rounded-lg text-white text-xs hover:bg-black/70 transition-colors"
                  >
                    Reset
                  </button>
                </div>

                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#1A0B2E',
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Quiz afbeelding"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </Card>

      {/* Answer Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === correctAnswer;

          let stateClass = 'bg-white/5 border-white/20 hover:border-neon-cyan/50';

          if (showFeedback) {
            if (isCorrect) {
              stateClass = 'bg-vapor-success/20 border-vapor-success';
            } else if (isSelected && !isCorrect) {
              stateClass = 'bg-vapor-error/20 border-vapor-error';
            } else {
              stateClass = 'bg-white/5 border-white/10 opacity-50';
            }
          } else if (isSelected) {
            stateClass = 'bg-neon-pink/20 border-neon-pink';
          }

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelectAnswer(index)}
              disabled={showFeedback}
              className={`
                w-full flex items-center gap-4 p-4
                border-2 rounded-xl text-left
                transition-all duration-200
                ${stateClass}
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!showFeedback ? { scale: 1.01 } : undefined}
              whileTap={!showFeedback ? { scale: 0.99 } : undefined}
            >
              {/* Option letter */}
              <div
                className={`
                  w-10 h-10 flex items-center justify-center rounded-lg
                  font-display font-bold
                  ${showFeedback && isCorrect
                    ? 'bg-vapor-success/30 text-vapor-success'
                    : 'bg-white/10 text-white/70'
                  }
                `}
              >
                {String.fromCharCode(65 + index)}
              </div>

              {/* Option text */}
              <span className="flex-1 text-white font-medium">
                {option.text}
              </span>

              {/* Feedback icon */}
              {showFeedback && (
                <motion.span
                  className="text-xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {isCorrect ? '✓' : isSelected ? '✗' : ''}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showFeedback && explanation && (
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
      </AnimatePresence>

      {/* Feedback banner */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className={`
              text-center py-4 px-6 rounded-lg font-display font-bold text-lg
              ${selectedAnswer === correctAnswer
                ? 'bg-vapor-success/20 text-vapor-success border border-vapor-success/30'
                : 'bg-vapor-error/20 text-vapor-error border border-vapor-error/30'
              }
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {selectedAnswer === correctAnswer ? 'Correct!' : 'Helaas, dat is niet juist'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageZoomQuestion;
