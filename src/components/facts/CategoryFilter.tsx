import React from 'react';
import { motion } from 'framer-motion';
import type { Category } from '../../types';
import { CATEGORIES, CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';

interface CategoryFilterProps {
  selectedCategories: Category[];
  onToggle: (category: Category) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onToggle,
  onSelectAll,
  onDeselectAll,
}) => {
  const allSelected = selectedCategories.length === CATEGORIES.length;
  const noneSelected = selectedCategories.length === 0;

  return (
    <div className="space-y-3">
      {/* Quick actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={allSelected ? onDeselectAll : onSelectAll}
          className="text-xs text-neon-cyan hover:text-white transition-colors"
        >
          {allSelected ? 'Deselecteer alles' : 'Selecteer alles'}
        </button>
        <span className="text-white/30 text-xs">
          ({selectedCategories.length}/{CATEGORIES.length} geselecteerd)
        </span>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <motion.button
              key={category}
              onClick={() => onToggle(category)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full
                text-sm font-medium
                transition-all duration-300
                ${isSelected
                  ? 'bg-gradient-to-r from-neon-pink/30 to-electric-purple/30 border border-neon-pink/50 text-white shadow-[0_0_15px_rgba(255,0,255,0.3)]'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/30'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{CATEGORY_ICONS[category]}</span>
              <span>{CATEGORY_LABELS[category]}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
