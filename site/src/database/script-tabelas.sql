create database dragonball;

use dragonball;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(50),
senha varchar(50));

create table pontuacoes (
idPontuacao int primary key auto_increment,
pontos_recebidos int,
acertos int,
erros int,
dificuldade_quiz varchar(10),
fkUsuario int,
constraint foreign key (fkUsuario) references usuario (idUsuario));

insert into usuario values 
(default, 'matheus', 'matheus@outlook.com', '123456'),
(default, 'antônio', 'antonio@outlook.com', '123456'),
(default, 'Renato', 'renato@outlook.com', '123456'),
(default, 'Araújo', 'Araújo@outlook.com', '123456'),
(default, 'Felps', 'Felps@outlook.com', '123456');

insert into pontuacoes values 
(default, 2, 4, 2, 'facil', 1),
(default, 5, 4, 3, 'facil', 2),
(default, 2, 4, 9, 'facil', 3),
(default, 43, 4, 1, 'facil', 4),
(default, 31, 4, 5, 'facil', 5);