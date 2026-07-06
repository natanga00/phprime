/*=========================================================
    PH PRIME PROMOTORA
=========================================================*/

const cards = document.querySelectorAll(
  ".card, .card-condicoes-mg, .card-condicoes-sp, .card-novo-daycoval",
);

const hora = document.getElementById("hora");

const timer = document.getElementById("timer");

const barra = document.querySelector(".barra");

/*=========================================================
    CONFIGURAÇÃO
=========================================================*/

const TEMPO = 30; // 30 segundos

let restante = TEMPO;

let indice = 0;

/*=========================================================
    RELÓGIO
=========================================================*/

function atualizarHora() {
  const agora = new Date();

  hora.textContent = agora.toLocaleTimeString("pt-BR");
}

setInterval(atualizarHora, 1000);

atualizarHora();

/*=========================================================
    CONTADOR - INVISÍVEL
=========================================================*/

function atualizarTimer() {
  // Atualiza o texto do timer apenas se o elemento existir na tela
  if (timer) {
    const minutos = String(Math.floor(restante / 60)).padStart(2, "0");
    const segundos = String(restante % 60).padStart(2, "0");
    timer.textContent = `${minutos}:${segundos}`;
  }

  // A barra de progresso verde/azul no rodapé continua funcionando!
  const porcentagem = ((TEMPO - restante) / TEMPO) * 100;
  if (barra) {
    barra.style.width = porcentagem + "%";
  }

  restante--;

  if (restante < 0) {
    trocarCard();
    restante = TEMPO;
  }
}

setInterval(atualizarTimer, 1000);

atualizarTimer();

/*=========================================================
    TROCA DE CARD
=========================================================*/

function trocarCard() {
  cards[indice].classList.remove("ativo");

  indice++;

  if (indice >= cards.length) {
    indice = 0;
  }

  cards[indice].classList.add("ativo");
}

/*=========================================================
    ATALHOS DO TECLADO
=========================================================*/

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    restante = 0;
  }

  if (e.key === "ArrowLeft") {
    cards[indice].classList.remove("ativo");

    indice--;

    if (indice < 0) {
      indice = cards.length - 1;
    }

    cards[indice].classList.add("ativo");

    restante = TEMPO;
  }
});
