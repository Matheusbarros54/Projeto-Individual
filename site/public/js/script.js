var respostaSelecionada = false;
var qtd_perguntas_respondidas = 0;
var acertos = 0;
var pontuacao = 0;
var erros = 0;
var dificuldade = 'facil';

var lista_respostas_facil = [2, 1, 4, 1, 1, 4, 2, 3, 4, 4];
var lista_respostas_medio = [3, 4, 4, 2, 4, 3, 2, 4, 1, 3];
var lista_respostas_dificil = [2, 4, 1, 1, 1, 2, 1, 4, 4, 3];

function recuperarEstado() {
    var estado = JSON.parse(localStorage.getItem('estadoQuiz'));
    if (estado) {
        qtd_perguntas_respondidas = estado.qtd_perguntas_respondidas;
        acertos = estado.acertos;
        pontuacao = estado.pontuacao;
        erros = estado.erros;
        dificuldade = estado.dificuldade || 'facil';
        return estado.paginaAtual;
    }
    return 1;
}

function salvarEstado(paginaAtual) {
    var estado = {
        qtd_perguntas_respondidas: qtd_perguntas_respondidas,
        acertos: acertos,
        pontuacao: pontuacao,
        erros: erros,
        paginaAtual: paginaAtual,
        dificuldade: dificuldade
    };
    localStorage.setItem('estadoQuiz', JSON.stringify(estado));
}

function iniciarQuiz(paginaInicial, nivelDificuldade) {
    dificuldade = nivelDificuldade;
    localStorage.removeItem('estadoQuiz');
    qtd_perguntas_respondidas = 0;
    acertos = 0;
    pontuacao = 0;
    erros = 0;
    mostrarProximaPagina(paginaInicial);
}
var contagem = 0
function verificarResposta(numero, divClicada) {
    if (respostaSelecionada) {
        return;
    }

    respostaSelecionada = true;

    var paginaAtual = document.querySelector('.modal.page.current-page');
    var paginas = document.querySelectorAll('.modal.page');
    var paginaIndex = Array.from(paginas).indexOf(paginaAtual);

    qtd_perguntas_respondidas++;

    var respostas_corretas;
    var pontuacao_atual;
    
    if (dificuldade == 'facil') {
        respostas_corretas = lista_respostas_facil;
        pontuacao_atual = 1;
    } else if (dificuldade == 'medio') {
        respostas_corretas = lista_respostas_medio;
        pontuacao_atual = 2;
    } else if (dificuldade == 'dificil') {
        respostas_corretas = lista_respostas_dificil;
        pontuacao_atual = 3;
    }

    if (numero == respostas_corretas[qtd_perguntas_respondidas - 1]) {
        acertos++;
        pontuacao += pontuacao_atual;
        divClicada.classList.add("certa");
    } else {
        erros++;
        divClicada.classList.add("errada");

        var alternativas = paginaAtual.querySelectorAll('.alternativa');
        var respostaCorretaIndex = respostas_corretas[qtd_perguntas_respondidas - 1] - 1;

        if (respostaCorretaIndex >= 0 && respostaCorretaIndex < alternativas.length) {
            alternativas[respostaCorretaIndex].classList.add("certa");
        }
    }

    setTimeout(() => {
        var proximaPaginaNumero = paginaIndex + 2;

        if (proximaPaginaNumero > paginas.length) {
            reiniciarQuiz();
        } else {
            mostrarProximaPagina(proximaPaginaNumero);
            salvarEstado(proximaPaginaNumero);
        }
        contagem++
       if(contagem == 10) {
        finalizarQuiz();
        contagem = 0
       }
        
        

        respostaSelecionada = false;
    }, 1500);

    
}

function mostrarProximaPagina(paginaNumero) {
    var todasPaginas = document.querySelectorAll('.modal.page');
    todasPaginas.forEach(pagina => {
        pagina.style.display = 'none';
        pagina.style.opacity = '0';
        pagina.classList.remove('current-page');
    });

    var proximaPagina = document.querySelector(`.modal.page.page${paginaNumero}`);
    if (proximaPagina) {
        proximaPagina.style.display = 'flex';
        setTimeout(() => {
            proximaPagina.style.opacity = '1';
            proximaPagina.classList.add('current-page');
        }, 10);
    }
}

function AbrirModal() {
    var quizModal = document.getElementById('quizModal');
    quizModal.showModal();
    var paginaInicial = recuperarEstado();
    
    if (paginaInicial > document.querySelectorAll('.modal.page').length) {
        reiniciarQuiz();
    } else {
        mostrarProximaPagina(paginaInicial);
    }
}

function FecharModal() {
    var quizModal = document.getElementById('quizModal');
    quizModal.close();
    salvarEstado(document.querySelector('.modal.page.current-page').classList[2].split('page')[1]);
}

function reiniciarQuiz() {
    qtd_perguntas_respondidas = 0;
    acertos = 0;
    pontuacao = 0;
    erros = 0;
    dificuldade = 'facil';
    localStorage.removeItem('estadoQuiz');
    mostrarProximaPagina(1);
    var alternativas = document.querySelectorAll('.alternativa');
    alternativas.forEach(alternativa => {
        alternativa.classList.remove('certa', 'errada');
    });
}

document.getElementById('abrirQuizBtn').addEventListener('click', AbrirModal);

document.addEventListener('DOMContentLoaded', (event) => {
    recuperarEstado();
});
