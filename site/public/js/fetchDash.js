function finalizarQuiz() {
   
    document.getElementById('acertos_text').innerHTML = acertos;
    document.getElementById('acertos_text2').innerHTML = acertos;
    document.getElementById('acertos_text3').innerHTML = acertos;
    document.getElementById('pontos_text').innerHTML = pontuacao;
    document.getElementById('pontos_text2').innerHTML = pontuacao;
    document.getElementById('pontos_text3').innerHTML = pontuacao;
    var dadosQuiz = {
        dificuldade: dificuldade, 
        acertos: acertos,         
        erros: erros,            
        pontos: pontuacao        
    };


    fetch(`/pontuacoes/insert/${idUsuario}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosQuiz)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os resultados do quiz');
        }
        return response.json();
    })
    .then(data => {
        console.log('Resultados do quiz enviados com sucesso:', data);
 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    plotarGrafico()
}


function obterPontos() {
    fetch(`/pontuacoes/ultimas/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                var pontosRecebidos = resposta[0].total_pontos; 
                var vezesRealizadas = resposta[0].quantidade
                var qtd_acertos = resposta[0].qtd_acertos
                var qtd_erros = resposta[0].qtd_erros
                console.log(`${pontosRecebidos}`)

                pts_kpi.innerHTML = `${pontosRecebidos} Pts`
                vezes_kpi.innerHTML = `${vezesRealizadas} Vezes`
                acertos_kpi.innerHTML = `${qtd_acertos} Acertos`
                total_acertos = qtd_acertos
                total_erros = qtd_erros
                pontos_totais = pontosRecebidos
            
                selecionarPersonagem()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        
    });
    
    
}

function obterPontosPorNivel() {
    fetch(`/pontuacoes/nivel/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
               pontosDificil = resposta[2].acertos_totais; 
               pontosFacil = resposta[1].acertos_totais; 
               pontosMedio = resposta[0].acertos_totais; 
                plotarGrafico2()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        
    });
       
}

function PontosGerais() {
    fetch(`/pontuacoes/tempo-real`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                var pontosPrimeiro = resposta[4].total_pontos; 
                var pontosSegundo = resposta[3].total_pontos;
                var pontosTerceiro = resposta[2].total_pontos; 
                var pontosQuarto = resposta[1].total_pontos; 
                var pontosQuinto = resposta[0].total_pontos; 
                var nomePrimeiro = resposta[4].nome;
                var nomeSegundo = resposta[3].nome;
                var nomeTerceiro = resposta[2].nome;
                var nomeQuarto = resposta[1].nome;
                var nomeQuinto = resposta[0].nome;
                lista_pontos_ranking.push(pontosPrimeiro, pontosSegundo, pontosTerceiro, pontosQuarto, pontosQuinto)
                
                
                
                console.log(`${resposta[4].pontos_recebidos}`)
                nome_primeiro.innerHTML = `${nomePrimeiro}`
                nome_segundo.innerHTML = `${nomeSegundo}`
                nome_terceiro.innerHTML = `${nomeTerceiro}`
                nome_quarto.innerHTML = `${nomeQuarto}`
                nome_quinto.innerHTML = `${nomeQuinto}`
                pts_primeiro.innerHTML = `${pontosPrimeiro} Pts`
                pts_segundo.innerHTML = `${pontosSegundo} Pts`
                pts_terceiro.innerHTML = `${pontosTerceiro} Pts`
                pts_quarto.innerHTML = `${pontosQuarto} Pts`
                pts_quinto.innerHTML = `${pontosQuinto} Pts`
                verificacao()
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}