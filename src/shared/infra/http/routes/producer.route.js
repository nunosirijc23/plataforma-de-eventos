const { Router } = require('express');

const menus = require('../middleware/producer/menus'); 
const ensureAuthenticated = require('../middleware/producer/ensureAuthenticated');

const ProducerRepository = require('../../../../modules/producer/infra/sequelize/repositories/ProducerRepository');
const RegisterController = require('../controllers/producer/RegisterController');
const CreateProducerUseCase = require('../../../../modules/producer/usesCases/createProducer/createProducerUseCase');
const LoginController = require('../controllers/producer/LoginController');
const AuthenticateProducerUseCase = require('../../../../modules/producer/usesCases/authenticateProducer/authenticateProducerUseCase');
const DashboardController = require('../controllers/producer/DashboardController');

let producerRepository = new ProducerRepository();
let createProducerUseCase = new CreateProducerUseCase(producerRepository);
let registerController = new RegisterController(createProducerUseCase);
let authenticateProducerUseCase = new AuthenticateProducerUseCase(producerRepository);
let loginController = new LoginController(authenticateProducerUseCase);
let dashboardController = new DashboardController();

const producer = Router();

producer.use(ensureAuthenticated) // ENSURE PRODUCER AUTHENTICATE

producer.get('/login', (request, response) => {
    loginController.render(request, response, {}, null);
}); // GET LOGIN PAGE

producer.get('/register', (request, response) => {
    registerController.render(request, response, {}, null, null);
}); // GET REGISTER PAGE

producer.get('/dashboard', menus, (request, response) => {
    dashboardController.render(request, response);
}); // GET DASHBOARD PAGE

producer.get('/my-events', menus, (request, response) => {
    response.render('producer/my-events', {
        title: 'Meus eventos',
        menus: request.menus
    })
}); // GET MY-EVENTS PAGE

producer.get('/event', (request, response) => {
    response.render('producer/event', {
        title: 'Evento'
    })
}); // GET MY-EVENTS PAGE

producer.get('/logout', (request, response) => {
    delete request.session.producer;
    return response.redirect("/producers/login");
}); // GET PRODUCER LOGOUT

producer.post("/register", async (request, response) => {
    const appMessage = await registerController.handler(request, response);

    if (!appMessage.isError) {
        registerController.render(request, response, {}, appMessage.message, null);
    } else {
        registerController.render(request, response, request.body, null, appMessage.message);
    }
}); // POST REGISTER PRODUCER    

producer.post('/login', async (request, response) => {
    const producerOrAppMessage = await loginController.handler(request, response);

    if (producerOrAppMessage.isError) {
        loginController.render(request, response, request.body, producerOrAppMessage.message);
    } else {
        request.session.producer = producerOrAppMessage;
        return response.redirect("/producers/dashboard");
    }
});

module.exports = producer;