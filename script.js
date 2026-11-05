/* =========================================================
   PH PRIME PROMOTORA • CONTROLE DO PAINEL
   9 telas | rotação automática | teclado | escala responsiva
========================================================= */
(() => {
  "use strict";

  const DURACAO_SLIDE = 30; // segundos por tela
  const PALCO = { largura: 1280, altura: 720 };

  const cards = Array.from(document.querySelectorAll("main .card"));
  const relogio = document.getElementById("hora");
  const barra = document.getElementById("barraProgresso");
  const indicador = document.getElementById("slideAtual");

  if (!cards.length) {
    console.error("[PH Prime] Nenhum card foi encontrado.");
    return;
  }

  let indiceAtual = Math.max(
    0,
    cards.findIndex((card) => card.classList.contains("ativo")),
  );

  let decorrido = 0;
  let pausado = false;
  let ultimoFrame = performance.now();

  const total = cards.length;

  function formatarNumero(valor) {
    return String(valor).padStart(2, "0");
  }

  function atualizarRelogio() {
    if (!relogio) return;

    relogio.textContent = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  }

  function atualizarIndicadores() {
    if (indicador) {
      indicador.textContent = `${formatarNumero(indiceAtual + 1)} / ${formatarNumero(total)}`;
    }

    if (barra) {
      const percentual = Math.min(100, (decorrido / DURACAO_SLIDE) * 100);

      barra.style.width = `${percentual}%`;
    }
  }

  function mostrarCard(novoIndice) {
    indiceAtual = (novoIndice + total) % total;

    cards.forEach((card, indice) => {
      const ativo = indice === indiceAtual;

      card.classList.toggle("ativo", ativo);
      card.setAttribute("aria-hidden", String(!ativo));
    });

    decorrido = 0;
    atualizarIndicadores();
  }

  function proximoCard() {
    mostrarCard(indiceAtual + 1);
  }

  function cardAnterior() {
    mostrarCard(indiceAtual - 1);
  }

  function alternarPausa() {
    pausado = !pausado;
    document.body.classList.toggle("painel-pausado", pausado);
  }

  function ajustarEscala() {
    const escala = Math.min(
      window.innerWidth / PALCO.largura,
      window.innerHeight / PALCO.altura,
    );

    const x = (window.innerWidth - PALCO.largura * escala) / 2;
    const y = (window.innerHeight - PALCO.altura * escala) / 2;

    document.body.style.transform = `translate(${x}px, ${y}px) scale(${escala})`;
  }

  function telaCheia() {
    if (
      !document.fullscreenElement &&
      document.documentElement.requestFullscreen
    ) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      proximoCard();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      cardAnterior();
    } else if (event.code === "Space") {
      event.preventDefault();
      alternarPausa();
    } else if (event.key === "Home") {
      mostrarCard(0);
    } else if (event.key === "End") {
      mostrarCard(total - 1);
    } else if (event.key.toLowerCase() === "f") {
      telaCheia();
    }
  });

  // Relógio independente da rotação dos slides.
  atualizarRelogio();
  window.setInterval(atualizarRelogio, 1000);

  // Controle da rotação automática.
  function animar(agora) {
    const delta = Math.min((agora - ultimoFrame) / 1000, 0.25);

    ultimoFrame = agora;

    if (!pausado) {
      decorrido += delta;

      if (decorrido >= DURACAO_SLIDE) {
        proximoCard();
      } else {
        atualizarIndicadores();
      }
    }

    window.requestAnimationFrame(animar);
  }

  window.addEventListener("resize", ajustarEscala);

  document.addEventListener("visibilitychange", () => {
    ultimoFrame = performance.now();
  });

  mostrarCard(indiceAtual);
  ajustarEscala();

  window.requestAnimationFrame(animar);

  // Funções disponíveis para controle externo.
  window.PHPrimePainel = {
    proximo: proximoCard,
    anterior: cardAnterior,
    pausar: alternarPausa,
    irPara: mostrarCard,
  };
})();
