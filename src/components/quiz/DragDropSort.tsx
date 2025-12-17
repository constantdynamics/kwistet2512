import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Button } from '../ui';

interface SortItem {
  id: string;
  content: string;
  correctPosition: number;
}

interface DragDropSortProps {
  question: string;
  items: SortItem[];
  onComplete: (isCorrect: boolean, score: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SortableItemProps {
  item: SortItem;
  index: number;
  isCorrect?: boolean;
  showFeedback: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, index, isCorrect, showFeedback }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        flex items-center gap-3 p-4 rounded-xl
        border-2 cursor-grab active:cursor-grabbing
        touch-manipulation
        transition-all duration-200
        ${isDragging
          ? 'bg-neon-pink/30 border-neon-pink shadow-[0_0_30px_rgba(255,0,255,0.5)] scale-105'
          : showFeedback
            ? isCorrect
              ? 'bg-vapor-success/20 border-vapor-success'
              : 'bg-vapor-error/20 border-vapor-error'
            : 'bg-white/5 border-white/20 hover:border-neon-cyan/50'
        }
      `}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={!showFeedback ? { scale: 1.01 } : undefined}
    >
      {/* Position indicator */}
      <div
        className={`
          w-8 h-8 flex items-center justify-center rounded-lg
          font-display font-bold text-sm
          ${showFeedback && isCorrect
            ? 'bg-vapor-success/30 text-vapor-success'
            : showFeedback && !isCorrect
            ? 'bg-vapor-error/30 text-vapor-error'
            : 'bg-white/10 text-white/50'
          }
        `}
      >
        {index + 1}
      </div>

      {/* Content */}
      <span className="flex-1 text-white font-medium">
        {item.content}
      </span>

      {/* Drag handle */}
      <div className="flex flex-col gap-0.5 text-white/30">
        <div className="w-4 h-0.5 bg-current rounded" />
        <div className="w-4 h-0.5 bg-current rounded" />
        <div className="w-4 h-0.5 bg-current rounded" />
      </div>

      {/* Feedback icon */}
      {showFeedback && (
        <motion.span
          className="text-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {isCorrect ? '✓' : '✗'}
        </motion.span>
      )}
    </motion.div>
  );
};

export const DragDropSort: React.FC<DragDropSortProps> = ({
  question,
  items: initialItems,
  onComplete,
  difficulty,
}) => {
  // Shuffle items initially
  const [items, setItems] = useState<SortItem[]>(() => {
    const shuffled = [...initialItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const handleSubmit = useCallback(() => {
    // Check each position
    const correctness = items.map((item, index) => item.correctPosition === index);
    setResults(correctness);
    setShowFeedback(true);

    const correctCount = correctness.filter(Boolean).length;
    const isAllCorrect = correctCount === items.length;

    // Calculate score based on difficulty and correctness
    const baseScore = isAllCorrect ? 100 : Math.floor((correctCount / items.length) * 50);
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
    const finalScore = Math.floor(baseScore * difficultyMultiplier);

    // Delay completion callback
    setTimeout(() => {
      onComplete(isAllCorrect, finalScore);
    }, 2000);
  }, [items, difficulty, onComplete]);

  return (
    <div className="space-y-6">
      {/* Question */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-xl font-display font-bold text-white mb-2">
          {question}
        </h2>
        <p className="text-white/60 text-sm">
          Sleep de items in de juiste volgorde
        </p>
      </Card>

      {/* Sortable List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                item={item}
                index={index}
                isCorrect={results[index]}
                showFeedback={showFeedback}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Submit Button */}
      <AnimatePresence>
        {!showFeedback && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
            >
              Controleer Volgorde
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className={`
              text-center py-4 px-6 rounded-lg font-display font-bold text-lg
              ${results.every(Boolean)
                ? 'bg-vapor-success/20 text-vapor-success border border-vapor-success/30'
                : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
              }
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {results.every(Boolean)
              ? 'Perfect! Alles correct!'
              : `${results.filter(Boolean).length} van ${items.length} correct`
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DragDropSort;
