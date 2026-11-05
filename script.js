(() => {
  "use strict";

  const DURACAO = 30;
  const LARGURA = 1280;
  const ALTURA = 720;

  const cards = Array.from(document.querySelectorAll("#painel > .card"));

  const relogio = document.getElementById("hora");
  const indicador = document.getElementById("slideAtual");
  const barra = document.getElementById("barraProgresso");

  if (!cards.length) {
    console.error("PH Prime: nenhum card encontrado.");
    return;
  }

  let indice = 0;
  let tempo = 0;
  let pausado = false;
  let ultimoFrame = performance.now();

  const total = cards.length;

  function atualizarRelogio() {
    if (!relogio) return;

    relogio.textContent = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  }

  function atualizarIndicador() {
    if (indicador) {
      indicador.textContent = `${String(indice + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }

    if (barra) {
      barra.style.width = `${Math.min(100, (tempo / DURACAO) * 100)}%`;
    }
  }

  function mostrarSlide(novoIndice) {
    indice = (novoIndice + total) % total;

    cards.forEach((card, i) => {
      const ativo = i === indice;

      card.classList.toggle("ativo", ativo);
      card.setAttribute("aria-hidden", String(!ativo));
    });

    tempo = 0;
    atualizarIndicador();
  }

  function proximo() {
    mostrarSlide(indice + 1);
  }

  function anterior() {
    mostrarSlide(indice - 1);
  }

  function alternarPausa() {
    pausado = !pausado;

    document.body.classList.toggle("painel-pausado", pausado);
  }

  function ajustarEscala() {
    const escala = Math.min(
      window.innerWidth / LARGURA,
      window.innerHeight / ALTURA,
    );

    const x = (window.innerWidth - LARGURA * escala) / 2;
    const y = (window.innerHeight - ALTURA * escala) / 2;

    document.body.style.transform = `translate(${x}px, ${y}px) scale(${escala})`;
  }

  function telaCheia() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      proximo();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      anterior();
    }

    if (event.code === "Space") {
      event.preventDefault();
      alternarPausa();
    }

    if (event.key === "Home") {
      mostrarSlide(0);
    }

    if (event.key === "End") {
      mostrarSlide(total - 1);
    }

    if (event.key.toLowerCase() === "f") {
      telaCheia();
    }
  });

  function animar(agora) {
    const delta = Math.min((agora - ultimoFrame) / 1000, 0.25);

    ultimoFrame = agora;

    if (!pausado) {
      tempo += delta;

      if (tempo >= DURACAO) {
        proximo();
      } else {
        atualizarIndicador();
      }
    }

    requestAnimationFrame(animar);
  }

  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);

  window.addEventListener("resize", ajustarEscala);

  document.addEventListener("visibilitychange", () => {
    ultimoFrame = performance.now();
  });

  mostrarSlide(0);
  ajustarEscala();

  requestAnimationFrame(animar);

  window.PHPrimePainel = {
    proximo,
    anterior,
    pausar: alternarPausa,
    irPara: mostrarSlide,
  };
})();
