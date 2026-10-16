'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Categoria, Produto } from '@/types/cardapio';
import { ProductCard } from './ProductCard';
import {
    Flame,
    Utensils,
    Tag,
    Hamburger,
    Popcorn,
    CupSoda,
    IceCream,
    Cookie,
    Smile,
    UtensilsCrossed,
    Snowflake,
} from 'lucide-react';

interface ProductListProps {
    onSelectProduct?: (produto: Produto) => void;
}

function getCategoryIcon(categoriaId: string) {
    const iconProps = { className: "w-6 h-6 text-amber-500" };

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

export function ProductList({ onSelectProduct }: ProductListProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function carregarDados() {
            setCarregando(true);
            const [resCat, resProd] = await Promise.all([
                api.buscarCategorias(),
                api.buscarProdutos(),
            ]);

            if (isMounted) {
                if (resCat.success && resCat.data) setCategorias(resCat.data);
                if (resProd.success && resProd.data) setProdutos(resProd.data);
                setCarregando(false);
            }
        }

        carregarDados();
        return () => {
            isMounted = false;
        };
    }, []);

    if (carregando) {
        return (
            <div className="flex flex-col gap-8 w-full animate-pulse">
                {/* Skeleton Mais pedidos */}
                <div className="h-40 bg-white/60 rounded-2xl border border-gray-100" />
                {/* Skeleton Categorias */}
                {[1, 2].map((i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="h-6 w-36 bg-gray-200 rounded" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="h-32 bg-white rounded-2xl border border-gray-100" />
                            <div className="h-32 bg-white rounded-2xl border border-gray-100" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const maisPedidos = produtos.filter((p) => p.maisPedido);

    return (
        <div className="flex flex-col gap-10 w-full pb-16">
            {/* 1. SEÇÃO MAIS PEDIDOS NO TOPO (Carrossel Horizontal) */}
            {maisPedidos.length > 0 && (
                <section id="mais-pedidos" className="flex flex-col gap-3 -mx-4 px-4 overflow-hidden">
                    <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-500 fill-current" />
                        <h2 className="text-base font-black text-gray-900 tracking-tight">
                            Mais pedidos
                        </h2>
                    </div>

                    <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar py-1">
                        {maisPedidos.map((produto) => (
                            <ProductCard
                                key={`mais-pedido-${produto.id}`}
                                produto={produto}
                                variant="compact"
                                onClick={onSelectProduct}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* 2. SEÇÕES POR CATEGORIA */}
            {categorias.map((categoria) => {
                const produtosDaCategoria = produtos.filter(
                    (p) => p.categoriaId === categoria.id
                );

                if (produtosDaCategoria.length === 0) return null;

                return (
                    <section
                        key={categoria.id}
                        id={`categoria-${categoria.id}`}
                        data-categoria-id={categoria.id}
                        className="scroll-mt-48 flex flex-col gap-3.5"
                    >
                        {/* Cabeçalho da Categoria (sem linha inferior) */}
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center gap-2.5">
                                {getCategoryIcon(categoria.id)}
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                                    {categoria.nome}
                                </h2>
                            </div>

                            <span className="text-xs sm:text-sm font-semibold text-gray-400">
                                {produtosDaCategoria.length}{' '}
                                {produtosDaCategoria.length === 1 ? 'item' : 'itens'}
                            </span>
                        </div>

                        {/* Grid Responsiva: 1 coluna no celular, 2 em tablets e 3 em desktops amplos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {produtosDaCategoria.map((produto) => (
                                <ProductCard
                                    key={produto.id}
                                    produto={produto}
                                    onClick={onSelectProduct}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
