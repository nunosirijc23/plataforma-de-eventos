const { Router, response } = require('express');

const menus = require('../middleware/producer/menus'); 
const ensureAuthenticated = require('../middleware/producer/ensureAuthenticated');

const ProducerRepository = require('../../../../modules/producer/infra/sequelize/repositories/ProducerRepository');
const RegisterController = require('../controllers/producer/RegisterController');
const CreateProducerUseCase = require('../../../../modules/producer/usesCases/createProducer/createProducerUseCase');
const LoginController = require('../controllers/producer/LoginController');
const AuthenticateProducerUseCase = require('../../../../modules/producer/usesCases/authenticateProducer/authenticateProducerUseCase');
const DashboardController = require('../controllers/producer/DashboardController');
const CategoryRepository = require('../../../../modules/events/infra/sequelize/repositories/CategoryRepository');
const FindAllCategoriesUseCase = require('../../../../modules/events/usesCases/findAllCategories/findAllCategoriesUseCase');
const EventRepository = require('../../../../modules/events/infra/sequelize/repositories/EventRepository');
const FindAllEventsByProducerIdUseCase = require('../../../../modules/events/usesCases/findAllEventsByProducerId/findAllEventsByProducerIdUseCase');
const CreateEventUseCase = require('../../../../modules/events/usesCases/createEvent/createEventUseCase');
const MyEventsController = require('../controllers/producer/MyEventsController');
const FindOneEventByIdUseCase = require('../../../../modules/events/usesCases/findOneEventById/findOneEventByIdUseCase');
const EventController = require('../controllers/producer/EventController');  

let producerRepository = new ProducerRepository();
let categoryRepository = new CategoryRepository();
let eventRepository = new EventRepository();

let createProducerUseCase = new CreateProducerUseCase(producerRepository);
let authenticateProducerUseCase = new AuthenticateProducerUseCase(producerRepository);
let findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoryRepository);
let findAllEventsByProducerIdUseCase = new FindAllEventsByProducerIdUseCase(eventRepository);
let findOneEventByIdUseCase = new FindOneEventByIdUseCase(eventRepository);
let createEventUseCase = new CreateEventUseCase(eventRepository);

let registerController = new RegisterController(createProducerUseCase);
let loginController = new LoginController(authenticateProducerUseCase);
let dashboardController = new DashboardController(findAllEventsByProducerIdUseCase);
let myEventsController = new MyEventsController(findAllEventsByProducerIdUseCase, findAllCategoriesUseCase, createEventUseCase);
let eventController = new EventController(findOneEventByIdUseCase);

const producer = Router();

producer.use(ensureAuthenticated) // ENSURE PRODUCER AUTHENTICATE

producer.get('/login', (request, response) => {
    loginController.render(request, response, {}, null);
}); // GET LOGIN PAGE

producer.get('/register', (request, response) => {
    registerController.render(request, response, {}, null, null);
}); // GET REGISTER PAGE

producer.get('/dashboard', menus, async (request, response) => {
    return await dashboardController.render(request, response);
}); // GET DASHBOARD PAGE

producer.get('/my-events', menus, (request, response) => {
    myEventsController.render(request, response);
}); // GET MY-EVENTS PAGE

producer.get('/event/:id', async (request, response) => {
    return await eventController.render(request, response);
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

producer.post('/events', async (request, response) => {
    const appMessage = await myEventsController.handler(request, response);

    if (appMessage.isError) {
        return response.json({
            error: appMessage.message,
            info: true
        });
    } else {
        return response.json({
            message: appMessage.message
        });
    }
}) // POST CREATE EVENT

module.exports = producer;