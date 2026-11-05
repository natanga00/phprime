/* =========================================
   PH PRIME PROMOTORA
   PAINEL COMERCIAL SÃO PAULO

   7 TELAS:
   1 - SPPREV
   2 - PM SP
   3 - SEFAZ EDUCAÇÃO
   4 - SEFAZ TEMPORÁRIO
   5 - SEFAZ AGENTE E SAÚDE
   6 - CELETISTA
   7 - IDADES MÁXIMAS

   ROTAÇÃO AUTOMÁTICA
   RELÓGIO
   TECLADO
   TELA CHEIA
========================================= */

(() => {
  "use strict";

  // TEMPO DE CADA TELA
  const DURACAO = 30;

  // RESOLUÇÃO BASE
  const PALCO = {
    largura: 1280,
    altura: 720,
  };

  // CAPTURA AS TELAS
  const telas = [...document.querySelectorAll("main .screen")];

  const hora = document.getElementById("hora");

  const indicador = document.getElementById("slideAtual");

  const barra = document.getElementById("barraProgresso");

  // VERIFICA SE EXISTEM TELAS

  if (!telas.length) {
    console.error("[PH Prime] Nenhuma tela encontrada.");

    return;
  }

  // VARIÁVEIS

  let atual = 0;

  let decorrido = 0;

  let pausado = false;

  let ultimo = performance.now();

  // FORMATAÇÃO

  const pad = (numero) => {
    return String(numero).padStart(2, "0");
  };

  // =========================================
  // RELÓGIO
  // =========================================

  function atualizarHora() {
    if (!hora) return;

    hora.textContent = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit",

      hour12: false,
    }).format(new Date());
  }

  // =========================================
  // INDICADOR DE TELAS
  // =========================================

  function atualizarIndicador() {
    if (indicador) {
      indicador.textContent = `${pad(atual + 1)} / ${pad(telas.length)}`;
    }

    if (barra) {
      const percentual = Math.min(
        100,

        (decorrido / DURACAO) * 100,
      );

      barra.style.width = `${percentual}%`;
    }
  }

  // =========================================
  // MOSTRAR TELA
  // =========================================

  function mostrar(indice) {
    atual = (indice + telas.length) % telas.length;

    telas.forEach((tela, i) => {
      const ativa = i === atual;

      tela.classList.toggle("active", ativa);

      tela.setAttribute("aria-hidden", String(!ativa));
    });

    decorrido = 0;

    atualizarIndicador();
  }

  // =========================================
  // ESCALA RESPONSIVA
  // =========================================

  function escala() {
    const fator = Math.min(
      window.innerWidth / PALCO.largura,

      window.innerHeight / PALCO.altura,
    );

    const x = (window.innerWidth - PALCO.largura * fator) / 2;

    const y = (window.innerHeight - PALCO.altura * fator) / 2;

    document.body.style.transform = `translate(${x}px, ${y}px) scale(${fator})`;
  }

  // =========================================
  // CONTROLES DO TECLADO
  // =========================================

  document.addEventListener("keydown", (event) => {
    // PRÓXIMA TELA

    if (event.key === "ArrowRight") {
      event.preventDefault();

      mostrar(atual + 1);
    }

    // TELA ANTERIOR
    else if (event.key === "ArrowLeft") {
      event.preventDefault();

      mostrar(atual - 1);
    }

    // PAUSAR OU CONTINUAR
    else if (event.code === "Space") {
      event.preventDefault();

      pausado = !pausado;

      document.body.classList.toggle("paused", pausado);
    }

    // PRIMEIRA TELA
    else if (event.key === "Home") {
      mostrar(0);
    }

    // ÚLTIMA TELA
    else if (event.key === "End") {
      mostrar(telas.length - 1);
    }

    // TELA CHEIA
    else if (event.key.toLowerCase() === "f") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }
  });

  // =========================================
  // ROTAÇÃO AUTOMÁTICA
  // =========================================

  function animar(agora) {
    const delta = Math.min(
      (agora - ultimo) / 1000,

      0.25,
    );

    ultimo = agora;

    if (!pausado) {
      decorrido += delta;

      if (decorrido >= DURACAO) {
        mostrar(atual + 1);
      } else {
        atualizarIndicador();
      }
    }

    requestAnimationFrame(animar);
  }

  // =========================================
  // INICIALIZAÇÃO
  // =========================================

  atualizarHora();

  setInterval(atualizarHora, 1000);

  window.addEventListener("resize", escala);

  document.addEventListener("visibilitychange", () => {
    ultimo = performance.now();
  });

  // INICIA NA PRIMEIRA TELA

  mostrar(0);

  // AJUSTA O TAMANHO

  escala();

  // INICIA A ROTAÇÃO

  requestAnimationFrame(animar);

  // =========================================
  // CONTROLE EXTERNO
  // =========================================

  window.PHPrimePainel = {
    proximo: () => {
      mostrar(atual + 1);
    },

    anterior: () => {
      mostrar(atual - 1);
    },

    irPara: mostrar,
  };
})();
