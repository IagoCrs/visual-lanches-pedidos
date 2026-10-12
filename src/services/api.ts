// src/services/api.ts
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
let mockProdutos: any[] = [];

let mockCategorias: any[] = [];

let mockPedidos: any[] = [];

let mockLojaStatus = {
    aberta: true,
    mensagem: 'Loja aberta e aceitando pedidos',
};



// As funções que as telas vão consumir
export const api = {
    // Buscar Categorias
    async buscarCategorias(): Promise<ApiResponse<any[]>> {
        // Se for modo DATABASE:
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        // Se for modo MOCK:
        await delay(1000); // 1 segundo para loading aparecer

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao carregar categorias.');
        }

        return successResponse(mockCategorias);
    },

    // Buscar Produtos
    async buscarProdutos(): Promise<ApiResponse<any[]>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao carregar produtos.');
        }

        return successResponse(mockProdutos);
    },

    // Atualizar Produto
    async atualizarProduto(id: string, novosDados: any): Promise<ApiResponse<any>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao atualizar produto.');
        }

        // Atualiza na variável em memória
        mockProdutos = mockProdutos.map((item) =>
            item.id === id ? { ...item, ...novosDados } : item
        );

        return successResponse({ id, ...novosDados });
    },

    // Buscar Status da Loja
    async buscarStatusLoja(): Promise<ApiResponse<any>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao carregar status da loja.');
        }

        return successResponse(mockLojaStatus);
    },

    // Criar Pedido
    async criarPedido(dadosPedido: any): Promise<ApiResponse<any>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao criar pedido.');
        }

        const novoPedido = {
            id: String(Date.now()),
            criadoEm: new Date().toISOString(),
            status: 'pendente',
            ...dadosPedido,
        };

        mockPedidos.unshift(novoPedido);

        return successResponse(novoPedido);
    },

    // Buscar Pedido
    async buscarPedido(id: string): Promise<ApiResponse<any>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao buscar pedido.');
        }

        const pedido = mockPedidos.find((item) => item.id === id);

        if (!pedido) {
            return errorResponse('Pedido não encontrado.');
        }

        return successResponse(pedido);
    },

    // Buscar Pedidos do Painel
    async buscarPedidosPainel(): Promise<ApiResponse<any[]>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao carregar pedidos do painel.');
        }

        return successResponse(mockPedidos);
    },

    // Mudar Status do Pedido
    async mudarStatusPedido(id: string, novoStatus: string): Promise<ApiResponse<any>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao mudar status do pedido.');
        }

        let pedidoAtualizado = null;

        mockPedidos = mockPedidos.map((pedido) => {
            if (pedido.id === id) {
                pedidoAtualizado = { ...pedido, status: novoStatus };
                return pedidoAtualizado;
            }
            return pedido;
        });

        if (!pedidoAtualizado) {
            return errorResponse('Pedido não encontrado.');
        }

        return successResponse(pedidoAtualizado);
    },

    // Buscar Agendados
    async buscarAgendados(): Promise<ApiResponse<any[]>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao carregar pedidos agendados.');
        }

        const agendados = mockPedidos.filter((pedido) => pedido.agendado === true);

        return successResponse(agendados);
    },

    // Buscar Dados do Dashboard
    async buscarDadosDashboard(): Promise<ApiResponse<any>> {
        if (ENV.dataSource === 'database') {
            return errorResponse('Banco ainda não configurado');
        }

        await delay(1000);

        if (ENV.simulateMockError) {
            return errorResponse('Erro simulado ao carregar dados do dashboard.');
        }

        const dashboard = {
            totalPedidos: mockPedidos.length,
            pedidosPendentes: mockPedidos.filter((p) => p.status === 'pendente').length,
            faturamentoTotal: mockPedidos.reduce((total, p) => total + (p.total || 0), 0),
        };

        return successResponse(dashboard);
    },
};
