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
    Search,
} from 'lucide-react';

interface ProductListProps {
    onSelectProduct?: (produto: Produto) => void;
    termoBusca?: string;
    onClearSearch?: () => void;
}

// Remove acentos e converte para minúsculas
function normalizarTexto(texto: string): string {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
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

export function ProductList({ onSelectProduct, termoBusca = '', onClearSearch }: ProductListProps) {
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

    const buscaAtiva = termoBusca.trim().length > 0;
    const termoNormalizado = normalizarTexto(termoBusca);

    // Se estiver buscando: filtra produtos por nome ou descrição
    if (buscaAtiva) {
        const produtosFiltrados = produtos.filter((produto) => {
            const nomeNormalizado = normalizarTexto(produto.nome);
            const descricaoNormalizada = normalizarTexto(produto.descricao || '');
            return (
                nomeNormalizado.includes(termoNormalizado) ||
                descricaoNormalizada.includes(termoNormalizado)
            );
        });

        // Caso nada seja encontrado
        if (produtosFiltrados.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-3xl border border-gray-100 shadow-sm my-2">
                    <div className="w-16 h-16 flex items-center justify-center text-3xl">
                        <Search className="w-8 h-8 text-gray-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Nenhum produto encontrado
                    </h3>
                    <p className="text-sm text-gray-500 max-w-xs mb-6">
                        Não encontramos nada para &ldquo;<span className="font-semibold text-gray-700">{termoBusca}</span>&rdquo;. Tente buscar por outro termo ou ingrediente.
                    </p>
                    {onClearSearch && (
                        <button
                            type="button"
                            onClick={onClearSearch}
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                        >
                            Limpar busca e ver cardápio
                        </button>
                    )}
                </div>
            );
        }

        // Exibição em lista única com contador de resultados
        return (
            <div className="flex flex-col gap-4 w-full pb-16">
                <div className="flex items-center justify-between px-1">
                    <p className="text-sm font-medium text-gray-600">
                        Resultados da busca por &ldquo;<span className="font-bold text-gray-900">{termoBusca}</span>&rdquo;
                    </p>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
                        {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'item' : 'itens'}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {produtosFiltrados.map((produto) => (
                        <ProductCard
                            key={produto.id}
                            produto={produto}
                            onClick={onSelectProduct}
                        />
                    ))}
                </div>
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

