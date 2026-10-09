import React from 'react';

interface CategoryChipProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const CategoryChip = ({ label, icon, active = false, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 cursor-pointer group focus:outline-none transition-transform active:scale-95 min-w-[70px]"
    >
      {/* 1. Círculo do Ícone (Em Cima) */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-200 shadow-sm group-hover:shadow-md ${active
            ? 'bg-brand-yellow text-brand-black scale-105 shadow-md font-bold'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-black/5'
          }`}
      >
        {icon || <span>🍔</span>}
      </div>

      {/* 2. Texto do Nome (Em Baixo) */}
      <span
        className={`text-xs tracking-tight transition-colors ${active
            ? 'text-amber-600 font-bold'
            : 'text-gray-700 font-medium group-hover:text-black'
          }`}
      >
        {label}
      </span>
    </button>
  );
};
