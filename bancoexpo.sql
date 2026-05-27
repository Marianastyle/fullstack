CREATE DATABASE revisao;
USE revisao;
CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone INT NULL,
  login VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  concluida BOOLEAN DEFAULT FALSE
);

select * from tarefas;