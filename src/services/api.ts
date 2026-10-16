import {
    mockCategorias as initialCategorias,
    mockProdutos as initialProdutos,
    mockPedidosPainel as initialPedidos,
    mockLojaStatus as initialLojaStatus,
    mockAgendados as initialAgendados,
    mockDashboard,
} from '@/data/mockData';
import { ENV } from '../config/env';
import { ApiResponse } from '../types/cliente';

// Simulação de delay
const delay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper de resposta padrão
function successResponse<T>(data: T): ApiResponse<T> {
    return { success: true, data, error: null };
}

function errorResponse<T>(message: string): ApiResponse<T> {
    return { success: false, data: null, error: message };
}

// Estrutura de dados em memória para o mock
let mockProdutos = [...initialProdutos];
let mockCategorias = [...initialCategorias];
let mockPedidos: any[] = [...initialPedidos];
let mockAgendados = [...initialAgendados];
let mockLojaStatus = { ...initialLojaStatus };

interface Handlers<T> {
    mock: () => T | Promise<T>;
    database?: () => T | Promise<T>;
}

async function resolver<T>(operacao: string, handlers: Handlers<T>): Promise<ApiResponse<T>> {
    try {
        if (ENV.dataSource === 'database') {
            if (!handlers.database) {
                return errorResponse('Banco ainda não configurado');
            }
            return successResponse(await handlers.database());
        }

        // Modo MOCK
        await delay(1000); // 1 segundo para o loading aparecer

        if (ENV.simulateMockError) {
            return errorResponse(`Erro simulado ao ${operacao}.`);
        }

        return successResponse(await handlers.mock());
    } catch (err) {
        return errorResponse(err instanceof Error ? err.message : 'Erro inesperado.');
    }
}




// As funções que as telas vão consumir
export const api = {
    // Buscar Categorias
    async buscarCategorias(): Promise<ApiResponse<any[]>> {
        return resolver('Carregar Categorias', {
            mock: () => mockCategorias,
        });
    },

    // Buscar Produtos
    async buscarProdutos(): Promise<ApiResponse<any[]>> {
        return resolver('Carregar Produtos', {
            mock: () => mockProdutos,
        });
    },

    // Atualizar Produto
    async atualizarProduto(id: string, novosDados: any): Promise<ApiResponse<any>> {
        return resolver('Atualizar Produto', {
            mock: () => {
                // Atualiza na variável em memória
                mockProdutos = mockProdutos.map((item) =>
                    item.id === id ? { ...item, ...novosDados } : item
                );

                return { id, ...novosDados };
            },
        });
    },

    // Buscar Status da Loja
    async buscarStatusLoja(): Promise<ApiResponse<any>> {
        return resolver('Buscar Status da Loja', {
            mock: () => mockLojaStatus,
        });
    },

    // Criar Pedido
    async criarPedido(dadosPedido: any): Promise<ApiResponse<any>> {
        return resolver('Criar Pedido', {
            mock: () => {
                const novoPedido = {
                    id: String(Date.now()),
                    criadoEm: new Date().toISOString(),
                    status: 'pendente',
                    ...dadosPedido,
                };

                mockPedidos.unshift(novoPedido);

                return novoPedido;
            },
        });
    },

    // Buscar Pedido
    async buscarPedido(id: string): Promise<ApiResponse<any>> {
        return resolver('Buscar Pedido', {
            mock: () => {
                const pedido = mockPedidos.find((item) => item.id === id);

                if (!pedido) {
                    throw new Error('Pedido não encontrado.');
                }

                return pedido;
            },
        });
    },

    // Buscar Pedidos do Painel
    async buscarPedidosPainel(): Promise<ApiResponse<any[]>> {
        return resolver('Buscar Pedidos do Painel', {
            mock: () => mockPedidos,
        });
    },

    // Mudar Status do Pedido
    async mudarStatusPedido(id: string, novoStatus: string): Promise<ApiResponse<any>> {
        return resolver('Mudar Status do Pedido', {
            mock: () => {
                let pedidoAtualizado = null;

                mockPedidos = mockPedidos.map((pedido) => {
                    if (pedido.id === id) {
                        pedidoAtualizado = { ...pedido, status: novoStatus };
                        return pedidoAtualizado;
                    }
                    return pedido;
                });

                if (!pedidoAtualizado) {
                    throw new Error('Pedido não encontrado.');
                }

                return pedidoAtualizado;
            },
        });
    },

    // Buscar Agendados
    async buscarAgendados(): Promise<ApiResponse<any[]>> {
        return resolver('Buscar Agendados', {
            mock: () => mockAgendados,
        });
    },

    // Buscar Dados do Dashboard
    async buscarDadosDashboard(): Promise<ApiResponse<any>> {
        return resolver('Buscar Dados do Dashboard', {
            mock: () => mockDashboard,
        });
    },
};
