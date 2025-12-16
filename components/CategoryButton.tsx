import React from 'react';
import { CategoryOption } from '../types';

interface CategoryButtonProps {
  category: CategoryOption;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  category, 
  isSelected, 
  onClick,
  disabled 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 border
        ${isSelected 
          ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' 
          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="text-3xl mb-2">{category.icon}</span>
      <span className="font-medium text-sm whitespace-nowrap">{category.label}</span>
    </button>
  );
};