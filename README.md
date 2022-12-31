Requisitos para rodar o projecto:

- Ter o docker instalado na máquina.

Passos para rodar a aplicação:

1. Abrir o terminal 
2. Rodar o comando "docker compose up" para a criação dos containers da app, BD e redis
3. Rodar o comando "npm run migration:run" para rodar as migrations para a criação das tabelas na BD
4. Abrir o navegador e acessar "http://localhost:3333" para acessar a plaforma.