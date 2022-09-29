const { Router } = require('express');

const menus = require('../middleware/producer/menus'); 

const producer = Router();

producer.get('/login', (request, response) => {
    response.render('producer/login', {
        title: 'Entrar'
    })
}); // GET LOGIN PAGE

producer.get('/register', (request, response) => {
    response.render('producer/register', {
        title: 'Cadastrar'
    })
}) // GET REGISTER PAGE

producer.get('/dashboard', menus, (request, response) => {
    response.render('producer/index', {
        title: 'Dashboard',
        menus: request.menus
    })
}) // GET DASHBOARD PAGE

producer.get('/my-events', menus, (request, response) => {
    response.render('producer/my-events', {
        title: 'Meus eventos',
        menus: request.menus
    })
}) // GET MY-EVENTS PAGE

producer.get('/event', (request, response) => {
    response.render('producer/event', {
        title: 'Evento'
    })
}) // GET MY-EVENTS PAGE


module.exports = producer;