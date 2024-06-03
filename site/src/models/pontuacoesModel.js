var database = require("../database/config");

function buscarUltimasPontuacoes(idUsuario, limite_linhas) {

    var instrucaoSql = `SELECT usuario.*, SUM(pontuacoes.acertos) as qtd_acertos, sum(pontuacoes.erros) as qtd_erros, SUM(pontuacoes.pontos_recebidos) AS total_pontos, count(*) as quantidade  FROM 
    pontuacoes JOIN usuario ON pontuacoes.fkUsuario = usuario.idUsuario
	WHERE usuario.idUsuario = ${idUsuario} GROUP BY 
    usuario.idUsuario;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPontosPorNivel(idUsuario) {

    var instrucaoSql = `select idUsuario, sum(pontuacoes.acertos) as acertos_totais, pontuacoes.dificuldade_quiz from pontuacoes join usuario on fkUsuario = idUsuario 
    where idUsuario = ${idUsuario}
    group by idUsuario, pontuacoes.dificuldade_quiz order by dificuldade_quiz;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarPontuacoesEmTempoReal() {

    var instrucaoSql = `select nome, sum(pontos_recebidos) as total_pontos from pontuacoes join usuario on fkUsuario = idUsuario group by usuario.nome order by total_pontos desc limit 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirPontuacoes(idUsuario, dificuldade, pontos, erros, acertos) {
    var instrucaoSql = `
    INSERT INTO pontuacoes (pontos_recebidos, acertos, erros, dificuldade_quiz, fkUsuario)
    VALUES (${pontos}, ${acertos}, ${erros}, '${dificuldade}', ${idUsuario});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPontosPorNivel,
    buscarPontuacoesEmTempoReal,
    buscarUltimasPontuacoes,
    inserirPontuacoes
}
