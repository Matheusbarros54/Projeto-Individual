create database dragonball;
describe usuario;
use dragonball;

create table pontuacoes (
idPontuacao int primary key auto_increment,
pontos_recebidos int,
tipo_jogo varchar(45));

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(50),
senha varchar(50),
fkPontuacoes int,
constraint foreign key (fkPontuacoes) references pontuacoes (idPontuacao));

insert into pontuacoes values 
(default, 11, 'Quiz'),
(default, 13, 'Quiz'),
(default, 9, 'Quiz'),
(default, 8, 'Quiz'),
(default, 7, 'Quiz'),
(default, 7, 'Quiz'),
(default, 7, 'Quiz'),
(default, 7, 'Quiz');


insert into usuario values 
(default, 'matheus', 'matheus@outlook.com', '123456', 1),
(default, 'antônio', 'antonio@outlook.com', '123456', 2),
(default, 'Renato', 'renato@outlook.com', '123456', 3),
(default, 'Araújo', 'Araújo@outlook.com', '123456', 4),
(default, 'Felps', 'Felps@outlook.com', '123456', 5);


update usuario set fkPontuacoes = 8
where idUsuario = 8;

select * from pontuacoes;

select nome from usuario;
select * from pontuacoes join usuario on fkPontuacoes = idPontuacao where fkPontuacoes = 8;
select nome, pontos_recebidos from pontuacoes join usuario on idPontuacao = fkPontuacoes order by pontos_recebidos desc;