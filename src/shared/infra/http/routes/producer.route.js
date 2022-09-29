const { Router } = require('express');

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

producer.get('/dashboard', (request, response) => {
    response.render('producer/index', {
        title: 'Dashboard'
    })
}) // GET DASHBOARD PAGE

producer.get('/my-events', (request, response) => {
    response.render('producer/my-events', {
        title: 'Meus eventos'
    })
}) // GET MY-EVENTS PAGE

producer.get('/event', (request, response) => {
    response.render('producer/event', {
        title: 'Evento'
    })
}) // GET MY-EVENTS PAGE


module.exports = producer;