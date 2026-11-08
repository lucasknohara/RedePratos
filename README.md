# RedePratos

**Conectando quem pode doar alimentos a instituições que precisam deles.**

O **RedePratos** é um projeto acadêmico desenvolvido no contexto da Global Solution da FIAP. A proposta é aproximar pessoas e estabelecimentos que possuem alimentos próprios para doação de instituições sociais que podem recebê-los, contribuindo para reduzir o desperdício e facilitar o acesso a alimentos.

## O problema

Alimentos próprios para consumo podem ser descartados por falta de canais simples para encontrar quem possa recebê-los ou falta de aviso que aquele alimento está perto da validade. Ao mesmo tempo, instituições sociais podem ter dificuldade para localizar doações disponíveis, descobrir quantidades, verificar prazos de validade e acompanhar pedidos feitos a doadores, com isso RedePratos propõe organizar esse contato em um único ambiente digital. A plataforma pretende tornar a oferta de alimentos mais visível e facilitar o acompanhamento das solicitações, desde a publicação da doação até a confirmação da entrega.

## Público-alvo

A plataforma trabalha com dois perfis:

- **Doador:** pessoa ou representante de um estabelecimento que disponibiliza alimentos. 

- **Instituição:** organização social que procura alimentos para atender às pessoas acompanhadas por seu trabalho.

## Como funciona

1. O Doador cadastra os alimentos, informando quantidade, categoria, validade, origem e região.
2. As ofertas ficam disponíveis para consulta pelas instituições.
3. A Instituição pesquisa os alimentos e solicita a reserva do que precisa.
4. O Doador analisa o pedido e pode aceitá-lo ou recusá-lo.
5. Após a confirmação da entrega, a doação pode ser marcada como concluída.

A reserva depende da aprovação do Doador. A doação só deve ser considerada concluída depois da confirmação da entrega.

## Principais funcionalidades

- Interfaces de cadastro e login, com validações locais.
- Painel do Doador, despensa, cadastro de alimentos e acompanhamento das doações.
- Recebimento e resposta às solicitações das instituições.
- Painel da Instituição, busca de doações e acompanhamento dos pedidos.
- Perfil para cada tipo de usuário.
- Área **Meu Impacto**, com indicadores demonstrativos.
- Busca, filtros e mensagens para estados sem resultados.

## Tecnologias

**Front-end:**

- React e JavaScript (JSX)
- Vite
- Tailwind CSS
- React Router
- Lucide React

A interface utiliza componentes reutilizáveis para manter consistência visual e facilitar a manutenção.

**Próxima etapa — Backend:**

A versão atual é um protótipo Front-end: ainda não possui API integrada, autenticação real ou persistência compartilhada. As interações e os dados apresentados são demonstrativos e controlados localmente pela interface.

O planejamento prevê desenvolver e integrar uma API com operações CRUD, autenticação, controle de acesso por perfil e persistência de dados. As tecnologias de armazenamento e hospedagem serão definidas conforme os requisitos da disciplina e a orientação docente.

## Como executar localmente

### Pré-requisitos

- Node.js e npm instalados.
- Git (opcional, para clonar o repositório).

### Instalação

```bash
git clone <https://github.com/lucasknohara/RedePratos>
cd RedePratos
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite no terminal.

## Equipe

- **Integrantes:** Lucas Kaoru Nohara Pereira - RM 572755, Matheus Lemos Lima - RM 570105
