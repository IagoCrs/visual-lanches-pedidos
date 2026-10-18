'use client';

import React, { useEffect, useState, useRef } from 'react';
import { api } from '@/services/api';
import { Categoria } from '@/types/cardapio';
import { CategoryChip } from './ui/CategoryChip';
import {
    Utensils,
    Tag,
    Hamburger,
    Popcorn,
    CupSoda,
    IceCream,
    Cookie,
    Smile,
    Flame,
    UtensilsCrossed,
    Snowflake,
} from 'lucide-react';

interface CategoryNavProps {
    onSelectCategory?: (categoriaId: string) => void;
}

function getCategoryIcon(categoriaId: string) {
    const iconProps = { className: "w-6 h-6" };

    switch (categoriaId.toLowerCase()) {
        case 'lanches':
        case 'lanches-salgados':
            return <Hamburger {...iconProps} />;
        case 'porcoes':
            return <Popcorn {...iconProps} />;
        case 'bebidas':
            return <CupSoda {...iconProps} />;
        case 'sobremesas':
        case 'picoles':
            return <IceCream {...iconProps} />;
        case 'promocoes':
            return <Tag {...iconProps} />;
        case 'doces':
            return <Cookie {...iconProps} />;
        case 'kids':
            return <Smile {...iconProps} />;
        case 'molhos':
            return <Flame {...iconProps} />;
        case 'tabuas':
            return <UtensilsCrossed {...iconProps} />;
        case 'gelo':
            return <Snowflake {...iconProps} />;
        default:
            return <Utensils {...iconProps} />;
    }
}

export function CategoryNav({ onSelectCategory }: CategoryNavProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaAtiva, setCategoriaAtiva] = useState<string>('');
    const [carregando, setCarregando] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // 1. Busca as categorias da API
    useEffect(() => {
        let isMounted = true;

        async function carregar() {
            setCarregando(true);
            const res = await api.buscarCategorias();
            if (isMounted && res.success && res.data) {
                setCategorias(res.data);
                if (res.data.length > 0) {
                    setCategoriaAtiva(res.data[0].id);
                }
            }
            if (isMounted) setCarregando(false);
        }

        carregar();
        return () => {
            isMounted = false;
        };
    }, []);

    // 2. IntersectionObserver para rastrear qual categoria está visível na tela
    useEffect(() => {
        if (categorias.length === 0) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const handleIntersect: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-categoria-id');
                    if (id) {
                        setCategoriaAtiva(id);
                    }
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '-100px 0px -70% 0px',
            threshold: 0,
        });

        categorias.forEach((cat) => {
            const el = document.getElementById(`categoria-${cat.id}`);
            if (el && observerRef.current) {
                observerRef.current.observe(el);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [categorias]);

    // 3. Ação ao clicar no chip
    const handleClick = (categoriaId: string) => {
        setCategoriaAtiva(categoriaId);
        onSelectCategory?.(categoriaId);

        const elemento = document.getElementById(`categoria-${categoriaId}`);
        if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Skeleton
    if (carregando) {
        return (
            <div className="sticky top-0 z-30 bg-neutral-50/90 backdrop-blur-md py-3 -mx-4 px-4 overflow-hidden">
                <div className="flex gap-4 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                            <div className="w-14 h-14 bg-neutral-200 rounded-full" />
                            <div className="h-3 w-12 bg-neutral-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (categorias.length === 0) return null;

    return (
        <nav
            aria-label="Categorias do cardápio"
            className="sticky top-[96px] z-20 bg-neutral-50/95 backdrop-blur-md py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-neutral-200/60 shadow-sm"
        >
            <div className="flex items-center gap-4 overflow-x-auto scroll-smooth no-scrollbar py-1">
                {categorias.map((cat) => (
                    <CategoryChip
                        key={cat.id}
                        label={cat.nome}
                        icon={getCategoryIcon(cat.id)}
                        active={categoriaAtiva === cat.id}
                        onClick={() => handleClick(cat.id)}
                    />
                ))}
            </div>
        </nav>
    );
}
