Markdown# 📊 Painel PH Prime • Consulta Rápida

Um painel de visualização de dados desenvolvido especificamente para **TV de 32" (resolução 1280x720)**, projetado para otimizar o dia a dia da equipe da **PH Prime Promotora**. O sistema rotaciona automaticamente entre diferentes "cards" informativos contendo regras, limites operacionais, prazos e margens de segurança de vários bancos parceiros e órgãos governamentais.

---

## 🚀 Funcionalidades

- **Rotação Automática (Carrossel):** Os cartões informativos alternam automaticamente a cada 30 segundos.
- **Barra de Progresso Visual:** Uma linha de carregamento fluida no rodapé indica quanto tempo resta até a próxima transição.
- **Relógio em Tempo Real:** Exibição contínua do horário local atualizado segundo a segundo.
- **Controle Manual por Teclado:** Atalhos práticos para os operadores pausarem ou avançarem os cards sem esperar o temporizador:
  - `Seta para a Direita`: Pula imediatamente para o próximo card.
  - `Seta para a Esquerda`: Retorna para o card anterior e reinicia o cronômetro.
- **Design sob Medida (Pixel Perfect):** Totalmente estilizado para evitar barras de rolagem (`overflow: hidden`) em telas de monitor/TV HD.
- **Estrutura Isolada por Banco:** Layout personalizado com as cores institucionais de cada marca (Daycoval, BMG, Digio, Amigoz e Governo de SP).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando a stack padrão da web, sem dependências externas pesadas para garantir o máximo de performance e leveza:

- **HTML5:** Estruturação semântica das tabelas de limites e grids de informações.
- **CSS3:** Estilização moderna utilizando variáveis nativas (`:root`), Flexbox, CSS Grid para os layouts e fontes do Google Fonts (_Poppins_).
- **JavaScript (Vanilla JS):** Lógica de manipulação do DOM, controle do intervalo de tempo (`setInterval`), atualização do relógio e escuta de eventos do teclado.

---

## 📂 Estrutura de Arquivos

```text
├── index.html     # Estrutura principal e tabelas de dados de cada banco
├── style.css      # Variáveis de cores, resets e regras de layout para TV 32"
└── script.js      # Lógica do cronômetro, relógio e navegação por teclado
🖥️ Organização dos Painéis InternosAtualmente, o carrossel exibe as seguintes telas estratégicas de consulta rápida:DAYCOVAL: Limites operacionais por faixa etária até 80 anos, prazos máximos e política de idade x valor.BMG: Regras de prazos por CPF, limites financeiros agregados e valor mínimo de operação.DIGIO: Reduções progressivas de prazo a partir dos 70 anos e teto operacional.AMIGOZ: Fatores e limites mínimos/máximos voltados ao Cartão Benefício do Governo de Minas Gerais.GOVERNO DE SÃO PAULO: Idades limite operacionais detalhadas para 14 instituições financeiras e correspondentes (Banco Neo, Futuro Sênior, Dig Mais, Hope, etc).MARGEM DE SEGURANÇA (GOVSP): Matriz de tolerância de margem (regras em porcentagem ou descontos fixos como R$30 ou R$50) dividida por banco para SPPREV, SEFAZ e SEFAZ EDUC.🔧 Como Executar o ProjetoPor se tratar de uma aplicação front-end estática pura, não precisa de instalar nenhuma dependência ou servidor de banco de dados.Faça o download ou clone este repositório numa pasta local.Dê um duplo clique no arquivo index.html para abrir diretamente no seu navegador de preferência (Google Chrome, Microsoft Edge, etc.).Para uma melhor experiência na TV da promotora, pressione F11 no teclado para alternar o navegador para o modo Tela Cheia.


⚙️ Customização do Tempo
- Caso queira alterar o tempo que cada painel fica visível na tela, basta abrir o arquivo script.js e alterar o valor da constante TEMPO (definida em segundos):JavaScript// Exemplo: Mudar de 30 para 15 segundos
const TEMPO = 15;
```
