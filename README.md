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

**Backend:**

- JavaScript (Node)
- Express
- MySQL
- cors

## Como executar localmente

### Pré-requisitos

- Node.js e npm instalados.
- Git (opcional, para clonar o repositório).

### Instalação

```bash
git clone https://github.com/lucasknohara/RedePratos.git
cd RedePratos
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite no terminal.

## Equipe

- **Integrantes:** Lucas Kaoru Nohara Pereira - RM 572755, Matheus Lemos Lima - RM 570105.

---

## Regras de funcionamento

- Cada usuário possui um dos dois perfis disponíveis: Doador ou Instituição.
- O Doador é responsável por cadastrar os alimentos e disponibilizá-los para doação.
- Uma doação pode receber solicitações de diferentes instituições.
- O Doador analisa as solicitações e escolhe se deseja aceitá-las ou recusá-las.
- Quando uma solicitação é aceita, a doação fica reservada para a instituição selecionada.
- A conclusão depende da confirmação da entrega pelo Doador e pela Instituição.
- Após as duas confirmações, a solicitação e a doação são marcadas como concluídas, e a quantidade correspondente é descontada do estoque do Doador.

## Organização do projeto

O repositório está organizado em três partes principais:

```text
RedePratos/
├── Frontend/
│   └── Aplicação React
├── Backend/
│   └── API Node.js e Express
├── Banco/
│   └── Scripts e estrutura do banco de dados
└── README.md
```

## Banco de dados

O projeto utiliza MySQL para armazenar as informações da plataforma.

Entre as principais entidades estão:

- **Usuários:** dados cadastrais, informações de contato e tipo de perfil.
- **Alimentos:** produtos cadastrados pelos doadores, com quantidade, unidade e validade.
- **Doações:** ofertas de alimentos disponibilizadas para as instituições.
- **Solicitações:** pedidos realizados pelas instituições e acompanhamento de seus respectivos status.

O relacionamento entre essas entidades permite acompanhar o processo desde o cadastro do alimento até a confirmação da entrega.

## Indicadores de impacto

A plataforma também apresenta indicadores para demonstrar os resultados das doações concluídas.

Para os Doadores, são apresentados:

- Número de doações concluídas.
- Quantidade de alimentos doados, agrupada por unidade.
- Instituições alcançadas.
- Níveis e conquistas de acordo com as doações realizadas.

Para as Instituições, são apresentados:

- Número de doações recebidas.
- Quantidade de alimentos recebidos, agrupada por unidade.
- Número de doadores parceiros.

Os indicadores consideram as entregas confirmadas pelos dois lados da doação.

## Demonstração

O Front-end do RedePratos está publicado na Vercel e pode ser acessado pelo link:

https://rede-pratos.vercel.app/