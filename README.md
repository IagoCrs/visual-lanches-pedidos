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

## Tecnologias Utilizadas

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (Ícones)
