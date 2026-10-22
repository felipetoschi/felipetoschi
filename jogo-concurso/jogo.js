// Lógica do jogo "Desvende a Lei".
// Depende do array TEMAS definido em temas.js.

const MAX_ERROS = 6;
const TECLAS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

const estado = {
  tema: TEMAS[0],
  assuntoId: "todos",
  fila: [],
  indice: 0,
  atual: null,
  chutes: new Set(),
  erros: 0,
  acabou: false,
  pontos: 0,
  sequencia: 0,
  resultados: []
};

const $ = (id) => document.getElementById(id);

// Remove acentos e cedilha: "Ação" -> "ACAO"
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
}

function ehLetra(caractere) {
  return /[A-Z]/.test(normalizar(caractere));
}

function escapar(texto) {
  return texto.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// ---------- Recorde (salvo só neste navegador) ----------

function chaveRecorde() {
  return `desvende-recorde:${estado.tema.id}:${estado.assuntoId}`;
}

function lerRecorde() {
  try {
    return Number(localStorage.getItem(chaveRecorde())) || 0;
  } catch (e) {
    return 0;
  }
}

function salvarRecorde(valor) {
  try {
    localStorage.setItem(chaveRecorde(), String(valor));
  } catch (e) {
    // navegador sem armazenamento: o recorde vale só para esta sessão
  }
}

// ---------- Escolha de matéria e assunto ----------

function montarEscolha() {
  const grupoTemas = $("grupo-temas");
  TEMAS.forEach((tema) => {
    const chip = criarChip(tema.nome, "", () => {
      estado.tema = tema;
      estado.assuntoId = "todos";
      montarAssuntos();
      novaPartida();
    });
    chip.dataset.tema = tema.id;
    grupoTemas.appendChild(chip);
  });
  montarAssuntos();
}

function montarAssuntos() {
  document.querySelectorAll("[data-tema]").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.tema === estado.tema.id));
  });

  const grupo = $("grupo-assuntos");
  grupo.querySelectorAll(".chip").forEach((chip) => chip.remove());

  const total = estado.tema.assuntos.reduce((soma, a) => soma + a.itens.length, 0);
  const opcoes = [{ id: "todos", nome: "Todos", faixa: `${total} termos` }, ...estado.tema.assuntos];

  opcoes.forEach((assunto) => {
    const chip = criarChip(assunto.nome, assunto.faixa, () => {
      estado.assuntoId = assunto.id;
      atualizarChipsAssunto();
      novaPartida();
    });
    chip.dataset.assunto = assunto.id;
    grupo.appendChild(chip);
  });
  atualizarChipsAssunto();
}

function atualizarChipsAssunto() {
  document.querySelectorAll("[data-assunto]").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.assunto === estado.assuntoId));
  });
}

function criarChip(nome, detalhe, aoClicar) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "chip";
  chip.innerHTML = escapar(nome) + (detalhe ? ` <small>${escapar(detalhe)}</small>` : "");
  chip.addEventListener("click", aoClicar);
  return chip;
}

// ---------- Partida ----------

function novaPartida() {
  const assuntos = estado.assuntoId === "todos"
    ? estado.tema.assuntos
    : estado.tema.assuntos.filter((a) => a.id === estado.assuntoId);

  estado.fila = embaralhar(assuntos.flatMap((a) => a.itens));
  estado.indice = 0;
  estado.pontos = 0;
  estado.sequencia = 0;
  estado.resultados = [];

  $("tela-fim").hidden = true;
  $("tela-jogo").hidden = false;
  atualizarPlacar();
  iniciarRodada();
}

function iniciarRodada() {
  estado.atual = estado.fila[estado.indice];
  estado.chutes = new Set();
  estado.erros = 0;
  estado.acabou = false;

  $("mesa").classList.remove("ganhou");
  $("resultado").hidden = true;
  $("btn-dica").disabled = false;
  $("btn-pular").disabled = false;
  $("ref").textContent = `${estado.atual.ref} · ${estado.tema.fonte}`;
  $("progresso").textContent = `Termo ${estado.indice + 1} de ${estado.fila.length}`;
  $("pista").innerHTML = textoComResposta(estado.atual, false);

  montarTeclado();
  desenhar();
}

// Troca a resposta dentro do texto da lei por uma lacuna (ou destaca, no fim)
function textoComResposta(item, revelar) {
  const texto = item.texto;
  const inicio = normalizar(texto).indexOf(normalizar(item.resposta));
  if (inicio < 0) return escapar(texto);

  const fim = inicio + item.resposta.length;
  const meio = revelar
    ? `<mark>${escapar(texto.slice(inicio, fim))}</mark>`
    : `<span class="lacuna" aria-label="termo oculto">?</span>`;
  return escapar(texto.slice(0, inicio)) + meio + escapar(texto.slice(fim));
}

function letrasDaResposta() {
  return new Set([...estado.atual.resposta].filter(ehLetra).map(normalizar));
}

function desenhar(letraNova) {
  const quadros = $("quadros");
  quadros.innerHTML = "";

  const palavras = estado.atual.resposta.split(" ");
  // Cada palavra (com seu quadro de espaço) precisa caber inteira numa linha
  const maior = Math.max(...palavras.map((p, i) => p.length + (i < palavras.length - 1 ? 1 : 0)));
  quadros.style.setProperty("--maior", Math.max(maior, 8));
  palavras.forEach((palavra, i) => {
    const grupo = document.createElement("div");
    grupo.className = "palavra";

    [...palavra].forEach((caractere) => {
      const quadro = document.createElement("div");
      quadro.className = "quadro";

      if (!ehLetra(caractere)) {
        quadro.classList.add("sinal");
        quadro.textContent = caractere;
      } else if (estado.chutes.has(normalizar(caractere))) {
        quadro.classList.add("aberto");
        if (normalizar(caractere) === letraNova) quadro.classList.add("novo");
        quadro.textContent = caractere;
      } else if (estado.acabou) {
        quadro.classList.add("faltou");
        quadro.textContent = caractere;
      }
      grupo.appendChild(quadro);
    });

    // Quadrado vazio depois da palavra indica que o termo continua (termo composto)
    if (i < palavras.length - 1) {
      const espaco = document.createElement("div");
      espaco.className = "quadro espaco";
      espaco.setAttribute("aria-label", "espaço entre palavras");
      grupo.appendChild(espaco);
    }
    quadros.appendChild(grupo);
  });

  $("composto").textContent = palavras.length > 1 ? `Termo composto: ${palavras.length} palavras` : "";

  const vidas = $("vidas");
  vidas.innerHTML = "<span>Vidas</span>";
  for (let i = 0; i < MAX_ERROS; i++) {
    const vida = document.createElement("i");
    vida.className = "vida" + (i < MAX_ERROS - estado.erros ? "" : " perdida");
    vidas.appendChild(vida);
  }
  vidas.setAttribute("aria-label", `${MAX_ERROS - estado.erros} de ${MAX_ERROS} vidas`);
}

function montarTeclado() {
  const teclado = $("teclado");
  teclado.innerHTML = "";
  TECLAS.forEach((linha) => {
    const div = document.createElement("div");
    div.className = "linha-teclas";
    [...linha].forEach((letra) => {
      const tecla = document.createElement("button");
      tecla.type = "button";
      tecla.className = "tecla";
      tecla.textContent = letra;
      tecla.dataset.letra = letra;
      tecla.addEventListener("click", () => chutar(letra));
      div.appendChild(tecla);
    });
    teclado.appendChild(div);
  });
}

function marcarTecla(letra, certa) {
  const tecla = document.querySelector(`.tecla[data-letra="${letra}"]`);
  if (!tecla) return;
  tecla.classList.add(certa ? "certa" : "errada");
  tecla.disabled = true;
}

function chutar(letra) {
  if (estado.acabou || estado.chutes.has(letra)) return;
  estado.chutes.add(letra);

  const certa = letrasDaResposta().has(letra);
  if (!certa) estado.erros++;
  marcarTecla(letra, certa);
  desenhar(letra);
  verificarFim();
}

function revelarLetra() {
  if (estado.acabou) return;
  const faltando = [...letrasDaResposta()].filter((l) => !estado.chutes.has(l));
  if (faltando.length === 0) return;

  const letra = faltando[Math.floor(Math.random() * faltando.length)];
  estado.chutes.add(letra);
  estado.erros++;
  marcarTecla(letra, true);
  desenhar(letra);
  verificarFim();
}

function verificarFim() {
  const faltando = [...letrasDaResposta()].some((l) => !estado.chutes.has(l));
  if (!faltando) {
    encerrarRodada(true);
  } else if (estado.erros >= MAX_ERROS) {
    encerrarRodada(false);
  }
}

function encerrarRodada(acertou) {
  estado.acabou = true;
  const vidasRestantes = MAX_ERROS - estado.erros;
  const ganho = acertou ? 10 + vidasRestantes : 0;

  estado.pontos += ganho;
  estado.sequencia = acertou ? estado.sequencia + 1 : 0;
  estado.resultados.push({ item: estado.atual, acertou });

  $("mesa").classList.toggle("ganhou", acertou);
  document.querySelectorAll(".tecla").forEach((t) => (t.disabled = true));
  $("btn-dica").disabled = true;
  $("btn-pular").disabled = true;
  desenhar();

  const veredito = $("veredito");
  veredito.className = "veredito " + (acertou ? "ok" : "erro");
  veredito.textContent = acertou
    ? `Acertou! +${ganho} pontos`
    : `Não foi dessa vez. A resposta era "${estado.atual.resposta}".`;

  $("pista").innerHTML = textoComResposta(estado.atual, true);
  $("lei").innerHTML = `<b>${escapar(estado.atual.ref)}.</b> ` + textoComResposta(estado.atual, true);
  $("nota").innerHTML = `<b>Para a prova</b>${escapar(estado.atual.nota)}`;
  $("btn-proximo").textContent = estado.indice + 1 < estado.fila.length ? "Próximo termo" : "Ver resultado";
  $("resultado").hidden = false;
  $("btn-proximo").focus({ preventScroll: true });

  atualizarPlacar();
}

function proximo() {
  if (!estado.acabou) return;
  estado.indice++;
  if (estado.indice < estado.fila.length) {
    iniciarRodada();
  } else {
    mostrarFim();
  }
}

function mostrarFim() {
  const acertos = estado.resultados.filter((r) => r.acertou).length;
  const total = estado.resultados.length;
  const recordeAnterior = lerRecorde();
  const bateuRecorde = estado.pontos > recordeAnterior;
  if (bateuRecorde) salvarRecorde(estado.pontos);

  $("tela-jogo").hidden = true;
  $("tela-fim").hidden = false;

  $("fim-titulo").textContent = acertos === total
    ? "Gabaritou!"
    : `Você acertou ${acertos} de ${total} termos`;
  $("fim-resumo").textContent = `${estado.pontos} pontos nesta partida.` +
    (bateuRecorde ? " Novo recorde!" : ` Recorde: ${recordeAnterior}.`);

  const erros = estado.resultados.filter((r) => !r.acertou);
  $("fim-revisar").innerHTML = erros.length === 0 ? "" :
    "<p><b>Para revisar:</b></p><ul class=\"revisar\">" +
    erros.map((r) => `<li>${escapar(r.item.resposta)} <span>— ${escapar(r.item.ref)}</span></li>`).join("") +
    "</ul>";

  atualizarPlacar();
  $("btn-reiniciar").focus({ preventScroll: true });
}

function atualizarPlacar() {
  $("pontos").textContent = estado.pontos;
  $("sequencia").textContent = estado.sequencia;
  $("recorde").textContent = Math.max(lerRecorde(), estado.pontos);
}

// ---------- Eventos ----------

document.addEventListener("keydown", (evento) => {
  if (evento.ctrlKey || evento.metaKey || evento.altKey) return;

  if (evento.key === "Enter") {
    if (!$("tela-fim").hidden) {
      evento.preventDefault();
      novaPartida();
    } else if (estado.acabou) {
      evento.preventDefault();
      proximo();
    }
    return;
  }

  if (evento.key.length === 1) {
    const letra = normalizar(evento.key);
    if (/^[A-Z]$/.test(letra)) chutar(letra);
  }
});

$("btn-dica").addEventListener("click", revelarLetra);
$("btn-pular").addEventListener("click", () => {
  estado.erros = MAX_ERROS;
  encerrarRodada(false);
});
$("btn-proximo").addEventListener("click", proximo);
$("btn-reiniciar").addEventListener("click", novaPartida);

montarEscolha();
novaPartida();
