'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { StoreStatusCard } from '@/components/StoreStatusCard';
import { PromoBanner } from '@/components/PromoBanner';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductList } from '@/components/ProductList';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
    const [termoBusca, setTermoBusca] = useState('');

    const buscaAtiva = termoBusca.trim().length > 0;

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Cabeçalho */}
            <Header />

            {/* Conteúdo Principal (Mobile-First com largura proporcional e expandida para Desktop) */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-6 sm:gap-8">
                {/* Cartão de Status da Loja */}
                <StoreStatusCard />

                {/* 1. Banner Promocional */}
                <section id="area-banner" className="w-full">
                    <PromoBanner />
                </section>

                {/* 2. CLI-02: Barra de Pesquisa (Sticky com fundo para não cobrir ao rolar) */}
                <section
                    id="area-pesquisa"
                    className="w-full sticky top-[72px] z-20 py-1.5 bg-neutral-50/90 backdrop-blur-md"
                >
                    <SearchBar
                        value={termoBusca}
                        onChange={setTermoBusca}
                        placeholder="Buscar lanche, porção ou bebida"
                    />
                </section>

                {/* 3. CLI-03: Categorias (ocultas quando houver busca ativa, conforme CLI-02) */}
                {!buscaAtiva && <CategoryNav />}

                {/* 4. CLI-04: Lista de Lanches / Resultados da Busca */}
                <section id="area-cardapio" className="w-full flex-1">
                    <ProductList
                        termoBusca={termoBusca}
                        onClearSearch={() => setTermoBusca('')}
                        onSelectProduct={(prod) => console.log('Abrir CLI-06:', prod)}
                    />
                </section>
            </main>
        </div>
    );
}

