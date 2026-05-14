let contadorNormal = 0;
let contadorPref = 0;

let filaNormal = [];
let filaPreferencial = [];
let historico = [];

const beep = document.getElementById("beep");

const btnNormal = document.getElementById("btnNormal");
const btnPreferencial = document.getElementById("btnPreferencial");
const btnReset = document.getElementById("btnReset");

btnNormal.addEventListener("click", () => gerarSenha("normal"));
btnPreferencial.addEventListener("click", () => gerarSenha("preferencial"));
btnReset.addEventListener("click", zerarFilas);

function falar(texto) {
  const msg = new SpeechSynthesisUtterance(texto);
  speechSynthesis.speak(msg);
}

function gerarSenha(tipo) {
  beep.play();

  let senha = "";

  if (tipo === "normal") {
    contadorNormal++;
    senha = "N" + contadorNormal;
    filaNormal.push(senha);
  } else {
    contadorPref++;
    senha = "P" + contadorPref;
    filaPreferencial.push(senha);
  }

  atualizarUI();
  chamarProxima();
}

function chamarProxima() {
  let senha;

  if (filaPreferencial.length > 0) {
    senha = filaPreferencial.shift();
  } else if (filaNormal.length > 0) {
    senha = filaNormal.shift();
  }

  if (senha) {
    document.getElementById("senhaAtual").innerText = senha;
    historico.push(senha);

    falar("Senha chamada " + senha);
  }

  atualizarUI();
}

function zerarFilas() {
  filaNormal = [];
  filaPreferencial = [];
  historico = [];
  document.getElementById("senhaAtual").innerText = "---";
  atualizarUI();
}

function atualizarUI() {
  document.getElementById("filaNormal").innerHTML =
    filaNormal.map(s => `<li class="normal-item">${s}</li>`).join("");

  document.getElementById("filaPreferencial").innerHTML =
    filaPreferencial.map(s => `<li class="preferencial-item">${s}</li>`).join("");

  document.getElementById("historico").innerHTML =
    historico.map(s => `<li>${s}</li>`).join("");
}