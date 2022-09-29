const { Router } = require('express');

const menus = require('../middleware/users/menus');

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

user.get('/events', menus, (request, response) => {
    response.render('user/index', {
        title: 'Eventos',
        menus: request.menus
    })
}) // GET EVENTS PAGE

user.get('/my-tickets', menus, (request, response) => {
    response.render('user/my-tickets', {
        title: 'Meus bilhetes',
        menus: request.menus
    })
}) // GET MY-TICKET PAGE

user.get('/buy-ticket', (request, response) => {
    response.render('user/buy-ticket', {
        title: 'Comprar bilhete'
    })
}) // GET BUY-TICKET PAGE

module.exports = user;