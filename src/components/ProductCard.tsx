'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Utensils, Flame } from 'lucide-react';
import { Produto } from '@/types/cardapio';

interface ProductCardProps {
    produto: Produto;
    variant?: 'default' | 'compact';
    onClick?: (produto: Produto) => void;
}

export function ProductCard({ produto, variant = 'default', onClick }: ProductCardProps) {
    const precoFormatado = (produto.precoCentavos / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const handleClick = () => {
        if (!produto.esgotado && onClick) {
            onClick(produto);
        }
    };

    // --- VARIANTE COMPACTA (Carrossel Mais Pedidos) ---
    if (variant === 'compact') {
        return (
            <div
                onClick={handleClick}
                className={`flex-shrink-0 w-44 bg-white rounded-2xl border border-gray-100 p-3 flex flex-col justify-between transition-all duration-200 select-none ${produto.esgotado
                        ? 'opacity-60 cursor-not-allowed bg-gray-50'
                        : 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]'
                    }`}
            >
                <div className="relative w-full h-28 bg-amber-50/50 rounded-xl overflow-hidden mb-2.5 flex items-center justify-center">
                    {produto.imagemUrl ? (
                        <Image
                            src={produto.imagemUrl}
                            alt={produto.nome}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <Utensils className="w-8 h-8 text-amber-300" />
                    )}

                    {produto.esgotado ? (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            Esgotado hoje
                        </span>
                    ) : (
                        <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-current" /> Mais pedido
                        </span>
                    )}
                </div>

                <div className="flex flex-col flex-1 justify-between">
                    <div>
                        <h4 className="font-bold text-gray-900 text-xs line-clamp-1">
                            {produto.nome}
                        </h4>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-tight">
                            {produto.descricao}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                        <span className="text-xs font-black text-amber-600">
                            {precoFormatado}
                        </span>

                        {!produto.esgotado && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick();
                                }}
                                className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm hover:bg-amber-600 transition-colors"
                                aria-label={`Adicionar ${produto.nome}`}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIANTE PADRÃO (Lista por Categorias) ---
    return (
        <div
            onClick={handleClick}
            className={`relative bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex gap-3.5 sm:gap-4 transition-all duration-200 select-none ${produto.esgotado
                    ? 'opacity-60 cursor-not-allowed bg-gray-50/80'
                    : 'cursor-pointer hover:shadow-md hover:border-gray-200 active:scale-[0.99]'
                }`}
        >
            {/* Imagem / Placeholder */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center">
                {produto.imagemUrl ? (
                    <Image
                        src={produto.imagemUrl}
                        alt={produto.nome}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <Utensils className="w-8 h-8 text-neutral-300" />
                )}

                {/* Badge Esgotado sobre a imagem no mobile */}
                {produto.esgotado && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full text-center">
                            Esgotado hoje
                        </span>
                    </div>
                )}
            </div>

            {/* Conteúdo textual */}
            <div className="flex flex-col flex-1 justify-between min-w-0">
                <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                            {produto.nome}
                        </h3>

                        {!produto.esgotado && produto.maisPedido && (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                <Flame className="w-3 h-3 text-amber-500 fill-current" /> Mais pedido
                            </span>
                        )}
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {produto.descricao}
                    </p>
                </div>

                {/* Preço e Botão Adicionar */}
                <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-sm sm:text-base font-black text-amber-600">
                        {precoFormatado}
                    </span>

                    {!produto.esgotado && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick();
                            }}
                            className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-sm hover:shadow transition-all active:scale-90"
                            aria-label={`Adicionar ${produto.nome}`}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
