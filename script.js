// ======================================
// VARIÁVEIS
// ======================================

let fugas = 0;

const mensagens = [

    "Tem certeza que precisa pensar? 👀",

    "Pode decidir rapidinho... 😌",

    "O convite não vai ficar aqui para sempre 😂",

    "Você está dificultando o trabalho do sistema...",

    "Mais uma fuga? 😂",

    "Última chance de escapar... ❤️"

];


// ======================================
// ELEMENTOS
// ======================================

const botaoPensar =
    document.getElementById("pensar");

const botaoAceitar =
    document.getElementById("aceitar");

const mensagem =
    document.getElementById("mensagem");


// ======================================
// BOTÃO PENSAR
// ======================================

botaoPensar.addEventListener(
    "click",
    function () {

        // Se já fugiu 6 vezes,
        // agora pode ser clicado normalmente.

        if (fugas >= 6) {

            mensagem.textContent =
                "Tá bom... agora você pode pensar 😂";

            return;

        }


        fugas++;


        // Mensagem correspondente
        mensagem.textContent =
            mensagens[fugas - 1];


        // ==================================
        // POSIÇÃO ALEATÓRIA
        // ==================================

        const movimentoX =
            Math.floor(
                Math.random() * 240
            ) - 120;


        const movimentoY =
            Math.floor(
                Math.random() * 140
            ) - 70;


        botaoPensar.style.transform =
            `translate(${movimentoX}px, ${movimentoY}px)`;


        // ==================================
        // SEXTA FUGA
        // ==================================

        if (fugas === 6) {

            mensagem.textContent =
                "Última fuga. Agora eu deixo você decidir 😂";

        }

    }
);


// ======================================
// BOTÃO ACEITAR
// ======================================

botaoAceitar.addEventListener(
    "click",
    function () {

        document
            .getElementById("principal")
            .classList.add("hidden");


        document
            .getElementById("sucesso")
            .classList.remove("hidden");


        iniciarEfeitos();


        tocarSom();

    }
);


// ======================================
// EFEITOS
// ======================================

function iniciarEfeitos() {

    const area =
        document.getElementById("efeitos");


    // ===============================
    // CORAÇÕES
    // ===============================

    for (let i = 0; i < 20; i++) {

        const coracao =
            document.createElement("div");


        coracao.className =
            "coracao";


        coracao.textContent =
            "❤️";


        coracao.style.left =
            Math.random() * 100 + "%";


        coracao.style.animationDuration =
            (3 + Math.random() * 2) + "s";


        coracao.style.animationDelay =
            Math.random() * 1.5 + "s";


        area.appendChild(coracao);


        setTimeout(
            () => coracao.remove(),
            6000
        );

    }


    // ===============================
    // BRILHOS
    // ===============================

    for (let i = 0; i < 15; i++) {

        const brilho =
            document.createElement("div");


        brilho.className =
            "brilho";


        brilho.textContent =
            "✨";


        brilho.style.left =
            Math.random() * 90 + "%";


        brilho.style.top =
            Math.random() * 90 + "%";


        brilho.style.animationDelay =
            Math.random() * 1.5 + "s";


        area.appendChild(brilho);


        setTimeout(
            () => brilho.remove(),
            3000
        );

    }

}


// ======================================
// SOM
// ======================================

function tocarSom() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        const audio =
            new AudioContext();


        tocarNota(
            audio,
            523.25,
            0,
            0.18
        );


        tocarNota(
            audio,
            659.25,
            0.16,
            0.18
        );


        tocarNota(
            audio,
            783.99,
            0.32,
            0.25
        );


        tocarNota(
            audio,
            1046.50,
            0.50,
            0.45
        );

    }

    catch (erro) {

        console.log(
            "Áudio não disponível."
        );

    }

}


// ======================================
// NOTA MUSICAL
// ======================================

function tocarNota(
    audio,
    frequencia,
    atraso,
    duracao
) {

    const oscilador =
        audio.createOscillator();


    const ganho =
        audio.createGain();


    oscilador.type =
        "sine";


    oscilador.frequency.value =
        frequencia;


    oscilador.connect(ganho);

    ganho.connect(
        audio.destination
    );


    const inicio =
        audio.currentTime +
        atraso;


    ganho.gain.setValueAtTime(
        0.0001,
        inicio
    );


    ganho.gain
        .exponentialRampToValueAtTime(
            0.18,
            inicio + 0.03
        );


    ganho.gain
        .exponentialRampToValueAtTime(
            0.0001,
            inicio + duracao
        );


    oscilador.start(inicio);


    oscilador.stop(
        inicio +
        duracao +
        0.05
    );

}
