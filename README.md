# Sistema Visual do Cliente - Visual Lanches


Interface do cliente para visualização do cardápio digital interativo, personalização de lanches, carrinho de compras, cálculo de entregas e acompanhamento de pedidos em tempo real.

---

## Repositório Relacionado

- **Painel Administrativo**: https://github.com/IagoCrs/visual-lanches-adm

---

## Arquitetura e Padronização de Pastas

Este projeto utiliza **Next.js 16 (App Router)** com **TypeScript** e **Tailwind CSS**. A estrutura de pastas segue o padrão unificado entre os dois repositórios:

```text
visual-lanches-pedidos/
├── src/
│   ├── app/              # Rotas e páginas principais (page.tsx, layout.tsx)
│   ├── components/       # Componentes visuais (Header, ProductCard, Modais, Status)
│   ├── context/          # Estados globais (CartContext.tsx)
│   ├── data/             # Dados simulados/mocks do cardápio (menuData.ts)
│   ├── services/         # Integrações e APIs simuladas (storeService.ts)
│   └── types/            # Interfaces TypeScript compartilhadas (diner.ts)
├── .eslintrc.json        # Regras de qualidade e linting de código
├── .prettierrc           # Padrão de formatação automática de código
├── package.json          # Dependências do projeto
└── README.md             # Guia de instalação e execução
```

---

## Como Instalar e Rodar o Projeto (Do Zero)

### Pré-requisitos
- **Node.js** >= 18.x
- **npm** ou **pnpm**

### Passo a Passo

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/IagoCrs/visual-lanches-pedidos.git
   cd visual-lanches-pedidos
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   ```

3. **Executar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

---

## Configuração de Fonte de Dados (Mock vs Banco de Dados)

O projeto possui uma camada centralizada de integração em [api.ts](file:///c:/Users/Usuario/Documents/Trabalhos/Sistema-Visual/src/services/api.ts). Você pode alternar entre o modo de simulação em memória (Mock) e banco de dados real através das variáveis de ambiente no arquivo `.env`:

```env
# Fonte dos dados: 'mock' ou 'database'
NEXT_PUBLIC_DATA_SOURCE=mock

# Simulação de erros na API mockada para testes de interface (true / false)
NEXT_PUBLIC_MOCK_SIMULATE_ERROR=false

# Link do banco ou API externa (utilizado quando NEXT_PUBLIC_DATA_SOURCE=database)
NEXT_PUBLIC_API_URL=
```

- **Modo `mock`**: Carrega dados simulados com latência realista (~1 segundo) e mantém alterações na memória da sessão.
- **Modo `database`**: Encaminha chamadas para o link configurado (exibe *"Banco ainda não configurado"* enquanto o backend não estiver integrado).
- **Simulação de erro (`NEXT_PUBLIC_MOCK_SIMULATE_ERROR=true`)**: Força as funções a retornarem respostas de erro para validação dos estados de erro das telas.

---

## Tecnologias Utilizadas

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (Ícones)
