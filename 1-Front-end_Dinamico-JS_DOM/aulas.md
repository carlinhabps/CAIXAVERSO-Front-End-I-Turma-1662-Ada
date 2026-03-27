---
marp: true
math: mathjax
---

# FE-JS-004 - Frontend Dinâmico (JS DOM)

## Manipulação de DOM e Interatividade

---

# Estrutura do Módulo

Este módulo introduz os conceitos fundamentais para transformar páginas
HTML estáticas em **interfaces dinâmicas e interativas** utilizando
JavaScript.

Ao final das aulas, o aluno será capaz de:

- Manipular elementos do DOM
- Responder a eventos do usuário
- Alterar conteúdo dinamicamente
- Criar pequenas aplicações no navegador

---

# Aula 1 - Introdução ao DOM

## 1. O papel do JavaScript no Frontend

Na web moderna, usamos três tecnologias principais:

| Tecnologia | Função              |
| ---------- | ------------------- |
| HTML       | estrutura da página |
| CSS        | aparência           |
| JavaScript | comportamento       |

---

## 2. O que acontece quando uma página carrega

Quando o navegador abre uma página:

```
lê o HTML -> constrói a árvore do documento -> aplica CSS -> executa JavaScript
```

Fluxo simplificado:

```
HTML
 ↓
Parser do navegador
 ↓
DOM
 ↓
JavaScript pode manipular
```

---

## 3. O que é o DOM?

DOM significa **Document Object Model**.

É a representação do documento HTML em forma de **árvore de objetos**
que o JavaScript consegue manipular.

---

### Estrutura visual do DOM

HTML:

```html
<body>
  <h1>Olá</h1>
  <button>Clique</button>
</body>
```

Representação:

    Document
     └── body
          ├── h1
          └── button

Cada elemento vira um objeto manipulável em JavaScript.

---

## 4. Por que o DOM é importante

Sem o DOM, JavaScript não conseguiria:

- alterar textos
- reagir a cliques
- criar elementos
- atualizar interfaces

Por exemplo:

```js
document.querySelector("h1").innerText = "Novo título";
```

Isso altera o conteúdo da página em tempo real.

---

## 5. Inserindo JavaScript na página

Existem duas formas principais.

### Script interno

```js
<script>console.log("Olá")</script>
```

### Script externo (mais usado)

```js
<script src="script.js"></script>
```

Arquivo:

```js
console.log("Olá mundo");
```

---

## 6. Onde colocar o script

Problema comum:

```js
<script src="script.js"></script>

<button id="btn">Clique</button>
```

O JavaScript executa antes do botão existir.

---

Solução:

```js
<button id="btn">Clique</button>

<script src="script.js"></script>
```

Ou usar:

```js
document.addEventListener("DOMContentLoaded", () => {});
```

---

## 7. Selecionando elementos da página

Para manipular elementos, primeiro precisamos selecioná-los.

JavaScript usa o objeto global:

```js
document;
```

Ele representa todo o documento HTML.

---

### Seletores Específicos

Esses métodos são os "veteranos". Eles são extremamente rápidos porque o navegador sabe exatamente onde procurar, mas são menos flexíveis.

- `getElementById('id')`: Retorna um único elemento. Como IDs devem ser únicos no HTML, ele é a forma mais direta de acessar algo.
- `getElementsByClassName('classe')`: Retorna uma HTMLCollection (uma lista "viva" de elementos). Se você adicionar um elemento com essa classe via JS depois, a lista se atualiza sozinha.
- `getElementsByTagName('tag')`: Retorna todos os elementos de um tipo (ex: todos os `<li>` ou `<div>`).

---

### Seletores Modernos (Padrão CSS)

Com o surgimento do `querySelector`, a forma como selecionamos elementos mudou. Ele utiliza a mesma sintaxe que usamos no CSS, o que torna o código muito mais intuitivo.

- `querySelector('.seletor')`: Retorna o **primeiro** elemento que coincidir com o seletor. Se houver dez botões com a mesma classe, ele pegará apenas o primeiro.

> **Dica de ouro:** Use `#` para IDs, `.` para classes e o nome puro para tags. Ex:

```js
document.querySelector("main h1.titulo");
```

---

- `querySelectorAll(".seletor")`: Retorna uma **NodeList** com **todos** os elementos encontrados.
  - **Diferença crucial:** Ao contrário da HTMLCollection, a NodeList é "estática" (não muda se o DOM mudar depois) e aceita o método `.forEach()` nativamente, facilitando muito a criação de loops.

---

### Tabela Comparativa

| Método                   | Retorno        | Flexibilidade         | Sintaxe Exemplo     |
| ------------------------ | -------------- | --------------------- | ------------------- |
| `getElementById`         | 1 Elemento     | Baixa (apenas ID)     | `('header')`        |
| `getElementsByClassName` | HTMLCollection | Média (apenas Classe) | `('btn-blue')`      |
| `querySelector`          | 1 Elemento     | Alta (Seletores CSS)  | `('div > p.intro')` |
| `querySelectorAll`       | NodeList       | Alta (Seletores CSS)  | `('ul li.item')`    |

---

## 8. Acessando propriedades do elemento

```js
const titulo = document.querySelector("h1");

console.log(titulo);
```

No DevTools veremos:

```html
<h1>Olá</h1>
```

---

Podemos acessar informações:

```js
titulo.innerText;
```

ou

```js
titulo.innerHTML;
```

Exemplo:

```js
console.log(titulo.innerText);
```

Saída:

```
Olá
```

---

## Exercício

### O Gerenciador de Mercado

**O Cenário:** Você recebeu um HTML de um aplicativo de compras e precisa usar JavaScript para manipular os itens.

1. O Código Base (HTML)

---

HTML

```html
<div id="container">
  <h1 id="titulo">Lista de Compras</h1>

  <ul id="lista">
    <li class="item urgente">Leite</li>
    <li class="item">Pão</li>
    <li class="item urgente">Café</li>
    <li class="item">Manteiga</li>
  </ul>

  <button class="btn-main" id="add-btn">Adicionar Item</button>
</div>
```

---

2. As Missões

- **A Identificação:** Selecione o título da página usando `getElementById` e mude o texto para "Minha Lista VIP".
- **O Alerta:** Selecione todos os elementos que possuem a classe `urgente` usando `getElementsByClassName` e mude a cor do texto deles para vermelho.
- **A Precisão:** Use o `querySelector` para selecionar apenas o primeiro item da lista (`li`) e coloque-o em negrito.
- **A Varredura:** Use o `querySelectorAll` para selecionar todos os itens da lista. Use um `.forEach` para adicionar um emoji de 🛒 ao final do texto de cada um.
- **O Estilo:** Selecione o botão usando um seletor de ID dentro do `querySelector` (ex: `#add-btn`) e mude a cor de fundo dele.

---

# Aula 2 - Eventos, Formulários e Manipulação Dinâmica

## Revisão da Aula 1

### O que é o DOM?

**DOM** = Document Object Model. É a representação do HTML em forma de objetos que JavaScript pode manipular.

### Seleção de elementos

Antes de eventos, você precisa dominar **seleção de elementos**.

---

### Formas de Selecionar Elementos

```js
// Seletores específicos (rápidos, menos flexíveis)
document.getElementById("id"); // 1 elemento
document.getElementsByClassName("classe"); // Lista viva
document.getElementsByTagName("nome-da-tag"); // Lista viva

// Seletores modernos (flexíveis, padrão CSS)
document.querySelector(".seletor"); // Primeiro elemento
document.querySelectorAll(".seletor"); // Todos os elementos
```

### Acessando Conteúdo

```js
const elemento = document.querySelector("h1");

elemento.innerText; // Apenas texto
elemento.innerHTML; // HTML completo
elemento.value; // Para inputs
```

---

## 1. Entendendo Eventos

Um **evento** é algo que acontece na página:

- Usuário clica em um botão
- Usuário digita em um campo
- Página termina de carregar
- Mouse passa por um elemento

JavaScript permite **responder** a esses eventos.

---

## 2.Formas tradicionais (`onclick`, `onblur`, etc.)

Antes do `addEventListener`, era comum usar eventos de duas formas:

1. **No HTML (inline):**

```html
<button onclick="alert('clicou')">Clique</button>
<input onblur="console.log('perdeu foco')" />
```

2. **Via propriedade do elemento:**

```js
const botao = document.querySelector("#btn");
const campo = document.querySelector("#nome");

botao.onclick = () => console.log("clicou");
campo.onblur = () => console.log("perdeu foco");
```

---

**Vantagens (quando usar):**

- Sintaxe simples para exemplos rápidos
- Fácil de entender para iniciantes no primeiro contato

**Desvantagens (produção):**

- Mistura HTML com comportamento (inline), piorando manutenção
- Com `onclick`/`onblur` por propriedade, só existe **um** handler por vez
- Menos flexível do que `addEventListener` (opções como `once`, `passive`, `capture`)
- Escala pior em projetos maiores

**Resumo:** para aprendizado é útil conhecer `onclick`/`onblur`, mas em projetos reais prefira `addEventListener`.

---

## 3. Escutando Eventos com addEventListener

A forma moderna e recomendada de escutar eventos:

```js
elemento.addEventListener("evento", funcao);
```

Exemplo:

```js
const botao = document.querySelector("#btn");

botao.addEventListener("click", () => {
  console.log("Botão foi clicado!");
});
```

---

### Eventos Comuns

| Evento    | Quando ocorre        |
| --------- | -------------------- |
| `click`   | Clique do mouse      |
| `change`  | Valor de input muda  |
| `submit`  | Formulário é enviado |
| `keydown` | Tecla é pressionada  |
| `keyup`   | Tecla é liberada     |

---

| Evento      | Quando ocorre                |
| ----------- | ---------------------------- |
| `mouseover` | Mouse passa sobre elemento   |
| `mouseout`  | Mouse sai do elemento        |
| `input`     | Enquanto digita (tempo real) |
| `focus`     | Campo recebe foco            |
| `blur`      | Campo perde foco             |

---

## 4. O Objeto Evento

Quando um evento ocorre, o navegador cria um **objeto evento** com informações:

```js
elemento.addEventListener("click", (event) => {
  console.log(event);
});
```

Propriedades úteis:

```js
event.target; // Elemento que disparou o evento
event.key; // Qual tecla foi pressionada (em keydown)
event.preventDefault(); // Impede ação padrão (ex: submit)
event.type; // Tipo de evento ("click", "change", etc)
```

---

### Exemplo Prático

```js
const input = document.querySelector("input");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("Usuário pressionou Enter!");
  }
});
```

---

## 5. Manipulação de Formulários

Trabalhar com formulários é muito comum em JS.

HTML:

```html
<form id="meu-form">
  <input type="text" id="nome" placeholder="Digite seu nome" />
  <input type="email" id="email" placeholder="Email" />
  <button type="submit">Enviar</button>
</form>
```

### Capturando Valores

```js
const nomeInput = document.querySelector("#nome");
console.log(nomeInput.value); // Pega o valor digitado
```

---

### Validando Formulário

```js
const form = document.querySelector("#meu-form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Para envio padrão

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;

  if (nome === "" || email === "") {
    console.log("Campos obrigatórios!");
    return;
  }

  console.log("Formulário válido:", { nome, email });
});
```

---

## 6. Manipulação de Estilos (style)

De forma direta, podemos alterar estilos de um elemento:

```js
const elemento = document.querySelector("h1");

// Alterar cor
elemento.style.color = "red";

// Alterar tamanho
elemento.style.fontSize = "32px";

// Alterar fundo
elemento.style.backgroundColor = "yellow";

// Propriedades CSS com hífen viram camelCase
// background-color vira backgroundColor
// text-align vira textAlign
```

---

**Cuidado:** Alterar estilos diretamente mistura CSS com JS. Funciona bem em casos rápidos!

---

## 7. Manipulação de Classes com classList

A forma **recomendada** de alterar aparência é usar **classes CSS**.

HTML + CSS:

```html
<div id="caixa" class="caixa"></div>

<style>
  .caixa {
    width: 100px;
    background: blue;
  }
  .ativo {
    background: green;
  }
  .erro {
    background: red;
  }
</style>
```

---

### Métodos de classList

```js
const caixa = document.querySelector("#caixa");

// Adicionar classe
caixa.classList.add("ativo");

// Remover classe
caixa.classList.remove("ativo");

// Alternar classe (toggle)
caixa.classList.toggle("ativo"); // Se tem, remove. Se não tem, adiciona

// Verificar se tem classe
if (caixa.classList.contains("ativo")) {
  console.log("Tem classe ativo");
}
```

**Nota:** Prefira `.classList` quando possível. Deixa CSS no CSS e JS no JS!

---

## 8. Criando Elementos Dinamicamente

Há duas formas principais de criar elementos:

### Forma 1: innerHTML (mais simples, menos segura)

```js
const container = document.querySelector("#container");

container.innerHTML += "<p>Novo parágrafo</p>";
```

**Problema:** Pode ser lento com muitos elementos e tem risco de segurança.

---

### Forma 2: createElement (recomendada)

```js
const container = document.querySelector("#container");

// Criar elemento
const novoParagrafo = document.createElement("p");

// Adicionar conteúdo
novoParagrafo.innerText = "Novo parágrafo";

// Adicionar à página
container.appendChild(novoParagrafo);
```

---

### Comparação

| Aspecto               | innerHTML                  | createElement        |
| --------------------- | -------------------------- | -------------------- |
| **Facilidade**        | Muito fácil                | Um pouco mais código |
| **Performance**       | Mais lenta (grande volume) | Mais rápida          |
| **Segurança**         | Risco (injeção de código)  | Segura               |
| **Conteúdo Complexo** | Prática                    | Trabalhoso           |
| **Uso Recomendado**   | Prototipagem               | Produção             |

---

### Exemplo Completo com createElement

```js
const lista = document.querySelector("ul");

// Criar item
const novoItem = document.createElement("li");
novoItem.innerText = "Novo item";
novoItem.classList.add("item");

// Adicionar à lista
lista.appendChild(novoItem);
```

---

## Exercicio 1: Contador Interativo

**O Cenário:** Criar um contador que aumenta/diminui com botões.

HTML:

```html
<div id="contador-app">
  <h2 id="contador">0</h2>
  <button id="btn-mais">+</button>
  <button id="btn-menos">-</button>
  <button id="btn-reset">Reset</button>
</div>
```

---

**Missões:**

1. Criar uma variável `contador` com valor 0
2. Quando clica em "+", aumenta contador e atualiza o texto do `<h2>`
3. Quando clica em "-", diminui contador e atualiza o texto
4. Quando clica em "Reset", volta para 0
5. **Bônus:** Se contador negativo, a cor fica vermelha. Se positivo, verde. Se zero, preto.

---

## Exercício 2: Validação de Formulário

**O Cenário:** Validar um formulário de cadastro.

HTML:

```html
<form id="cadastro">
  <input type="text" id="usuario" placeholder="Usuário" required />
  <input type="password" id="senha" placeholder="Senha" required />
  <input type="email" id="email" placeholder="Email" required />
  <button type="submit">Cadastrar</button>
</form>

<div id="mensagem"></div>
```

---

**Missões:**

1. Quando tenta enviar, validar se os campos estão preenchidos
2. Verificar se email contém `@`
3. Verificar se senha tem no mínimo 6 caracteres
4. Se válido, mostrar "Cadastro realizado!" em verde
5. Se inválido, mostrar a razão do erro em vermelho
6. **Bônus:** Limpar campos após cadastro bem-sucedido

---

## Exercício 3: Lista Dinâmica

**O Cenário:** Criar uma lista de tarefas onde o usuário adiciona/remove itens.

HTML:

```html
<div id="app-tarefas">
  <input type="text" id="nova-tarefa" placeholder="Nova tarefa" />
  <button id="btn-adicionar">Adicionar</button>
  <ul id="lista-tarefas"></ul>
</div>

<style>
  .tarefa {
    padding: 10px;
    background: #eee;
    margin: 5px 0;
  }
  .concluida {
    text-decoration: line-through;
    color: #999;
  }
</style>
```

---

**Missões:**

1. Quando clica "Adicionar", criar novo `<li>` with a tarefa
2. Usar `createElement` (não innerHTML)
3. Cada tarefa tem um botão "Remover"
4. Ao clicar na tarefa, marcar como concluída (classe `concluida`)
5. **Bônus:** Salvar tarefas em formato "✓ Tarefa" e "○ Tarefa"

---

## Exercício 4: Galeria com Filtro

**O Cenário:** Criar galeria de imagens com filtro por categoria.

HTML:

```html
<div id="galeria">
  <div>
    <button class="filtro" data-categoria="todos">Todos</button>
    <button class="filtro" data-categoria="gatos">Gatos</button>
    <button class="filtro" data-categoria="cachorro">Cachorros</button>
  </div>

  <div id="imagens"></div>
</div>
```

---

**Dados Mock:**

```js
const fotos = [
  { id: 1, categoria: "gatos", nome: "Miau" },
  { id: 2, categoria: "cachorro", nome: "Rex" },
  { id: 3, categoria: "gatos", nome: "Feliz" },
  { id: 4, categoria: "cachorro", nome: "Dino" },
];
```

---

**Missões:**

1. Criar função que renderiza fotos dinamicamente
2. Ao clicar em filtro, mostrar apenas fotos daquela categoria
3. Ao clicar "Todos", mostrar todas as fotos
4. Usar `data-categoria` para identificar qual filtro foi clicado
5. **Bônus:** Adicionar classe "ativo" no botão do filtro atual

---

## Desafio Final: App de Gerenciamento de Produtos

**O Cenário:** Você é contratado para criar um painel de produtos onde o gerente pode adicionar, remover e marcar como "destaque".

---

**Requisitos:**

1. **Formulário de Adicionar:**
   - Nome do produto
   - Preço
   - Categoria (select com opções: Eletrônicos, Alimentos, Roupas)

2. **Lista de Produtos:**
   - Exibir todos os produtos adicionados
   - Mostrar nome, preço e categoria
   - Cada produto tem botões: "Destaque", "Remover"

---

3. **Filtro por Categoria:**
   - Botões para filtrar por categoria
   - Mostrar contagem de itens por categoria

4. **Manipulação Dinâmica:**
   - Produtos destacados aparecem com fundo amarelo
   - Remover produto remove da lista
   - Validar campos antes de adicionar

5. **Desafio Extra:**
   - Calcular e exibir preço total
   - Salvar lista no localStorage (se souber)
   - Categorias aparecem automaticamente (sem hardcode)

---

**Estrutura sugerida:**

```html
<div id="app">
  <h1>Gerenciador de Produtos</h1>

  <form id="form-produto">
    <input type="text" id="nome" placeholder="Nome do produto" />
    <input type="number" id="preco" placeholder="Preço" />
    <select id="categoria">
      <option value="">Escolha categoria</option>
      <option value="Eletrônicos">Eletrônicos</option>
      <option value="Alimentos">Alimentos</option>
      <option value="Roupas">Roupas</option>
    </select>
    <button type="submit">Adicionar Produto</button>
  </form>

  <div id="filtros"></div>

  <ul id="lista-produtos"></ul>

  <div id="total">Total: R$ 0</div>
</div>
```

---

**Objetivos de Aprendizado:**

✓ Manipular múltiplos eventos
✓ Trabalhar com formulários complexos
✓ Criar e remover elementos dinamicamente
✓ Manipular classes e estilos
✓ Usar `dataset` (data attributes)
✓ Organizar código em funções reutilizáveis
✓ Pensar em fluxo de dados

---

# Aula 3 - Persistência de Dados no Navegador

## Revisão da Aula 2

| Tópico           | O que vimos                                   |
| ---------------- | --------------------------------------------- |
| Eventos          | `addEventListener`, `onclick`, objeto `event` |
| Formulários      | `.value`, `submit`, `event.preventDefault()`  |
| Estilos          | `.style.propriedade`, `.classList`            |
| Criação dinâmica | `createElement`, `appendChild`, `innerHTML`   |

**Problema herdado das aulas anteriores:**

Toda vez que a página é recarregada, os dados dos exemplos (contador, lista de tarefas, produtos) somem. Como resolver isso?

---

## 1. O Problema: dados que somem

Variáveis JavaScript vivem na **memória do navegador**:

```js
let tarefas;

// Métodos e código implementados

tarefas = ["Estudar", "Treinar", "Cozinhar"];
```

Ao fechar ou recarregar a aba:

```
tarefas → undefined (a memória foi liberada)
```

Para dados que **sobrevivem ao recarregamento**, precisamos de um mecanismo de persistência.

---

## 2. Onde persistir dados no Frontend?

| Mecanismo              | Onde fica     | Dura até                |
| ---------------------- | ------------- | ----------------------- |
| **Variável JS**        | Memória RAM   | Aba fechar / recarregar |
| **sessionStorage**     | Navegador     | Aba fechar              |
| **localStorage**       | Navegador     | Usuário apagar / limpar |
| **Arquivo / Servidor** | Disco / Banco | Decisão do servidor     |

Nesta aula, foco em `localStorage` e `sessionStorage`.

---

## 3. JSON: o formato que conecta tudo

Antes de falar de Storage, precisamos entender **JSON**.

**JSON** = JavaScript Object Notation. Um formato textual para representar dados.

```json
{
  "nome": "Café",
  "preco": 12.9,
  "urgente": true
}
```

Storage **só aceita texto**. JSON é a forma de transformar objetos/arrays em texto e vice-versa.

---

### JSON.stringify — objeto → texto

```js
const produto = { nome: "Café", preco: 12.9 };

const texto = JSON.stringify(produto);
console.log(texto);
// '{"nome":"Café","preco":12.9}'

console.log(typeof texto); // "string"
```

---

### JSON.parse — texto → objeto

```js
const texto = '{"nome":"Café","preco":12.9}';

const produto = JSON.parse(texto);
console.log(produto.nome); // "Café"
console.log(produto.preco); // 12.9

console.log(typeof produto); // "object"
```

---

### Arrays também funcionam

```js
const lista = ["Leite", "Pão", "Café"];

const texto = JSON.stringify(lista);
// '["Leite","Pão","Café"]'

const recuperada = JSON.parse(texto);
// ["Leite", "Pão", "Café"]
```

---

## 4. localStorage

Armazenamento **persistente** no navegador. Os dados ficam salvos mesmo após fechar a aba ou o navegador.

```js
// Salvar
localStorage.setItem("chave", "valor");

// Ler
const valor = localStorage.getItem("chave");

// Remover uma chave
localStorage.removeItem("chave");

// Apagar tudo
localStorage.clear();
```

---

### Salvando um objeto

```js
const usuario = { nome: "Ana", pontuacao: 200 };

// Salvar
localStorage.setItem("usuario", JSON.stringify(usuario));

// Ler
const dados = localStorage.getItem("usuario");
const usuarioSalvo = JSON.parse(dados);

console.log(usuarioSalvo.nome); // "Ana"
```

---

### Cuidado: getItem pode retornar null

```js
const dados = localStorage.getItem("usuario");

if (dados !== null) {
  const usuario = JSON.parse(dados);
  console.log(usuario);
} else {
  console.log("Nenhum dado salvo ainda.");
}
```

---

### Padrão com operador `||`

Uma forma curta e segura de definir um valor padrão:

```js
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
```

Se não houver nada salvo, `getItem` retorna `null`, `JSON.parse(null)` retorna `null`, e `|| []` garante a lista vazia como fallback.

---

## 5. sessionStorage

API **idêntica** ao `localStorage`, com uma diferença fundamental:

```js
// Salvar
sessionStorage.setItem("chave", "valor");

// Ler
sessionStorage.getItem("chave");

// Remover
sessionStorage.removeItem("chave");
```

Os dados são **apagados quando a janela é fechada**. Não persistem entre sessões.

---

### Quando usar sessionStorage?

- Dados de uma sessão de navegação (ex: carrinho temporário)
- Wizard / formulário multi-etapas (descarta ao sair)
- Estado temporário que não deve vazar entre sessões

### Quando usar localStorage?

- Preferências do usuário (tema escuro, idioma)
- Listas persistentes (tarefas, favoritos)
- Cache local de dados

---

### Comparação Final

|                            | Variável JS    | sessionStorage                  | localStorage      |
| -------------------------- | -------------- | ------------------------------- | ----------------- |
| **Duração**                | Até recarregar | Até fechar instância do browser | Indefinida        |
| **Capacidade**             | RAM            | ~5 MB                           | ~5–10 MB          |
| **API**                    | —              | `setItem/getItem`               | `setItem/getItem` |
| **Compartilha entre abas** | Não            | Não                             | Sim               |
| **Tipo de dado**           | Qualquer       | Apenas string                   | Apenas string     |

---

## 6. Estudo de Caso: Persistindo os exemplos anteriores

### 6.1 Contador (Aula 2 — Exercício 1)

Antes (sem persistência):

```js
let contador = 0;
```

---

**Com localStorage:**

```js
// Carregar valor salvo (ou 0 se não existir)
let contador = Number(localStorage.getItem("contador")) || 0;

// Atualizar display ao carregar página
document.querySelector("#contador").innerText = contador;

// Função para atualizar e salvar
function atualizarContador(novoValor) {
  contador = novoValor;
  document.querySelector("#contador").innerText = contador;
  localStorage.setItem("contador", contador);
}

document.querySelector("#btn-mais").addEventListener("click", () => {
  atualizarContador(contador + 1);
});

document.querySelector("#btn-menos").addEventListener("click", () => {
  atualizarContador(contador - 1);
});

document.querySelector("#btn-reset").addEventListener("click", () => {
  atualizarContador(0);
});
```

---

### 6.2 Lista de Tarefas (Aula 2 — Exercício 3)

**Salvar a lista ao adicionar/remover:**

```js
// Carregar tarefas salvas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Renderizar tarefas existentes ao abrir a página
tarefas.forEach((tarefa) => renderizarTarefa(tarefa));

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefa(texto) {
  const lista = document.querySelector("#lista-tarefas");
  const item = document.createElement("li");
  item.innerText = texto;
  item.classList.add("tarefa");

  item.addEventListener("click", () => item.classList.toggle("concluida"));

  const btnRemover = document.createElement("button");
  btnRemover.innerText = "Remover";
  btnRemover.addEventListener("click", () => {
    tarefas = tarefas.filter((t) => t !== texto);
    salvarTarefas();
    item.remove();
  });

  item.appendChild(btnRemover);
  lista.appendChild(item);
}
```

---

```js
// Adicionar nova tarefa
document.querySelector("#btn-adicionar").addEventListener("click", () => {
  const input = document.querySelector("#nova-tarefa");
  const texto = input.value.trim();

  if (texto === "") return;

  tarefas.push(texto);
  salvarTarefas();
  renderizarTarefa(texto);
  input.value = "";
});
```

---

## Exercício de Fixação: Lista de Compras Persistente

**O Cenário:** Criar uma lista de compras que sobrevive ao recarregar a página.

HTML Base:

```html
<div id="app-compras">
  <h1>Lista de Compras</h1>
  <input type="text" id="novo-item" placeholder="Adicionar item..." />
  <button id="btn-add">Adicionar</button>
  <ul id="lista"></ul>
  <button id="btn-limpar">Limpar Lista</button>
</div>
```

---

**Missões:**

1. Ao adicionar um item, salvar a lista no `localStorage`
2. Ao abrir/recarregar a página, carregar e renderizar os itens salvos
3. Ao clicar no item, marcar como "comprado" (classe `comprado` com risco no texto)
4. O estado "comprado" também deve ser persistido
5. O botão "Limpar Lista" remove todos os itens e apaga o localStorage

**Bônus:**

- Usar `sessionStorage` em vez de `localStorage` — o que muda no comportamento?
- Impedir adicionar item duplicado

---

**Estrutura de dados sugerida:**

```js
// Em vez de array de strings, usar array de objetos
let itens = [
  { nome: "Leite", comprado: false },
  { nome: "Pão", comprado: true },
];
```

Isso permite salvar tanto o nome quanto o estado de cada item.

---

## Desafio: Evoluindo o App de Gerenciamento de Produtos

O App da Aula 2 já funciona, mas perde todos os dados ao recarregar. Vamos evoluí-lo com **persistência em localStorage**.

---

### O que muda na lógica

1. **Ao iniciar:** carregar produtos do localStorage
2. **Ao adicionar:** salvar lista atualizada no localStorage
3. **Ao remover:** salvar lista atualizada no localStorage
4. **Ao destacar:** salvar estado atualizado no localStorage

---

### Estrutura de dados

```js
// Array de objetos persistido no localStorage
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Exemplo de produto:
// { id: 1, nome: "Notebook", preco: 3500, categoria: "Eletrônicos", destaque: false }
```

---

### Função central de persistência

```js
function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}
```

Chame `salvarProdutos()` sempre que a lista mudar.

---

### Inicialização da página

```js
// Ao carregar a página, renderizar produtos salvos
document.addEventListener("DOMContentLoaded", () => {
  produtos.forEach((produto) => renderizarProduto(produto));
  atualizarTotal();
  renderizarFiltros();
});
```

---

### Adicionar produto

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const preco = parseFloat(document.querySelector("#preco").value);
  const categoria = document.querySelector("#categoria").value;

  if (!nome || isNaN(preco) || !categoria) return;

  const novoProduto = {
    id: Date.now(), // ID único baseado em timestamp
    nome,
    preco,
    categoria,
    destaque: false,
  };

  produtos.push(novoProduto);
  salvarProdutos();
  renderizarProduto(novoProduto);
  atualizarTotal();
  form.reset();
});
```

---

### Remover produto

```js
function removerProduto(id) {
  produtos = produtos.filter((p) => p.id !== id);
  salvarProdutos();
  atualizarTotal();
}
```

---

### Destacar produto

```js
function toggleDestaque(id) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;

  produto.destaque = !produto.destaque;
  salvarProdutos();
}
```

---

### Missões

1. Integrar `salvarProdutos()` em todas as operações
2. Carregar produtos salvos ao iniciar a página com `DOMContentLoaded`
3. Garantir que o `id` de cada produto é único (`Date.now()` funciona)
4. Recarregar a página e confirmar que os produtos persistiram
5. **Bônus:** Adicionar botão "Limpar Tudo" que apaga o localStorage e a lista

---

**Objetivos de Aprendizado:**

✓ Entender por que dados somem sem persistência
✓ Serializar objetos com `JSON.stringify` e `JSON.parse`
✓ Usar `localStorage` para ler, salvar e remover dados
✓ Diferenciar `localStorage` de `sessionStorage`
✓ Aplicar persistência em uma aplicação real e complexa
✓ Usar IDs únicos para referenciar itens em listas

---

# Aula 4 - Fetch com Promises e Async/Await

## Revisão da Aula 3

Na aula anterior, persistimos dados no navegador com `localStorage` e `sessionStorage`.

Agora vamos mover esses dados para uma **API usando `json-server`**.

Nesta aula, você verá as **duas formas de consumir APIs**: com **Promises** (`.then/.catch`) e depois refatorando para **Async/Await**.

**Por quê?** Porque entender Promises é fundamental para dominar JavaScript assíncrono.

---

## 1. Por que integrar com API?

Com API, os dados deixam de ficar presos só ao navegador.

- Melhor aproximação de ambiente real
- Dados centralizados em um serviço
- Frontend separado da camada de dados
- Base para aplicações colaborativas

---

## 2. JSON Server: backend fake para desenvolvimento

`json-server` cria uma API REST completa a partir de um arquivo JSON, sem precisar criar um servidor real.

### Instalação

```bash
npm install -g json-server
```

---

### Pré-requisito: Node.js instalado

Verifique com:

```bash
node -v
npm -v
```

Se não tiver, baixe em: [nodejs.org](https://nodejs.org)

---

### Criar o arquivo `db.json`

Na pasta do projeto:

```json
{
  "produtos": [
    {
      "id": 1,
      "nome": "Notebook",
      "preco": 3500,
      "categoria": "Eletrônicos",
      "destaque": false
    },
    {
      "id": 2,
      "nome": "Arroz",
      "preco": 30,
      "categoria": "Alimentos",
      "destaque": true
    }
  ]
}
```

---

### Rodando o servidor

```bash
npx json-server db.json --port 3000
```

Saída esperada:

```
JSON Server started on PORT :3000

Endpoints:
http://localhost:3000/produtos
```

---

### Endpoints gerados automaticamente

| Método   | Endpoint        | Ação                   |
| -------- | --------------- | ---------------------- |
| `GET`    | `/produtos`     | Listar todos           |
| `GET`    | `/produtos/:id` | Buscar por ID          |
| `POST`   | `/produtos`     | Criar                  |
| `PATCH`  | `/produtos/:id` | Atualizar parcialmente |
| `DELETE` | `/produtos/:id` | Remover                |

---

## 3. O que é o `fetch`?

`fetch` é a API nativa do navegador para fazer requisições HTTP.

**Retorna uma Promise**, o que significa que o resultado não vem imediatamente.

```js
const promessa = fetch("http://localhost:3000/produtos");
console.log(promessa); // Promise { <pending> }
```

Podemos lidar com Promises de **duas formas**:

1. **`.then/.catch`** (Promises clássicas)
2. **`async/await`** (sintaxe moderna sobre Promises)

Vamos ver as duas.

---

## 4. Parte 1: CRUD com `fetch` e Promises (`.then/.catch`)

### GET — Listar produtos

```js
function buscarProdutos() {
  return fetch("http://localhost:3000/produtos").then((resposta) =>
    resposta.json(),
  );
}

// Uso:
buscarProdutos()
  .then((produtos) => {
    console.log("Produtos carregados:", produtos);
  })
  .catch((erro) => {
    console.error("Erro ao buscar:", erro);
  });
```

---

### POST — Criar produto

```js
function criarProduto(produto) {
  return fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  }).then((resposta) => resposta.json());
}

// Uso:
criarProduto({ nome: "Notebook", preco: 3500, categoria: "Eletrônicos" })
  .then((novoProduto) => {
    console.log("Produto criado:", novoProduto);
  })
  .catch((erro) => {
    console.error("Erro ao criar:", erro);
  });
```

---

### PATCH — Atualizar parcialmente

```js
function atualizarProduto(id, dados) {
  return fetch(`http://localhost:3000/produtos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  }).then((resposta) => resposta.json());
}
```

---

### DELETE — Remover produto

```js
function removerProduto(id) {
  return fetch(`http://localhost:3000/produtos/${id}`, {
    method: "DELETE",
  }).then((resposta) => resposta.ok);
}
```

---

### Fluxo com Promises: encadeamento de operações

Um exemplo prático: **criar um produto e depois recarregar a lista**

```js
criarProduto({ nome: "Teclado", preco: 150, categoria: "Eletrônicos" })
  .then(() => {
    console.log("Produto criado com sucesso!");
    return buscarProdutos(); // Encadeia a próxima operação
  })
  .then((listaAtualizada) => {
    console.log("Lista recarregada:", listaAtualizada);
    renderizarProdutos(listaAtualizada);
  })
  .catch((erro) => {
    console.error("Erro na operação:", erro);
  });
```

**Vantagem do `.catch` no final:** captura erros de **toda a cadeia**.

---

## 5. Parte 2: Refatoração para Async/Await

### GET — Listar produtos (com async/await)

```js
async function buscarProdutos() {
  const resposta = await fetch("http://localhost:3000/produtos");
  return await resposta.json();
}

// Uso:
try {
  const produtos = await buscarProdutos();
  console.log("Produtos carregados:", produtos);
} catch (erro) {
  console.error("Erro ao buscar:", erro);
}
```

---

### POST — Criar produto (com async/await)

```js
async function criarProduto(produto) {
  const resposta = await fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return await resposta.json();
}

// Uso:
try {
  const novoProduto = await criarProduto({
    nome: "Mouse",
    preco: 80,
    categoria: "Eletrônicos",
  });
  console.log("Produto criado:", novoProduto);
} catch (erro) {
  console.error("Erro ao criar:", erro);
}
```

---

### PATCH — Atualizar parcialmente (com async/await)

```js
async function atualizarProduto(id, dados) {
  const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return await resposta.json();
}
```

---

### DELETE — Remover produto (com async/await)

```js
async function removerProduto(id) {
  await fetch(`http://localhost:3000/produtos/${id}`, {
    method: "DELETE",
  });
}
```

---

### Fluxo com Async/Await: código sequencial e legível

O **mesmo exemplo anterior**, agora com `async/await`:

---

```js
async function criarERecarregar() {
  try {
    await criarProduto({
      nome: "Monitor",
      preco: 800,
      categoria: "Eletrônicos",
    });
    console.log("Produto criado com sucesso!");

    const listaAtualizada = await buscarProdutos();
    console.log("Lista recarregada:", listaAtualizada);
    renderizarProdutos(listaAtualizada);
  } catch (erro) {
    console.error("Erro na operação:", erro);
  }
}

// Executar
await criarERecarregar();
```

**Vantagem:** o código **parece síncrono** (mais fácil de ler), mas funciona de forma assíncrona.

---

## 6. Comparação: Promises vs Async/Await

| Aspecto          | Promises (`.then/.catch`) | Async/Await           |
| ---------------- | ------------------------- | --------------------- |
| **Legibilidade** | Encadeamento (mental)     | Sequencial (clara)    |
| **Erro**         | `.catch` no final         | `try/catch` explícito |
| **Debugging**    | Mais complexo             | Stack trace claro     |
| **Browser**      | Compatível (ES6)          | Moderno (ES8)         |
| **Performance**  | Idêntica                  | Idêntica              |

**Resumo:** Ambas são idênticas por baixo (async/await é apenas sintaxe sobre Promises), mas `async/await` é mais legível.

---

## 7. Tratamento de erro e loading

Sempre trate falhas de rede e dê feedback visual:

```js
async function carregarTela() {
  try {
    mostrarLoading(true);
    const produtos = await buscarProdutos();
    renderizarProdutos(produtos);
    atualizarTotal(produtos);
  } catch (erro) {
    mostrarErro("Não foi possível carregar os produtos.");
  } finally {
    mostrarLoading(false);
  }
}
```

---

## 6. Estudo de Caso: migrando o App de Produtos (Aula 3)

O app da Aula 3 usava `localStorage`. Agora vamos trocar por API.

```js
// Antes (localStorage)
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Agora (API)
const produtos = await buscarProdutos();
```

---

### Inicialização com `DOMContentLoaded`

```js
document.addEventListener("DOMContentLoaded", async () => {
  const produtos = await buscarProdutos();
  renderizarProdutos(produtos);
  atualizarTotal(produtos);
});
```

---

### Fluxo de cada ação

```txt
Evento (ex: submit)
  → fetch à API
  → rebuscar lista atualizada
  → rerenderizar DOM
```

---

## Prática: Atividade de Fixação 4 (escopo fechado)

### Lista de Itens com API

**Objetivo:** Implementar o CRUD de itens primeiro com Promises, depois refatorar para async/await.

**Fase 1: Com Promises (`.then/.catch`)**

---

**Missões:**

1. Criar `db.json` com coleção `itens`
2. Implementar `listarItens()` com Promises
3. Implementar `adicionarItem()` com Promises
4. Implementar `marcarConcluido()` e `removerItem()` com Promises
5. Encadear operações: criar item → recarregar lista → renderizar
6. Usar `.catch` para exibir erro se servidor fora do ar

---

**Fase 2: Refatoração para Async/Await**

**Missões:**

1. Converter todas as funções para `async`
2. Substituir `.then` por `await`
3. Usar `try/catch` em vez de `.catch`
4. Confirmar que o funcionamento é idêntico

---

**Bônus:**

- Campo de busca por nome (filtrar no frontend)
- Exibir contador de itens pendentes
- Usar `finally` para garantir que loading sempre desaparece

---

## Desafio: CRUD de Produtos com API (Promises → Async/Await)

**Objetivo:** Implementar o app de produtos completo, passando por ambas as abordagens.

**Etapa 1: Com Promises**

1. Implementar CRUD com `.then/.catch`
2. Encadear operações corretamente
3. Testar todas as funcionalidades

**Etapa 2: Refatoração com Async/Await**

1. Converter para `async/await`
2. Usar `try/catch/finally`
3. Garantir que funciona igual

---

**Funcionalidades:**

1. Substituir `localStorage` por chamadas à API
2. Carregar lista ao iniciar com `DOMContentLoaded`
3. Criar, destacar e remover produtos via `fetch`
4. Filtros por categoria reaproveitando lógica existente
5. Calcular total com dados vindos da API

---

**Critérios de conclusão:**

- Recarregar a página mantém os dados (vêm da API)
- Nenhuma operação depende de `localStorage`
- Tratamento completo de erros em todas as operações
- Comparação entre Promises e Async/Await funciona identicamente

---

**Objetivos de Aprendizado:**

✓ Configurar e usar `json-server` do zero
✓ Entender endpoints REST e métodos HTTP
✓ Consumir API com `fetch` e Promises (`.then/.catch`)
✓ Consumir API com `fetch` e Async/Await
✓ Fazer CRUD completo: GET, POST, PATCH, DELETE
✓ Aplicar tratamento de erro e loading
✓ Migrar app existente de `localStorage` para API
✓ **Entender a equivalência entre Promises e Async/Await**

---

# Aula 5 - Assincronismo em Profundidade

## Revisão da Aula 4

Na aula anterior, vimos como consumir APIs com **Promises** (`.then/.catch`) e **Async/Await**, vendo que ambas são equivalentes.

Agora vamos **aprofundar nos conceitos**, entendendo como o JavaScript funciona por baixo, história dos callbacks, e padrões avançados com Promises.

---

## 1. Como o JavaScript executa código assíncrono?

JavaScript é single-thread: executa uma coisa de cada vez.

Para operações demoradas (rede, timers), ele usa um modelo de **fila de callbacks**, evitando travar a execução.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Saída: 1 → 3 → 2
```

---

## 2. Call Stack, Event Loop, e Web APIs

Entender **como** o JavaScript executa assincronismo é fundamental:

---

```txt
┌─────────────────┐
│  Call Stack     │  (executa código síncrono)
│  ┌───────────┐  │
│  │ função A  │  │
│  └───────────┘  │
└─────────────────┘
        ↑
        │ (envia operações por muito tempo)
        ↓
┌─────────────────┐
│  Web APIs       │  (fetch, setTimeout, etc)
│  (navegador)    │
└─────────────────┘
        ↑
        │ (coloca resultado quando pronto)
        ↓
┌─────────────────┐
│  Callback Queue │  (espera até Call Stack vazio)
│  (Promises)     │
└─────────────────┘
        ↑
        │ (Event Loop move para Stack)
        ↓
┌─────────────────┐
│  Event Loop     │  (monitora: Stack vazio?)
│                 │  Se sim → move callback para Stack
└─────────────────┘
```

---

## 3. Estados de uma Promise

Quando você cria uma Promise, ela começa em um estado e pode transicionar:

```txt
Pending (aguardando)
    ↓
    ├─→ Fulfilled (resolvida com sucesso)
    │   • Chama .then()
    │
    └─→ Rejected (rejeitada com erro)
        • Chama .catch()
```

---

**Exemplo visual:**

```js
const promessa = fetch("http://localhost:3000/produtos");

console.log(promessa); // Promise { <pending> }

// Após alguns ms...
// Promise { <fulfilled>: Response }
// OU
// Promise { <rejected>: Error }
```

---

## 4. Métodos de Promise: `.then()`, `.catch()`, `.finally()`

### `.then(onFulfilled)`

Executa quando a Promise é **resolvida com sucesso**:

```js
fetch("http://localhost:3000/produtos").then((resposta) => {
  console.log("Sucesso:", resposta);
  return resposta.json();
});
```

---

### `.catch(onRejected)`

Executa quando a Promise é **rejeitada** (erro):

```js
fetch("http://localhost:3000/produtos")
  .then((resposta) => resposta.json())
  .catch((erro) => {
    console.error("Erro:", erro.message);
  });
```

**Importante:** `.catch` captura erros de **toda a cadeia previous**, não só do último `.then`.

---

### `.finally(onFinally)`

Executa **independentemente** de sucesso ou erro:

```js
fetch("http://localhost:3000/produtos")
  .then((resposta) => resposta.json())
  .catch((erro) => console.error("Erro:", erro))
  .finally(() => {
    console.log("Operação finalizada (com ou sem erro)");
  });
```

---

## 5. Encadeamento de Promises: `.then()` retorna Promise

Cada `.then()` retorna uma **nova Promise**, permitindo encadear:

```js
fetch("http://localhost:3000/produtos/1")
  .then((resposta) => resposta.json()) // Promise 1
  .then((produto) => {
    // Promise 2
    console.log("Produto:", produto.nome);
    return produto.preco * 2; // Retorna valor
  })
  .then((precoDoublado) => {
    // Promise 3
    console.log("Preço dobrado:", precoDoublado);
  })
  .catch((erro) => console.error("Erro:", erro)); // Captura todo erro
```

---

**Fluxo:**

1. Fetch retorna Promise
2. Primeiro `.then`: recebe Response, retorna Promise de `json()`
3. Segundo `.then`: recebe objeto, calcula, retorna número
4. Terceiro `.then`: recebe número, imprime
5. Se qualquer erro: `.catch` captura

---

## 6. Callback Hell vs Promise

Antes de Promises, a forma de lidar com assincronismo era passar callbacks como argumento.

Quando as etapas se encadeavam, o código virava uma pirâmide:

---

```js
buscarDados(
  function (dados) {
    processarDados(
      dados,
      function (resultado) {
        salvarResultado(
          resultado,
          function () {
            atualizarTela();
          },
          function (erroSalvar) {
            mostrarErro(erroSalvar);
          },
        );
      },
      function (erroProcessar) {
        mostrarErro(erroProcessar);
      },
    );
  },
  function (erroBusca) {
    mostrarErro(erroBusca);
  },
);
```

---

### Por que isso era um problema?

- Fluxo cresce em aninhamento (pirâmide da perdição)
- Erro tratado separadamente em cada nível
- Reuso e leitura prejudicados

Com Promise, o mesmo fluxo vira **encadeamento linear**:

```txt
callback -> callback -> callback  (vertical: cresce pra dentro)
promise  -> .then -> .then -> .catch  (horizontal: cresce pra baixo)
```

O `.catch` centraliza o tratamento de erros de toda a cadeia.

---

## 7. Padrões Avançados com Promises

### `Promise.all()`: Aguardar múltiplas Promises

Útil para operações paralelas:

---

```js
Promise.all([
  fetch("http://localhost:3000/produtos"),
  fetch("http://localhost:3000/categorias"),
  fetch("http://localhost:3000/vendas"),
])
  .then((respostas) => {
    // respostas é um array com as 3 respostas
    return Promise.all(respostas.map((r) => r.json()));
  })
  .then(([produtos, categorias, vendas]) => {
    console.log("Tudo carregado:", { produtos, categorias, vendas });
  })
  .catch((erro) => {
    // Se QUALQUER uma falhar, vai para catch
    console.error("Erro em alguma requisição:", erro);
  });
```

---

### Com Async/Await (mais legível):

```js
async function carregarTudo() {
  try {
    const [prodResp, catResp, vendResp] = await Promise.all([
      fetch("http://localhost:3000/produtos"),
      fetch("http://localhost:3000/categorias"),
      fetch("http://localhost:3000/vendas"),
    ]);

    const [produtos, categorias, vendas] = await Promise.all([
      prodResp.json(),
      catResp.json(),
      vendResp.json(),
    ]);

    console.log("Tudo carregado:", { produtos, categorias, vendas });
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

await carregarTudo();
```

---

### `Promise.race()`: Primeira Promise a resolver

Útil para timeouts:

```js
Promise.race([
  fetch("http://localhost:3000/produtos"),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), 5000),
  ),
])
  .then((resposta) => resposta.json())
  .catch((erro) => console.error("Erro ou timeout:", erro));
```

---

## 8. Referência Rápida: Quando Usar Promises vs Async/Await

| Situação                          | Recomendação                |
| --------------------------------- | --------------------------- |
| **Iniciante**                     | Comece com Promises         |
| **Encadeamento simples** (2-3)    | Promises OK                 |
| **Lógica complexa**               | Async/Await                 |
| **Múltiplas operações paralelas** | `Promise.all` + async/await |
| **Timeouts**                      | `Promise.race`              |
| **Novo código**                   | Async/Await                 |

---

## 9. Estudo de Caso: mesma aplicação, dois estilos

Usar a aplicação da Aula 4 (mesmo `db.json` e mesma interface) em **dois estilos**:

1. Versão com `fetch` + Promise (`.then/.catch`)
2. Mesma lógica, mas com `async/await`

---

## Prática: Atividade de Fixação 5

### Comparar Estilos: Promises vs Async/Await em Profundidade

**Objetivo:** Entender a **equivalência** entre Promises e Async/Await e aprender quando cada um é útil.

**Missão 1: Implementar com Promises puro**

Criar um app simples (lista de tarefas) usando **apenas Promises**:

---

```js
function listarTarefas() {
  return fetch("http://localhost:3000/tarefas").then((r) => r.json());
}

function criarTarefa(texto) {
  return fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, concluida: false }),
  })
    .then((r) => r.json())
    .then((novaTarefa) => {
      console.log("Tarefa criada:", novaTarefa);
      return listarTarefas(); // Recarregar lista
    });
}

// Uso
criarTarefa("Estudar Promises")
  .then((lista) => console.log("Lista atualizada:", lista))
  .catch((erro) => console.error("Erro:", erro));
```

---

**Missão 2: Implementar o mesmo com Async/Await**

Mesma lógica, novo estilo:

---

```js
async function listarTarefas() {
  const resposta = await fetch("http://localhost:3000/tarefas");
  return await resposta.json();
}

async function criarTarefa(texto) {
  const resposta = await fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, concluida: false }),
  });

  const novaTarefa = await resposta.json();
  console.log("Tarefa criada:", novaTarefa);

  const lista = await listarTarefas(); // Recarregar lista
  return lista;
}

// Uso
try {
  const lista = await criarTarefa("Estudar Async/Await");
  console.log("Lista atualizada:", lista);
} catch (erro) {
  console.error("Erro:", erro);
}
```

---

**Missão 3: Comparar os dois estilos**

1. Execute ambas as versões
2. Confirme que funcionam igual
3. Analise qual é mais fácil de ler
4. Reescreva ambas com `Promise.all` para carregar múltiplos dados

---

**Critérios de aceitação:**

- Ambas as versões funcionam identicamente
- Erros tratados corretamente em ambas
- Você consegue converter Promises ↔ Async/Await
- Entende que async/await é apenas sintaxe sobre Promises

---

## Desafio Final

**Objetivo:** Masterizar Promises e Async/Await com operações complexas.

### Versão 1: Com Promises Puro

---

```js
function inicializarApp() {
  mostrarLoading(true);

  return Promise.all([
    fetch("http://localhost:3000/produtos").then((r) => r.json()),
    fetch("http://localhost:3000/categorias").then((r) => r.json()),
    fetch("http://localhost:3000/vendas").then((r) => r.json()),
  ])
    .then(([produtos, categorias, vendas]) => {
      renderizarProdutos(produtos);
      renderizarCategorias(categorias);
      atualizarTotal(vendas);
    })
    .catch((erro) => {
      mostrarErro("Falha ao carregar dados");
    })
    .finally(() => {
      mostrarLoading(false);
    });
}
```

---

### Versão 2: Com Async/Await (recomendada)

```js
async function inicializarApp() {
  try {
    mostrarLoading(true);

    const [produtos, categorias, vendas] = await Promise.all([
      fetch("http://localhost:3000/produtos").then((r) => r.json()),
      fetch("http://localhost:3000/categorias").then((r) => r.json()),
      fetch("http://localhost:3000/vendas").then((r) => r.json()),
    ]);

    renderizarProdutos(produtos);
    renderizarCategorias(categorias);
    atualizarTotal(vendas);
  } catch (erro) {
    mostrarErro("Falha ao carregar dados");
  } finally {
    mostrarLoading(false);
  }
}

await inicializarApp();
```

---

**Missões:**

1. Implementar ambas as versões
2. Adicionar `loading` em todas as operações
3. Padronizar camada de API (`construirFetch` reutilizável)
4. Testar com múltiplos erros simultâneos
5. Comparar performance (dica: é idêntica)

---

**Objetivos de Aprendizado:**

✓ Entender o salto histórico: callbacks → Promises → async/await
✓ Dominar `.then()`, `.catch()`, `.finally()`
✓ Usar `Promise.all()` para operações paralelas
✓ Refatorar entre Promises e Async/Await com confiança
✓ Aplicar tratamento de erro consistente
✓ **Saber que Async/Await é apenas sintaxe sobre Promises** (por baixo, funcionam igual)

---

# FIM!
