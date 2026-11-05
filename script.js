(() => {
  "use strict";

  const CONFIG = {
    largura: 1280,
    altura: 720,
    duracaoSlide: 30,
  };

  const cards = Array.from(document.querySelectorAll("#painel > .card"));

  const relogio = document.getElementById("hora");
  const indicador = document.getElementById("slideAtual");
  const barra = document.getElementById("barraProgresso");

  if (cards.length === 0) {
    console.error("PH Prime: nenhum card foi encontrado.");
    return;
  }

  let indiceAtual = 0;
  let tempoDecorrido = 0;
  let pausado = false;
  let ultimoFrame = performance.now();

  const totalCards = cards.length;

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
      const atual = String(indiceAtual + 1).padStart(2, "0");
      const total = String(totalCards).padStart(2, "0");

      indicador.textContent = `${atual} / ${total}`;
    }

    if (barra) {
      const percentual = Math.min(
        100,
        (tempoDecorrido / CONFIG.duracaoSlide) * 100,
      );

      barra.style.width = `${percentual}%`;
    }
  }

  function mostrarSlide(novoIndice) {
    indiceAtual = (novoIndice + totalCards) % totalCards;

    cards.forEach((card, index) => {
      const ativo = index === indiceAtual;

      card.classList.toggle("ativo", ativo);
      card.setAttribute("aria-hidden", String(!ativo));
    });

    tempoDecorrido = 0;
    atualizarIndicadores();
  }

  function proximoSlide() {
    mostrarSlide(indiceAtual + 1);
  }

  function slideAnterior() {
    mostrarSlide(indiceAtual - 1);
  }

  function alternarPausa() {
    pausado = !pausado;

    document.body.classList.toggle("painel-pausado", pausado);

    console.info(pausado ? "Painel pausado." : "Painel retomado.");
  }

  function ajustarEscala() {
    const escala = Math.min(
      window.innerWidth / CONFIG.largura,
      window.innerHeight / CONFIG.altura,
    );

    const deslocamentoX = (window.innerWidth - CONFIG.largura * escala) / 2;

    const deslocamentoY = (window.innerHeight - CONFIG.altura * escala) / 2;

    document.body.style.transform = `translate(${deslocamentoX}px, ${deslocamentoY}px) scale(${escala})`;
  }

  function alternarTelaCheia() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((erro) => {
        console.warn("Não foi possível ativar tela cheia:", erro);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      proximoSlide();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      slideAnterior();
    }

    if (event.code === "Space") {
      event.preventDefault();
      alternarPausa();
    }

    if (event.key === "Home") {
      mostrarSlide(0);
    }

    if (event.key === "End") {
      mostrarSlide(totalCards - 1);
    }

    if (event.key.toLowerCase() === "f") {
      alternarTelaCheia();
    }
  });

  function animar(agora) {
    const diferenca = Math.min((agora - ultimoFrame) / 1000, 0.25);

    ultimoFrame = agora;

    if (!pausado) {
      tempoDecorrido += diferenca;

      if (tempoDecorrido >= CONFIG.duracaoSlide) {
        proximoSlide();
      } else {
        atualizarIndicadores();
      }
    }

    requestAnimationFrame(animar);
  }

  // Inicialização
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);

  window.addEventListener("resize", ajustarEscala);

  document.addEventListener("visibilitychange", () => {
    ultimoFrame = performance.now();
  });

  mostrarSlide(0);
  ajustarEscala();

  requestAnimationFrame(animar);

  // Controle externo, caso necessário.
  window.PHPrimePainel = {
    proximo: proximoSlide,
    anterior: slideAnterior,
    pausar: alternarPausa,
    irPara: mostrarSlide,
  };
})();
