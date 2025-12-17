import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FactCard, CategoryFilter } from '../components/facts';
import { Button, Card } from '../components/ui';
import { useUser } from '../contexts/UserContext';
import { getRandomFact } from '../data/facts';
import { addViewedFact, getTodayFactCount } from '../utils/storage';
import type { Fact, Category } from '../types';
import { CATEGORIES } from '../types';

export const HomePage: React.FC = () => {
  const { preferences, updatePreferences, recordFactView, stats } = useUser();
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [todayCount, setTodayCount] = useState(getTodayFactCount());

  const loadNewFact = useCallback(() => {
    setIsLoading(true);

    // Simulate network delay for smooth animation
    setTimeout(() => {
      const fact = getRandomFact(preferences.selectedCategories);
      if (fact) {
        setCurrentFact(fact);
        addViewedFact(fact.id, fact.category);
        recordFactView(fact.category);
        setTodayCount(prev => prev + 1);
      }
      setIsLoading(false);
    }, 300);
  }, [preferences.selectedCategories, recordFactView]);

  const toggleCategory = useCallback((category: Category) => {
    const current = preferences.selectedCategories;
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category];

    // Ensure at least one category is selected
    if (updated.length > 0) {
      updatePreferences({ selectedCategories: updated });
    }
  }, [preferences.selectedCategories, updatePreferences]);

  const selectAllCategories = useCallback(() => {
    updatePreferences({ selectedCategories: [...CATEGORIES] });
  }, [updatePreferences]);

  const deselectAllCategories = useCallback(() => {
    // Keep at least one category
    updatePreferences({ selectedCategories: [CATEGORIES[0]] });
  }, [updatePreferences]);

  // Load initial fact on mount
  useEffect(() => {
    if (!currentFact) {
      loadNewFact();
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            Dagelijkse Feitjes
          </h1>
          <p className="text-white/60 text-sm">
            {todayCount} feitjes vandaag bekeken
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          🎛️ Filters
        </Button>
      </motion.div>

      {/* Category Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card padding="md">
              <h3 className="text-sm font-semibold text-white/70 mb-3">
                Selecteer Categorieën
              </h3>
              <CategoryFilter
                selectedCategories={preferences.selectedCategories}
                onToggle={toggleCategory}
                onSelectAll={selectAllCategories}
                onDeselectAll={deselectAllCategories}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Goal Progress */}
      {preferences.dailyGoal > 0 && (
        <Card padding="sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span className="text-sm text-white/70">Dagelijks Doel</span>
            </div>
            <span className="text-sm font-mono text-neon-cyan">
              {Math.min(todayCount, preferences.dailyGoal)}/{preferences.dailyGoal}
            </span>
          </div>
          <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (todayCount / preferences.dailyGoal) * 100)}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {todayCount >= preferences.dailyGoal && (
            <motion.p
              className="text-xs text-vapor-success mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✓ Dagelijks doel behaald!
            </motion.p>
          )}
        </Card>
      )}

      {/* Current Fact */}
      <AnimatePresence mode="wait">
        {currentFact && !isLoading && (
          <FactCard key={currentFact.id} fact={currentFact} />
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          className="flex items-center justify-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-neon-pink border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* Next Fact Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={loadNewFact}
          loading={isLoading}
          className="min-w-[200px]"
        >
          🌊 Nieuw Feitje
        </Button>
      </motion.div>

      {/* Points indicator */}
      <motion.p
        className="text-center text-sm text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        +10 punten per feitje • {stats.factsViewed} totaal bekeken
      </motion.p>
    </div>
  );
};

export default HomePage;
