/*=========================================================
    PH PRIME PROMOTORA
=========================================================*/
const cards = document.querySelectorAll(
  ".card, .card-condicoes-mg, .card-condicoes-sp, .card-novo-daycoval, .card-ocred-master",
);
const hora = document.getElementById("hora");
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
    CONTADOR E BARRA DE PROGRESSO
=========================================================*/
function atualizarTimer() {
  if (barra) {
    const porcentagem = ((TEMPO - restante) / TEMPO) * 100;
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
  indice = (indice + 1) % cards.length;
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
    indice = (indice - 1 + cards.length) % cards.length;
    cards[indice].classList.add("ativo");
    restante = TEMPO;
  }
});
