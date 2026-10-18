import React from 'react';
import { MapPin, ShoppingBag, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
    endereco?: string;
    onSelectEndereco?: () => void;
    onMeusPedidosClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    endereco = 'Informe seu endereço',
    onSelectEndereco,
    onMeusPedidosClick,
}) => {
    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/5 px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="max-w-6xl mx-auto flex flex-col gap-2.5">
                {/* Linha 1: Logo e Ação Meus Pedidos */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="/logo.png"
                            alt="Logo Visual Lanches e Petiscos"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-xl object-cover shadow-sm"
                            priority
                        />
                        <div className="flex flex-col">
                            <span className="text-base font-black tracking-tight text-brand-black leading-none">
                                VISUAL
                            </span>
                            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                Lanches & Petiscos
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onMeusPedidosClick}
                        className="flex-incline bg-white rounded-2xl p-4 md:p-3 text-amber-600 border border-brand-black/5 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>


                {/* Linha 2: Endereço de Entrega */}
                <button
                    onClick={onSelectEndereco}
                    className="flex items-center gap-2 text-left text-sm text-gray-700 hover:text-black transition-colors group cursor-pointer"
                >
                    <MapPin size={16} className="text-amber-500 shrink-0" />
                    <span className="truncate font-medium">{endereco}</span>
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors shrink-0" />
                </button>
            </div>
        </header>
    );
};
