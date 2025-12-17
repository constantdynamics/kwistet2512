import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StatsCard, CategoryProgress } from '../components/gamification';
import { Button, Card } from '../components/ui';
import { useUser } from '../contexts/UserContext';
import { CATEGORIES, CATEGORY_ICONS, CATEGORY_LABELS } from '../types';
import { clearAllData } from '../utils/storage';

export const ProfilePage: React.FC = () => {
  const { preferences, updatePreferences, refreshStats } = useUser();
  const [showSettings, setShowSettings] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleSound = () => {
    updatePreferences({ soundEnabled: !preferences.soundEnabled });
  };

  const handleDailyGoalChange = (goal: number) => {
    updatePreferences({ dailyGoal: goal });
  };

  const handleReset = () => {
    clearAllData();
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-white">
          Profiel
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          ⚙️ Instellingen
        </Button>
      </motion.div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card padding="md">
            <h2 className="font-display text-lg font-bold text-white mb-4">
              Instellingen
            </h2>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <p className="text-white font-medium">Geluidseffecten</p>
                <p className="text-white/50 text-sm">Quiz feedback geluiden</p>
              </div>
              <button
                onClick={handleToggleSound}
                className={`
                  w-14 h-8 rounded-full transition-all duration-300
                  ${preferences.soundEnabled
                    ? 'bg-gradient-to-r from-neon-pink to-electric-purple'
                    : 'bg-white/20'
                  }
                `}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{
                    x: preferences.soundEnabled ? 26 : 4,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </button>
            </div>

            {/* Daily Goal */}
            <div className="py-3 border-b border-white/10">
              <p className="text-white font-medium mb-2">Dagelijks Doel</p>
              <div className="flex gap-2">
                {[3, 5, 10, 15].map(goal => (
                  <button
                    key={goal}
                    onClick={() => handleDailyGoalChange(goal)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-semibold transition-all
                      ${preferences.dailyGoal === goal
                        ? 'bg-gradient-to-r from-neon-pink to-electric-purple text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }
                    `}
                  >
                    {goal} feitjes
                  </button>
                ))}
              </div>
            </div>

            {/* Category Preferences */}
            <div className="py-3 border-b border-white/10">
              <p className="text-white font-medium mb-2">Favoriete Categorieën</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => {
                  const isSelected = preferences.selectedCategories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        const updated = isSelected
                          ? preferences.selectedCategories.filter(c => c !== category)
                          : [...preferences.selectedCategories, category];
                        if (updated.length > 0) {
                          updatePreferences({ selectedCategories: updated });
                        }
                      }}
                      className={`
                        flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all
                        ${isSelected
                          ? 'bg-neon-pink/20 border border-neon-pink/50 text-white'
                          : 'bg-white/5 border border-white/10 text-white/50'
                        }
                      `}
                    >
                      <span>{CATEGORY_ICONS[category]}</span>
                      <span>{CATEGORY_LABELS[category]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Data */}
            <div className="py-3">
              <p className="text-white font-medium mb-2">Gegevens</p>
              {!showResetConfirm ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowResetConfirm(true)}
                >
                  Reset Alle Data
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">Weet je het zeker?</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleReset}
                  >
                    Ja, reset
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Annuleer
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <StatsCard />
      </motion.div>

      {/* Category Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CategoryProgress />
      </motion.div>

      {/* PWA Install Prompt */}
      <motion.div
        className="p-4 bg-gradient-to-r from-neon-cyan/10 to-electric-purple/10 rounded-lg border border-neon-cyan/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">📱</span>
          <div>
            <p className="text-white font-semibold mb-1">Installeer de App</p>
            <p className="text-white/60 text-sm mb-3">
              Voeg KnowledgeWave toe aan je startscherm voor snelle toegang en offline functionaliteit.
            </p>
            <p className="text-xs text-white/40">
              Druk op "Delen" → "Zet op beginscherm" (iOS) of bekijk het menu → "App installeren" (Android/Chrome)
            </p>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        className="text-center text-white/40 text-sm py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>KnowledgeWave v1.0.0</p>
        <p className="mt-1">
          Gemaakt met 💜 en veel neon
        </p>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
