'use client';

import { useState } from 'react';
import {
    Tag,
    Hamburger,
    Cookie,
    Smile,
    Flame,
    Popcorn,
    UtensilsCrossed,
    CupSoda,
    IceCream,
    Snowflake
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Toggle } from '@/components/ui/Toggle';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Skeleton } from '@/components/ui/Skeleton';

const TodosIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="7" cy="7" r="3.5" />
        <circle cx="17" cy="7" r="3.5" />
        <circle cx="7" cy="17" r="3.5" />
        <circle cx="17" cy="17" r="3.5" />
    </svg>
);


export default function ShowcasePage() {
    const [activeChip, setActiveChip] = useState('Todos');
    const [toggleState, setToggleState] = useState(true);
    const [segment, setSegment] = useState('delivery');

    return (
        <main className="min-h-screen bg-brand-cream p-6 md:p-12 text-brand-black">
            <div className="max-w-4xl mx-auto space-y-10">

                {/* Cabeçalho */}
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Componentes do Visual Lanches</h1>
                </div>

                {/* 1. Botões */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold">Botões (Mínimo 44px)</h2>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">Botão Principal</Button>
                        <Button variant="secondary">Botão Secundário</Button>
                        <Button variant="outline">Botão Contorno</Button>
                    </div>
                </section>

                {/* 2. Inputs e Cards */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold">Formularismo e Cards</h2>
                    <Card className="grid md:grid-cols-2 gap-4">
                        <Input label="Nome do Cliente" placeholder="Ex: João Silva" />
                        <Input label="Telefone" placeholder="(11) 99999-9999" error="Campo obrigatório" />
                    </Card>
                </section>

                {/* 3. Chips e Status */}
                <section className="space-y-3">
                    {/* Carrossel Horizontal de Categorias */}
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 px-2 scrollbar-none">
                        <CategoryChip
                            label="Todos"
                            icon={<TodosIcon />}
                            active={activeChip === 'Todos'}
                            onClick={() => setActiveChip('Todos')}
                        />
                        <CategoryChip
                            label="Promoções"
                            icon={<Tag className="w-6 h-6" />}
                            active={activeChip === 'Promoções'}
                            onClick={() => setActiveChip('Promoções')}
                        />
                        <CategoryChip
                            label="Lanches Salgados"
                            icon={<Hamburger className="w-6 h-6" />}
                            active={activeChip === 'Lanches Salgados'}
                            onClick={() => setActiveChip('Lanches Salgados')}
                        />
                        <CategoryChip
                            label="Lanches Doces"
                            icon={<Cookie className="w-6 h-6" />}
                            active={activeChip === 'Lanches Doces'}
                            onClick={() => setActiveChip('Lanches Doces')}
                        />
                        <CategoryChip
                            label="Kids"
                            icon={<Smile className="w-6 h-6" />}
                            active={activeChip === 'Kids'}
                            onClick={() => setActiveChip('Kids')}
                        />
                        <CategoryChip
                            label="Molhos"
                            icon={<Flame className="w-6 h-6" />}
                            active={activeChip === 'Molhos'}
                            onClick={() => setActiveChip('Molhos')}
                        />
                        <CategoryChip
                            label="Porções"
                            icon={<Popcorn className="w-6 h-6" />}
                            active={activeChip === 'Porções'}
                            onClick={() => setActiveChip('Porções')}
                        />
                        <CategoryChip
                            label="Tábuas"
                            icon={<UtensilsCrossed className="w-6 h-6" />}
                            active={activeChip === 'Tábuas'}
                            onClick={() => setActiveChip('Tábuas')}
                        />
                        <CategoryChip
                            label="Bebidas"
                            icon={<CupSoda className="w-6 h-6" />}
                            active={activeChip === 'Bebidas'}
                            onClick={() => setActiveChip('Bebidas')}
                        />
                        <CategoryChip
                            label="Picolés"
                            icon={<IceCream className="w-6 h-6" />}
                            active={activeChip === 'Picolés'}
                            onClick={() => setActiveChip('Picolés')}
                        />
                        <CategoryChip
                            label="Gelo"
                            icon={<Snowflake className="w-6 h-6" />}
                            active={activeChip === 'Gelo'}
                            onClick={() => setActiveChip('Gelo')}
                        />
                    </div>




                    <div className="flex flex-wrap gap-3 pt-2">
                        <StatusBadge type="open_paid" label="Aberto / Pago" />
                        <StatusBadge type="warning" label="Atenção / Preparando" />
                        <StatusBadge type="delayed" label="Atrasado" />
                    </div>
                </section>

                {/* 4. Controles (Toggle e Segmented) */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold">Toggles e Seletores</h2>
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <Toggle checked={toggleState} onChange={setToggleState} label="Loja Aberta para Pedidos" />

                        <div className="w-full md:w-72">
                            <SegmentedControl
                                options={[
                                    { value: 'delivery', label: 'Entrega' },
                                    { value: 'pickup', label: 'Retirada' }
                                ]}
                                selected={segment}
                                onChange={setSegment}
                            />
                        </div>
                    </div>
                </section>

                {/* 5. Skeleton Loaders (Glassmorphism) */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold">Skeleton de Vidro Embaçado (Glassmorphism)</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Skeleton variant="line" className="col-span-full" />
                        <div className="flex gap-3 items-center">
                            <Skeleton variant="square" />
                            <div className="flex-1 space-y-2">
                                <Skeleton variant="line" />
                                <Skeleton variant="line" className="w-2/3" />
                            </div>
                        </div>
                        <Skeleton variant="card" className="col-span-full md:col-span-2" />
                    </div>
                </section>

            </div>
        </main>
    );
}