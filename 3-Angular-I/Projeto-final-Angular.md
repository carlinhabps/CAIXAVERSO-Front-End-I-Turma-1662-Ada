# Projeto Final: Dashboard de Controle Financeiro com Angular

## Objetivo do Projeto

Desenvolver uma aplicação web de controle financeiro pessoal (Single Page Application) utilizando o framework  **Angular** . O sistema permitirá ao usuário registrar suas receitas, despesas e investimentos, além de acompanhar métricas mensais e projetar metas de gastos com base em seu perfil financeiro.

## 1. Requisitos Funcionais (Regras de Negócio)

### 1.1. Painel Resumo (Dashboard)

* **Cards de Resumo:** A tela principal deve exibir cards consolidando as informações do mês atual:
  * Total de Entradas (Receitas)
  * Total de Saídas (Despesas)
  * Saldo Atual (Entradas - Saídas)
* **Visualização em Tabela:** Apresentar uma tabela listando todos os registros do mês.
* **Filtros:** O usuário deve ser capaz de filtrar os dados da tabela por **Mês** e por **Categoria** (utilizando um `select<span class="token operator">-</span>option`).

### 1.2. Gestão de Registros (Lançamentos)

* O usuário deve poder **adicionar** e **remover** registros financeiros.
* Cada registro deve conter obrigatoriamente os seguintes campos:
  * **ID:** Identificador único gerado automaticamente (oculto para o usuário). Sugestão: biblioteca `uuid` ou `crypto<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span>`.
  * **Descrição:** Texto explicativo do lançamento (ex: "Conta de Luz", "Salário").
  * **Tipo:** Entrada, Saída ou Investimento.
  * **Categoria:** Categoria customizável atrelada ao tipo.
  * **Data:** Data da ocorrência. *(Regra: O sistema não deve permitir o cadastro de datas futuras para despesas e receitas).*
  * **Valor:** Valor monetário do registro.

### 1.3. Metas de Gastos e Perfil Financeiro

* O usuário deverá escolher entre pelo menos **3 perfis de consumo** (ex: Conservador, Moderado, Arrojado), que definirão um percentual máximo de gastos em relação às suas entradas.
* **Cálculo de Projeção:** O sistema deve calcular a situação atual do usuário, exibir uma mensagem de status (Positiva, Alerta ou Negativa) e calcular a "margem de gasto diário" até o fim do mês.

> **Exemplo de Regra de Negócio (Projeção):**
>
> * Hoje é dia 11 de Maio (mês de 31 dias, restam 20 dias).
> * **Entradas:** R5.000,00∣∗∗Saıˊdas:∗∗R**5.000**,**00∣**∗**∗**S**a**ı**ˊ**d**a**s**:**∗**∗**R 2.000,00.
> * **Perfil:** Conservador (Permite gastar até 50% da entrada).
> * **Teto de Gastos:** 50% de R5.000=R**5.000**=**R** 2.500,00.
> * **Saldo da Meta:** R2.500(Teto)−R**2.500**(**T**e**t**o**)**−**R** 2.000 (Gasto atual) = R$ 500,00 restantes.
> * **Resultado Diário:** R500,00/20dias=Osistemainformaqueousuaˊriopodegastar∗∗R**500**,**00/20**d**ia**s**=**O**s**i**s**t**e**main**f**or**ma**q**u**eo**u**s**u**a**ˊ**r**i**o**p**o**d**e**g**a**s**t**a**r**∗**∗**R** 12,50 por dia** até o fim do mês.

---

## 2. Requisitos Técnicos e Arquitetura Angular

Como estamos avaliando o domínio do Angular, o projeto **deve** seguir as seguintes diretrizes arquiteturais:

* **Componentização:** A aplicação deve ser dividida em múltiplos componentes de forma lógica e reutilizável.
  * *Exemplos sugeridos:* Um componente para o Cabeçalho/Menu, um componente para os Cards de Resumo, um componente para o Formulário, um componente para a Tabela.
* **Comunicação entre Componentes (Input/Output):** É obrigatório demonstrar o fluxo de dados entre componentes Pai e Filho utilizando os decorators `@<span class="token function">Input</span><span class="token punctuation">(</span><span class="token punctuation">)</span>` e `@<span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>` (com `EventEmitter`).
  * *Exemplo:* O componente pai `<span class="token operator"><</span>app<span class="token operator">-</span>dashboard<span class="token operator">></span>` passa os dados filtrados via `@<span class="token function">Input</span><span class="token punctuation">(</span><span class="token punctuation">)</span>` para o componente filho `<span class="token operator"><</span>app<span class="token operator">-</span>tabela<span class="token operator">-</span>registros<span class="token operator">></span>`, e a tabela emite um evento de exclusão via `@<span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>` para o pai.
* **Persistência de Dados:** Salvar os registros e configurações no `localStorage`. Utilizar um **Service** (com `@<span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>`) para centralizar a lógica de leitura e gravação no storage. A carga inicial pode ser feita através de um mock caso o storage esteja vazio.
* **Manipulação de Datas:** Utilizar a biblioteca `moment<span class="token punctuation">.</span>js` (ou nativa) para formatar e calcular intervalos.
* **Estilização e Responsividade:** O layout deve ser responsivo. O uso de bibliotecas compatíveis com Angular (como Angular Material, PrimeNG, TailwindCSS ou Bootstrap) é recomendado.

---

## 3. Diferenciais (Opcionais)

Para alunos que desejam ir além do escopo básico, os seguintes itens serão considerados diferenciais:

* **Criação de Rotas (Routing):** Implemente o `RouterModule` para navegar entre diferentes páginas.
  * *Exemplo sugerido:* `<span class="token operator">/</span>dashboard` (Resumo), `<span class="token operator">/</span>lancamentos` (Tabela e Formulário), `<span class="token operator">/</span>metas` (Perfis e Projeções).
* **Uso de Gráficos:** Integração de bibliotecas (como `Chart<span class="token punctuation">.</span>js` ou `ngx<span class="token operator">-</span>charts`) para exibir visualmente despesas por categoria ou a evolução do saldo.
* **Módulo de Investimentos:** Uma área (ou rota) dedicada apenas a gerenciar aportes de investimentos, separando-os das despesas comuns.
* **Qualidade de UI/UX:** Apresentação visual caprichada, baseada em protótipos de design (sugestão: buscar referências no Figma Community).
