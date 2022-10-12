const { Router } = require('express');

const menus = require('../middleware/users/menus');
const ensureAuthenticated = require('../middleware/users/ensureAuthenticated');

const UserRepository = require('../../../../modules/user/infra/sequelize/repositories/UserRepository');
const RegisterController = require('../controllers/users/RegisterController');
const CreateUserUseCase = require('../../../../modules/user/usesCases/createUser/createUserUseCase');
const LoginController = require('../controllers/users/LoginController');
const AuthenticateUserUseCase = require('../../../../modules/user/usesCases/authenticateUser/authenticateUserUseCase');
const EventsController = require('../controllers/users/EventsController');

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const registerController = new RegisterController(createUserUseCase);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const loginController = new LoginController(authenticateUserUseCase);
const eventsController = new EventsController();

const user = Router();

user.use(ensureAuthenticated); // ENSURE USER AUTHENTICATE

user.get('/login', (request, response) => {
    return loginController.render(request, response, {}, null);
}); // GET LOGIN PAGE

user.get('/register', (request, response) => {
    return registerController.render(request, response, {}, null, null);
}); // GET REGISTER PAGE

user.get('/events', menus, (request, response) => {
    eventsController.render(request, response);
}); // GET EVENTS PAGE

user.get('/my-tickets', menus, (request, response) => {
    response.render('user/my-tickets', {
        title: 'Meus bilhetes',
        menus: request.menus,
        user: request.session.user
    })
}); // GET MY-TICKET PAGE

user.get('/buy-ticket', (request, response) => {
    response.render('user/buy-ticket', {
        title: 'Comprar bilhete',
        user: request.session.user
    })
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