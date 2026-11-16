
const palavras = [
    { palavra: "javascript", categoria: "Tecnologia", dica: "Linguagem muito usada no desenvolvimento web." },
    { palavra: "computador", categoria: "Tecnologia", dica: "Máquina que processa informações." },
    { palavra: "internet", categoria: "Tecnologia", dica: "Rede mundial que conecta dispositivos." },
    { palavra: "teclado", categoria: "Tecnologia", dica: "Acessório usado para digitar." },
    { palavra: "algoritmo", categoria: "Tecnologia", dica: "Sequência de instruções para resolver problemas." },
    { palavra: "girafa", categoria: "Animais", dica: "Animal conhecido pelo pescoço comprido." },
    { palavra: "golfinho", categoria: "Animais", dica: "Mamífero que vive na água." },
    { palavra: "borboleta", categoria: "Animais", dica: "Inseto que passa pela metamorfose." },
    { palavra: "tartaruga", categoria: "Animais", dica: "Animal que possui casco." },
    { palavra: "elefante", categoria: "Animais", dica: "Grande mamífero que possui uma tromba." },
    { palavra: "campina", categoria: "Cidades", dica: "Cidade paraibana conhecida pelo São João." },
    { palavra: "recife", categoria: "Cidades", dica: "Capital de Pernambuco." },
    { palavra: "salvador", categoria: "Cidades", dica: "Capital da Bahia." },
    { palavra: "macarrao", categoria: "Alimentos", dica: "Alimento muito associado à culinária italiana." },
    { palavra: "chocolate", categoria: "Alimentos", dica: "Doce feito a partir do cacau." }
];

const LIMITE_TENTATIVAS = 6;

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = LIMITE_TENTATIVAS;

let partidas = 0;
let vitorias = 0;
let derrotas = 0;
let jogoFinalizado = false;

// Elementos do HTML
const elementoPalavra = document.getElementById("palavra");
const elementoCategoria = document.getElementById("categoria");
const elementoDica = document.getElementById("dica");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");

const formulario = document.getElementById("form-letra");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// Inicia uma nova partida
function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    const sorteada = palavras[indice];

    palavraSecreta = sorteada.palavra;

    elementoCategoria.textContent = sorteada.categoria;
    elementoDica.textContent = sorteada.dica;

    tentativas = LIMITE_TENTATIVAS;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoFinalizado = false;

    mensagem.textContent = "Boa sorte! Escolha uma letra.";
    mensagem.className = "mensagem";

    elementoLetrasUsadas.textContent = "Nenhuma letra utilizada.";
    elementoTentativas.textContent = tentativas;

    inputLetra.value = "";
    inputLetra.disabled = false;
    document.getElementById("btn-tentar").disabled = false;

    atualizarPalavra();

    partidas++;
    atualizarEstatisticas();

    inputLetra.focus();
}

// Mostra as letras descobertas
function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao.trim();
}

// Verifica se todas as letras foram descobertas
function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

// Atualiza as estatísticas
function atualizarEstatisticas() {
    document.getElementById("partidas").textContent = partidas;
    document.getElementById("vitorias").textContent = vitorias;
    document.getElementById("derrotas").textContent = derrotas;
}

// Finaliza o jogo
function finalizarJogo(ganhou) {
    jogoFinalizado = true;

    inputLetra.disabled = true;
    document.getElementById("btn-tentar").disabled = true;

    if (ganhou) {
        vitorias++;
        mensagem.textContent = "Parabéns! Você descobriu a palavra!";
    } else {
        derrotas++;
        mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta.toUpperCase();

        letrasCorretas = [...palavraSecreta];
        atualizarPalavra();
    }

    mensagem.className = "mensagem final";
    atualizarEstatisticas();
}

// Verifica a letra digitada
function verificarLetra(evento) {
    evento.preventDefault();

    if (jogoFinalizado) {
        return;
    }

    const letra = inputLetra.value.trim().toLowerCase();

    if (!/^[a-z]$/.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra válida.";
        mensagem.className = "mensagem erro";
        inputLetra.value = "";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Essa letra já foi utilizada!";
        mensagem.className = "mensagem erro";
        inputLetra.value = "";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);

        mensagem.textContent = "Muito bem! Você acertou.";
        mensagem.className = "mensagem acerto";

    } else {
        tentativas--;

        mensagem.textContent = "Essa letra não aparece na palavra.";
        mensagem.className = "mensagem erro";
    }

    atualizarPalavra();
    atualizarInformacoes();

    if (venceu()) {
        finalizarJogo(true);

    } else if (tentativas === 0) {
        finalizarJogo(false);
    }

    inputLetra.value = "";

    if (!jogoFinalizado) {
        inputLetra.focus();
    }
}

// Atualiza tentativas e letras utilizadas
function atualizarInformacoes() {
    elementoTentativas.textContent = tentativas;

    elementoLetrasUsadas.textContent =
        letrasUsadas.join(", ").toUpperCase();
}

// Evento de envio do formulário
formulario.addEventListener("submit", verificarLetra);

// Permite jogar pressionando Enter
inputLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        evento.preventDefault();
        formulario.requestSubmit();
    }
});

// Evento para iniciar outra partida
botaoReiniciar.addEventListener("click", iniciarJogo);

// Inicia o jogo ao abrir a página
iniciarJogo();
