'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Buscar lanche, porção ou bebida',
    className = '',
}: SearchBarProps) {
    const handleClear = () => {
        onChange('');
    };

    return (
        <div className={`relative w-full ${className}`}>
            <div className="relative flex items-center w-full">
                {/* Ícone de Lupa */}
                <span className="absolute left-4 text-gray-400 pointer-events-none flex items-center justify-center">
                    <Search className="w-5 h-5 text-gray-400 transition-colors" />
                </span>

                {/* Input de Pesquisa */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    aria-label="Buscar produtos no cardápio"
                    className="w-full h-12 pl-12 pr-12 rounded-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 hover:border-gray-300"
                />

                {/* Botão de Limpar ('X') */}
                {value.length > 0 && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label="Limpar busca"
                        className="absolute right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors active:scale-95 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
