function AbrirModal() {
    const modal = document.getElementById('quizModal');
    modal.showModal();
    mostrarPagina(1);
}

function FecharModal() {
    const modal = document.getElementById('quizModal');
    modal.close();
}

function mostrarPagina(pagina) {
    const pages = document.querySelectorAll('.modal.page');
    pages.forEach((page, index) => {
        if (index === pagina - 1) {
            page.style.display = 'flex';
            page.style.opacity = 0;
            setTimeout(() => {
                page.style.opacity = 1;
                page.style.transition = 'opacity 0.8s';
            }, 10);
        } else {
            page.style.display = 'none';
        }
    });
}

function mostrarProximaPagina(pagina) {
    mostrarPagina(pagina);
}

function mostrarPaginaAnterior(pagina) {
    mostrarPagina(pagina);
}


// Scripts Quiz


var lista_respostas = [1, 2, 3, 4, 5, 1, 2, 5, 1]
var acertos = 0
var erros = 0
var qtd_perguntas_respondidas = 0

let respostaSelecionada = false;

function verificarResposta(numero, divClicada) {
    if (respostaSelecionada) {
        return;
    }

    respostaSelecionada = true;

    const paginas = document.querySelectorAll('.modal.page');
    let paginaIndex = 0;

    paginas.forEach((pagina, index) => {
        if (pagina.style.display === 'flex') {
            paginaIndex = index;
        }
    });

    qtd_perguntas_respondidas++;

    if (numero == lista_respostas[qtd_perguntas_respondidas - 1]) {
        acertos++;
        divClicada.classList.add("certa");
    } else {
        erros++;
        divClicada.classList.add("errada");
        var paginaAtual = document.querySelector('.modal.page[style*="display: flex"]');
        paginaAtual.querySelector('.alternativas_dupla').querySelectorAll('.alternativa')[lista_respostas[qtd_perguntas_respondidas - 1] - 1].classList.add("certa");
    }

    setTimeout(() => {
        mostrarProximaPagina(paginaIndex + 2);
        respostaSelecionada = false;
    }, 1500);
}


