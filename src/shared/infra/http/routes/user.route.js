const { Router } = require('express');

const menus = require('../middleware/users/menus');
const ensureAuthenticated = require('../middleware/users/ensureAuthenticated');

const UserRepository = require('../../../../modules/user/infra/sequelize/repositories/UserRepository');
const RegisterController = require('../controllers/users/RegisterController');
const CreateUserUseCase = require('../../../../modules/user/usesCases/createUser/createUserUseCase');
const LoginController = require('../controllers/users/LoginController');
const AuthenticateUserUseCase = require('../../../../modules/user/usesCases/authenticateUser/authenticateUserUseCase');
const EventRepository = require('../../../../modules/events/infra/sequelize/repositories/EventRepository');
const CategoryRepository = require('../../../../modules/events/infra/sequelize/repositories/CategoryRepository');
const FindAllCategoriesUseCase = require('../../../../modules/events/usesCases/findAllCategories/findAllCategoriesUseCase');
const FindAllEventsUseCase = require('../../../../modules/events/usesCases/findAllEvents/findAllEventsUseCase');
const EventsController = require('../controllers/users/EventsController');
const FindOneEventByIdUseCase = require('../../../../modules/events/usesCases/findOneEventById/findOneEventByIdUseCase');
const BuyTicketController = require('../controllers/users/BuyTickectController');

const userRepository = new UserRepository();
const eventRepository = new EventRepository();
const categoryRepository = new CategoryRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoryRepository);
const findAllEventsUseCase = new FindAllEventsUseCase(eventRepository);
const findOneEventByIdUseCase = new FindOneEventByIdUseCase(eventRepository);

const registerController = new RegisterController(createUserUseCase);
const loginController = new LoginController(authenticateUserUseCase);
const eventsController = new EventsController(findAllEventsUseCase, findAllCategoriesUseCase);
const buyTicketController = new BuyTicketController(findOneEventByIdUseCase);

const user = Router();

user.use(ensureAuthenticated); // ENSURE USER AUTHENTICATE

user.get('/login', (request, response) => {
    return loginController.render(request, response, {}, null);
}); // GET LOGIN PAGE

user.get('/register', (request, response) => {
    return registerController.render(request, response, {}, null, null);
}); // GET REGISTER PAGE

user.get('/events', menus, async (request, response) => {
    return await eventsController.render(request, response);
}); // GET EVENTS PAGE

user.get('/my-tickets', menus, (request, response) => {
    response.render('user/my-tickets', {
        title: 'Meus bilhetes',
        search: false,
        menus: request.menus,
        user: request.session.user
    })
}); // GET MY-TICKET PAGE

user.get('/buy-ticket/:id', async (request, response) => {
    return await buyTicketController.render(request, response);
}); // GET BUY-TICKET PAGE

user.get('/logout', (request, response) => {
    delete request.session.user;
    return response.redirect("/users/login");
}); // GET USER LOGOUT

user.post('/register', async (request, response) => {
    const appMessage = await registerController.handler(request, response);

    if (!appMessage.isError) {
        registerController.render(request, response, {}, appMessage.message, null);
    } else {
        registerController.render(request, response, request.body, null, appMessage.message);
    }
}); // POST REGISTER USER

user.post('/login', async (request, response) => {
    const userOrAppMessage = await loginController.handler(request, response);

    if (userOrAppMessage.isError) {
        loginController.render(request, response, request.body, userOrAppMessage.message)
    } else {
        request.session.user = userOrAppMessage;
        return response.redirect('/users/events');
    }
}); // POST LOGIN

module.exports = user;