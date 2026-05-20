# API de Clientes

Esta é uma API RESTful desenvolvida em Node.js para o gerenciamento de clientes (Pessoas). O foco principal deste projeto é aplicar boas práticas de engenharia de software, garantindo alta coesão, baixo acoplamento, segurança e facilidade de manutenção a longo prazo.

## 🚀 Tecnologias Utilizadas

A aplicação foi construída com o que há de mais moderno e robusto no ecossistema JavaScript/TypeScript:

- **Node.js & Express**: Base da aplicação e gerenciamento de rotas HTTP.
- **TypeScript**: Adiciona tipagem estática, trazendo segurança e previsibilidade ao código.
- **TypeORM**: ORM (Object-Relational Mapper) utilizado para gerenciar a comunicação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional robusto para armazenamento dos dados.
- **Zod**: Biblioteca de validação de esquemas (schema validation) para garantir que os dados recebidos na API estejam corretos antes de processá-los.
- **Vitest & Supertest**: Ferramentas modernas e rápidas para a execução de testes automatizados de ponta a ponta (End-to-End - E2E).

---

## 🏗️ Arquitetura e Organização do Projeto

O projeto foi estruturado com base em conceitos de **Clean Architecture** (Arquitetura Limpa) e **Domain-Driven Design (DDD)**. 

Mas por que estruturar assim? A resposta é simples: **Escalabilidade e Manutenibilidade**. Projetos tradicionais que misturam regras de banco de dados diretamente nas rotas se tornam impossíveis de dar manutenção quando crescem. Separando por camadas, garantimos que as regras de negócio fiquem isoladas e protegidas de mudanças técnicas externas.

A estrutura de pastas principal está dentro de `src/`:

- `domain/`: **O coração da aplicação.** Aqui residem as regras de negócio puras (Use Cases), Entidades e Contratos (Interfaces) de Repositórios. Esta camada não sabe que existe um banco de dados ou uma rota HTTP.
- `infra/`: **Detalhes técnicos.** Tudo o que se comunica com o mundo externo fica aqui. Isso inclui os Controladores (Controllers), as Rotas do Express, a conexão com o banco via TypeORM, Validações do Zod e middlewares de erro.
- `core/`: **Classes essenciais.** Onde ficam armazenadas definições globais vitais, como classes padronizadas de tratamento de erros (`AppError`) e tipagens muito genéricas.
- `shared/`: **Utilitários e Constantes.** Pasta destinada a abrigar funções úteis (helpers), constantes estáticas e configurações que podem ser usadas livremente em qualquer lugar do sistema, sem gerar acoplamento.

---

## ⚙️ Instalação e Configuração

Para rodar o projeto localmente na sua máquina, siga os passos abaixo:

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (Versão 18 ou superior recomendada)
- Um banco de dados **PostgreSQL** rodando localmente (pode usar Docker para isso).

### 2. Passo a passo

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <url-do-repositorio>
   cd api-clientes
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configuração de Variáveis de Ambiente:**
   Crie um arquivo chamado `.env` na raiz do projeto (mesmo local onde fica o `package.json`). Você pode se basear no arquivo `.env.example`.
   Certifique-se de preencher corretamente a URL de conexão com o seu banco de dados PostgreSQL.

---

## 🏃 Como Rodar a Aplicação

Com o banco de dados rodando e o `.env` configurado, você pode iniciar o servidor de desenvolvimento.

**Modo de Desenvolvimento:**
```bash
npm run dev
```
O servidor será iniciado utilizando o `tsx` em modo de observação (`watch`), e estará disponível na porta definida (por padrão, porta `3333`).

---

## 🧪 Como Rodar os Testes

Esta API possui Testes E2E (End-to-End) automatizados que garantem que as rotas HTTP, as validações e a inserção no banco de dados estão ocorrendo conforme o esperado, de ponta a ponta.

Para rodar os testes, usamos o **Vitest**. 

### Executando os Testes
Para rodar todos os testes do projeto, abra o terminal e digite:
```bash
npx vitest
```

### O que acontece durante os testes?
- O `Supertest` simula requisições HTTP (GET, POST, PATCH, DELETE) reais na API sem precisar rodar o servidor em uma porta.
- O `Vitest` valida as saídas (Status Codes e o corpo da resposta).
- **Importante:** No teste de criação, o banco de dados é limpo antes da execução (`TRUNCATE`) para garantir a confiabilidade (isolamento) do teste, prevenindo conflitos com dados anteriores.

### Como passar os dados (Testando Manualmente)

Caso você queira testar a API manualmente usando ferramentas como **Postman**, **Insomnia** ou no próprio frontend, certifique-se de passar os dados no formato `JSON`. 

O Zod fará a validação baseada no seguinte formato. Para **criar um cliente** (`POST /people`), o corpo da requisição (`body`) deve ser exatamente assim:

```json
{
  "name": "Osmar Mendes",         // Obrigatório (Mínimo de 3 caracteres)
  "email": "osmar@email.com",     // Obrigatório (Formato de e-mail válido)
  "cpf": "12345678900",           // Obrigatório (Exatamente 11 caracteres)
  "phone": "85999999999",         // Obrigatório (Mínimo de 10 caracteres)
  "address": "Rua Exemplo, 123",  // Obrigatório
  "gender": "male",               // Opcional
  "profession": "Developer",      // Opcional
  "education": "Superior Completo"// Opcional
}
```

Para **atualizar um cliente** (`PATCH /people/:id`), você pode enviar apenas os campos que deseja alterar, pois a rota aceita atualizações parciais. Por exemplo, para atualizar apenas o telefone:

```json
{
  "phone": "11988887777"
}
```

### Tratamento de Erros e Regras de Negócio

A API possui validações rigorosas tanto no formato dos dados quanto nas regras de negócio. Caso você envie dados incorretos ou tente burlar alguma regra, a API retornará os seguintes erros:

- **Erro 400 (Bad Request) - Erro de Validação:** 
  Ocorre quando você envia um dado no formato errado. Exemplo: um CPF com letras, um e-mail sem `@`, ou esquecer de enviar um campo obrigatório. A API retornará uma mensagem detalhando exatamente qual campo falhou na validação.

- **Erro 409 (Conflict) - Dados Duplicados:** 
  Na nossa regra de negócio, **não é permitido cadastrar mais de uma pessoa com o mesmo E-mail, CPF ou Telefone**. Caso você tente enviar dados repetidos que já existem no banco de dados, a API vai barrar a criação e retornará um erro `409 Conflict` com uma mensagem clara:
  - `"Email already exists"` (E-mail já cadastrado)
  - `"CPF already exists"` (CPF já cadastrado)
  - `"Phone already exists"` (Telefone já cadastrado)

- **Erro 404 (Not Found) - Cliente Não Encontrado:**
  Ocorre ao tentar buscar, atualizar ou deletar um cliente passando um ID na URL (`/people/:id`) que não existe no banco de dados.

- **Erro 500 (Internal Server Error):**
  Ocorre caso haja alguma falha inesperada no servidor ou no banco de dados.

---
*Projeto desenvolvido por Osmar Mendes.*
