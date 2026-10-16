import { Header } from '@/components/Header';
import { StoreStatusCard } from '@/components/StoreStatusCard';
import { PromoBanner } from '@/components/PromoBanner';
import { CategoryNav } from '@/components/CategoryNav';



export default function Home() {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Cabeçalho */}
            <Header />

            {/* Conteúdo Principal (Centralizado e Mobile-First) */}
            <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 flex flex-col gap-6">
                {/* Cartão de Status da Loja */}
                <StoreStatusCard />

                {/* 1. Banner Promocional*/}
                <section id="area-banner" className="w-full">
                    <PromoBanner />
                </section>

                {/* 2. Placeholder para CLI-02: Barra de Pesquisa */}
                <section id="area-pesquisa" className="w-full">
                    <div className="h-12 bg-white rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                        [CLI-02] Barra de Pesquisa
                    </div>
                </section>

                {/* 3. Placeholder para CLI-03: Categorias */}
                <CategoryNav />

                {/* 4. Placeholder para CLI-04: Lista de Lanches */}
                <section id="area-cardapio" className="w-full flex-1">
                    <div className="h-64 bg-white rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                        [CLI-04] Lista de Lanches do Cardápio
                    </div>
                </section>
            </main>
        </div>
    );
}
