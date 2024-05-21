let respostaSelecionada = false;
let qtd_perguntas_respondidas = 0;
let acertos = 0;
let erros = 0;

// Lista de respostas corretas para cada pergunta
const lista_respostas = [1, 2, 4, 1, 1, 1, 4, 4, 3]; // Exemplo: respostas corretas para 10 perguntas

function verificarResposta(numero, divClicada) {
    if (respostaSelecionada) {
        return;
    }

    respostaSelecionada = true;

    const paginaAtual = document.querySelector('.modal.page.current-page');
    const paginas = document.querySelectorAll('.modal.page');
    const paginaIndex = Array.from(paginas).indexOf(paginaAtual);

    qtd_perguntas_respondidas++;

    if (numero === lista_respostas[qtd_perguntas_respondidas - 1]) {
        acertos++;
        divClicada.classList.add("certa");
    } else {
        erros++;
        divClicada.classList.add("errada");

        // Seleciona todas as alternativas da página atual
        const alternativas = paginaAtual.querySelectorAll('.alternativa');
        const respostaCorretaIndex = lista_respostas[qtd_perguntas_respondidas - 1] - 1;
        
        // Verifica se o índice da resposta correta está dentro do intervalo de alternativas
        if (respostaCorretaIndex >= 0 && respostaCorretaIndex < alternativas.length) {
            alternativas[respostaCorretaIndex].classList.add("certa");
        }
    }

    setTimeout(() => {
        mostrarProximaPagina(paginaIndex + 2);
        respostaSelecionada = false;
    }, 1500);
}

function mostrarProximaPagina(paginaNumero) {
    const todasPaginas = document.querySelectorAll('.modal.page');
    todasPaginas.forEach(pagina => {
        pagina.style.display = 'none';
        pagina.style.opacity = '0';
        pagina.classList.remove('current-page');
    });

    const proximaPagina = document.querySelector(`.modal.page.page${paginaNumero}`);
    if (proximaPagina) {
        proximaPagina.style.display = 'flex';
        setTimeout(() => {
            proximaPagina.style.opacity = '1';
            proximaPagina.classList.add('current-page');
        }, 10);
    }
}

function AbrirModal() {
    const quizModal = document.getElementById('quizModal');
    quizModal.showModal();
    mostrarProximaPagina(1); // Inicia na página 1 do quiz
}

function FecharModal() {
    const quizModal = document.getElementById('quizModal');
    quizModal.close();
}
