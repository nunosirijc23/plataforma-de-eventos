const { Router } = require('express');

const menus = require('../middleware/producer/menus'); 
const ensureAuthenticated = require('../middleware/producer/ensureAuthenticated');
const { upload } = require('../../../../config/FileUpload');

const ProducerRepository = require('../../../../modules/producer/infra/sequelize/repositories/ProducerRepository');
const RegisterController = require('../controllers/producer/RegisterController');
const CreateProducerUseCase = require('../../../../modules/producer/useCases/createProducer/createProducerUseCase');
const LoginController = require('../controllers/producer/LoginController');
const AuthenticateProducerUseCase = require('../../../../modules/producer/useCases/authenticateProducer/authenticateProducerUseCase');
const DashboardController = require('../controllers/producer/DashboardController');
const CategoryRepository = require('../../../../modules/events/infra/sequelize/repositories/CategoryRepository');
const FindAllCategoriesUseCase = require('../../../../modules/events/usesCases/findAllCategories/findAllCategoriesUseCase');
const EventRepository = require('../../../../modules/events/infra/sequelize/repositories/EventRepository');
const FindAllEventsByProducerIdUseCase = require('../../../../modules/events/usesCases/findAllEventsByProducerId/findAllEventsByProducerIdUseCase');
const CreateEventUseCase = require('../../../../modules/events/usesCases/createEvent/createEventUseCase');
const UpdateEventUseCase = require('../../../../modules/events/usesCases/updateEvent/updateEventUseCase');
const MyEventsController = require('../controllers/producer/MyEventsController');
const FindOneEventByIdUseCase = require('../../../../modules/events/usesCases/findOneEventById/findOneEventByIdUseCase');
const UpdateEventPhotoUseCase = require('../../../../modules/events/usesCases/updateEventPhoto/updateEventPhotoUseCase');
const EventController = require('../controllers/producer/EventController'); 
const TicketRepository = require('../../../../modules/events/infra/sequelize/repositories/TicketRepository');
const TicketRepositoryMYSQL = require('../../../../modules/events/infra/mysql/repositories/TicketRepositoryMYSQL');
const FindAllTicketsByEventIdUseCase = require('../../../../modules/events/usesCases/findAllTicketsByEventId/findAllTicketsByEventIdUseCase');
const UpdateProducerDataUseCase = require('../../../../modules/producer/useCases/updateProducerData/updateProducerDataUseCase');
const ChangeProducerPasswordUseCase = require('../../../../modules/producer/useCases/changeProducerPassword/changeProducerPasswordUseCase');

let producerRepository = new ProducerRepository();
let categoryRepository = new CategoryRepository();
let eventRepository = new EventRepository();
let ticketRepository = new TicketRepository();
let ticketRepositoryMYSQL = new TicketRepositoryMYSQL();

let createProducerUseCase = new CreateProducerUseCase(producerRepository);
let authenticateProducerUseCase = new AuthenticateProducerUseCase(producerRepository);
let findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoryRepository);
let findAllEventsByProducerIdUseCase = new FindAllEventsByProducerIdUseCase(eventRepository);
let findOneEventByIdUseCase = new FindOneEventByIdUseCase(eventRepository);
let createEventUseCase = new CreateEventUseCase(eventRepository);
let updateEventUseCase = new UpdateEventUseCase(eventRepository);
let updateEventPhotoUseCase = new UpdateEventPhotoUseCase(eventRepository);
let findAllTicketsByEventIdUseCase = new FindAllTicketsByEventIdUseCase(ticketRepositoryMYSQL);
const updateProducerDataUseCase = new UpdateProducerDataUseCase(producerRepository);
const changeProducerPasswordUseCase = new ChangeProducerPasswordUseCase(producerRepository);

let registerController = new RegisterController(createProducerUseCase);
let loginController = new LoginController(authenticateProducerUseCase);
let dashboardController = new DashboardController(findAllEventsByProducerIdUseCase, updateProducerDataUseCase, changeProducerPasswordUseCase);
let myEventsController = new MyEventsController(findAllEventsByProducerIdUseCase, findAllCategoriesUseCase, createEventUseCase, updateEventUseCase, updateEventPhotoUseCase);
let eventController = new EventController(findOneEventByIdUseCase, findAllTicketsByEventIdUseCase);

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
    const appMessage = await myEventsController.handlerCreateEvent(request, response);

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
}); // POST CREATE EVENT

producer.put('/events', async (request, response) => {
    const appMessage = await myEventsController.handlerUpdateEvent(request, response);

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
}); // PUT UPDATE EVENT

producer.patch('/events/photo', upload.single("photo"), async (request, response) => {
    const appMessage = await myEventsController.handlerUpdatePhoto(request, response);

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
}); // PATCH UPLOAD PHOTO

producer.put('/changeData', async (request, response) => {
    const appMessage = await dashboardController.handlerUpdateProducerData(request, response);

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
}) // PUT UPDATE PRODUCER DATA

producer.patch('/changePassword', async (request, response) => {
    const appMessage = await dashboardController.handlerUpdateProducerPassword(request, response);

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
}) // PUT UPDATE USER PASSWORD


module.exports = producer;