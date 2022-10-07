const { Router } = require('express');

const menus = require('../middleware/users/menus');

const UserRepository = require('../../../../modules/user/infra/sequelize/repositories/UserRepository');
const RegisterController = require('../controllers/users/RegisterController');
const CreateUserUseCase = require('../../../../modules/user/usesCases/createUser/createUserUseCase');

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const registerController = new RegisterController(createUserUseCase);

const user = Router();

user.get('/login', (request, response) => {
    response.render('user/login', {
        title: 'Entrar'
    })
}); // GET LOGIN PAGE

user.get('/register', (request, response) => {
    return registerController.render(request, response, {}, null, null);
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

user.post('/register', async (request, response) => {
    const { name, email, phone, password } = request.body;

    const appMessage = await registerController.handler({ name, email, phone, password });

    if (!appMessage.isError) {
        registerController.render(request, response, {}, appMessage.message, null);
    } else {
        registerController.render(request, response, { name, email, phone }, null, appMessage.message);
    }
}) // POST REGISTER USER

module.exports = user;