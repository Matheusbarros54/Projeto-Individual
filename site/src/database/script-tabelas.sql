CREATE DATABASE dragonball;

USE dragonball;

CREATE TABLE usuario (
    idUsuario int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(50),
    email varchar(50),
    senha varchar(50)
);

CREATE TABLE quiz (
    idQuiz int PRIMARY KEY AUTO_INCREMENT,
    dificuldade varchar(10)
);

CREATE TABLE pontuacoes (
    idPontuacao int PRIMARY KEY AUTO_INCREMENT,
    fkUsuario int,
    fkQuiz int,
    pontos_recebidos int,
    acertos int,
    erros int,
    data_tentativa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz)
);

-- Inserindo dados na tabela usuario
INSERT INTO usuario (nome, email, senha) VALUES 
('matheus', 'matheus@outlook.com', '123456'),
('antônio', 'antonio@outlook.com', '123456'),
('Renato', 'renato@outlook.com', '123456'),
('Araújo', 'Araújo@outlook.com', '123456'),
('Felps', 'Felps@outlook.com', '123456');

select * from usuario;
-- Inserindo dados na tabela quiz
INSERT INTO quiz (dificuldade) VALUES
('facil'),
('media'),
('dificil'),
('media'),
('facil');

-- Inserindo dados na tabela pontuacoes
INSERT INTO pontuacoes (fkUsuario, fkQuiz, pontos_recebidos, acertos, erros) VALUES 
(1, 1, 2, 4, 2),
(2, 2, 5, 4, 3),
(3, 1, 2, 4, 9),
(4, 1, 43, 4, 1),
(5, 1, 31, 4, 5);