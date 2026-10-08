drop database if exists registros_climaticos;
create database registros_climaticos;
use registros_climaticos;
create table usuarios(
    id int not null primary key auto_increment,
    nome varchar (50) not null,
    email varchar (30) not null unique,
    senha varchar (20) not null
);
create table eventos(
    id int not null primary key auto_increment,
    cidade varchar (30) not null,
    tipoEvento varchar (40) not null,
    temperaturaMaxima int (3) not null,
    data date not null,
    nivelImpacto enum('Baixo', 'Médio', 'Alto') not null,
    usuarioId int not null
);

alter table eventos add constraint fk_idusuario foreign key (usuarioId) references usuarios(id);

describe usuarios;
describe eventos;
show tables;

use registros_climaticos;
insert into usuarios (nome, email, senha) values
("Aura Dias", "aura@email.com", password("67426133")),
("Jefferson Caminhões", "jefferson@email.com", password("12345678")),
("João Raspado", "raspado@email.com", password("87654321"));

insert into eventos (cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId) values
("Amparo", "Calor extremo", "36", "2025-12-27", "Baixo", 1),
("Katmandu", "Enchente", "30", "2026-08-26", "Alto", 2),
("Canoas", "Enchente", "32", "2024-04-30", "Alto", 3);

select * from usuarios;
select * from eventos;