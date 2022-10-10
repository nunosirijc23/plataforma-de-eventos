const { Router } = require('express');

const menus = require('../middleware/producer/menus'); 

const ProducerRepository = require('../../../../modules/producer/infra/sequelize/repositories/ProducerRepository');
const RegisterController = require('../controllers/producer/RegisterController');
const CreateProducerUseCase = require('../../../../modules/producer/usesCases/createProducer/createProducerUseCase');

let producerRepository = new ProducerRepository();
let createProducerUseCase = new CreateProducerUseCase(producerRepository);
let registerController = new RegisterController(createProducerUseCase);

const producer = Router();

producer.get('/login', (request, response) => {
    response.render('producer/login', {
        title: 'Entrar'
    })
}); // GET LOGIN PAGE

producer.get('/register', (request, response) => {
    registerController.render(request, response, {}, null, null);
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

producer.post("/register", async (request, response) => {
    const appMessage = await registerController.handler(request, response);

    if (!appMessage.isError) {
        registerController.render(request, response, {}, appMessage.message, null);
    } else {
        registerController.render(request, response, request.body, null, appMessage.message);
    }
}) // POST REGISTER PRODUCER    

module.exports = producer;