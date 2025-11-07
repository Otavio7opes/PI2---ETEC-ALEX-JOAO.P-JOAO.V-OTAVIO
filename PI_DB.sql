CREATE DATABASE IF NOT EXISTS laboratorio;
USE laboratorio;

CREATE TABLE IF NOT EXISTS kits (
  id_kit INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  materiais TEXT
);

CREATE TABLE IF NOT EXISTS reserva (
	id_reserva INT auto_increment PRIMARY KEY UNIQUE, 
    reservado boolean, 
    foreign key (id_lab) references laboratorios(id_lab),
    foreign key (id_kit) references kits(id_kit)
);

CREATE TABLE IF NOT EXISTS laboratorios (
	id_lab INT AUTO_INCREMENT PRIMARY KEY UNIQUE, 
    nome varchar(100) UNIQUE NOT NULL
);

-- INSERT INTO laboratorios VALUES (1, 'laboratorio_1');
-- INSERT INTO laboratorios VALUES (2, 'laboratorio_2');
-- INSERT INTO laboratorios VALUES (3, 'laboratorio_3');
-- INSERT INTO laboratorios VALUES (4, 'laboratorio_4');

-- insert into reserva values (1, false, 1);