const { Router } = require('express');

const user = Router();

user.get('/login', (request, response) => {
    response.render('user/login', {
        title: 'Entrar'
    })
}); // GET LOGIN PAGE

user.get('/register', (request, response) => {
    response.render('user/register', {
        title: 'Cadastrar'
    })
}) // GET REGISTER PAGE

user.get('/events', (request, response) => {
    response.render('user/index', {
        title: 'Eventos'
    })
}) // GET EVENTS PAGE

user.get('/my-tickets', (request, response) => {
    response.render('user/my-tickets', {
        title: 'Meus bilhetes'
    })
}) // GET MY-TICKET PAGE

user.get('/buy-ticket', (request, response) => {
    response.render('user/buy-ticket', {
        title: 'Comprar bilhete'
    })
}) // GET BUY-TICKET PAGE

module.exports = user;