'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Bike, Calendar } from 'lucide-react';
import { api } from '@/services/api';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

export const StoreStatusCard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<any>(null);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        async function carregarStatus() {
            setLoading(true);
            const res = await api.buscarStatusLoja();
            if (res.success) {
                setStatus(res.data);
            } else {
                setErro(res.error || 'Erro ao carregar dados');
            }
            setLoading(false);
        }

        carregarStatus();
    }, []);

    // 1. Loading: Skeleton de vidro embaçado
    if (loading) {
        return <Skeleton variant="card" className="h-32" />;
    }

    // 2. Erro simulado / indisponibilidade
    if (erro || !status) {
        return (
            <Card className="border-red-200 bg-red-50/50">
                <p className="text-sm text-red-600 font-medium">{erro || 'Informações indisponíveis no momento.'}</p>
            </Card>
        );
    }

    // 3. Loja Fechada
    if (!status.aberta) {
        return (
            <Card className="border-amber-200 bg-amber-50/40 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-gray-500" />
                        Fechado agora
                    </span>
                    <span className="text-xs text-gray-600 font-medium">
                        Abre às <strong className="text-gray-900">{status.horarioAbertura}</strong>
                    </span>
                </div>

                <p className="text-xs text-gray-600">
                    Você pode antecipar sua escolha e agendar a entrega para quando abrirmos.
                </p>

                <Button variant="primary" className="w-full gap-2">
                    <Calendar size={16} />
                    Agendar meu pedido
                </Button>
            </Card>
        );
    }

    // 4. Loja Aberta
    return (
        <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Aberto agora
                </span>
                <span className="text-xs text-gray-500">
                    Mínimo: <strong>{status.pedidoMinimo}</strong>
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black/5 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-500" />
                    <span>{status.tempoEntrega}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Bike size={14} className="text-amber-500" />
                    <span>Entrega a partir de {status.taxaEntregaAPartirDe}</span>
                </div>
            </div>
        </Card>
    );
};
