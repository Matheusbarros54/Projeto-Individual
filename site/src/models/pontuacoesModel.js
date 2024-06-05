var database = require("../database/config");

function buscarUltimasPontuacoes(idUsuario, limite_linhas) {

    var instrucaoSql = `select usuario.*, sum(pontuacoes.acertos) as qtd_acertos, sum(pontuacoes.erros) as qtd_erros, sum(pontuacoes.pontos_recebidos)
    as total_pontos, count(*) as quantidade from usuario join pontuacoes on fkUsuario = idUsuario 
    join quiz on idQuiz = fkQuiz
    where idUsuario = ${idUsuario} group by idUsuario;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPontosPorNivel(idUsuario) {

    var instrucaoSql = `select usuario.idUsuario, sum(pontuacoes.acertos) as acertos_totais, quiz.dificuldade from quiz join pontuacoes on idQuiz = fkQuiz
    join usuario on fkUsuario = idUsuario where idUsuario = ${idUsuario} group by idUsuario, quiz.dificuldade order by quiz.dificuldade;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarPontuacoesEmTempoReal() {

    var instrucaoSql = `select usuario.nome, sum(pontuacoes.pontos_recebidos) as total_pontos from pontuacoes join usuario on idUsuario = fkUsuario 
    group by usuario.nome order by total_pontos desc limit 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirPontuacoes(idUsuario, dificuldade, pontos, erros, acertos) {
    var instrucaoSql = `
    insert into pontuacoes (fkUsuario, fkQuiz, pontos_recebidos, acertos, erros) values
    (${idUsuario}, ${dificuldade}, ${pontos}, ${acertos}, ${erros});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPontosPorNivel,
    buscarPontuacoesEmTempoReal,
    buscarUltimasPontuacoes,
    inserirPontuacoes
}
