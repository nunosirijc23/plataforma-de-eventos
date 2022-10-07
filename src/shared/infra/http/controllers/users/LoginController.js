const AppMessage = require("../../../../../config/AppMessage");

class LoginController {
    constructor(authenticateUserUseCase) {
        this.authenticateUserUseCase = authenticateUserUseCase;
    }

    render(request, response, body, error) {
        response.render('user/login', {
            title: 'Entrar',
            body,
            error
        });
    }

    async handler(request, response) {
        const { email, password } = request.body;
        let user = null;

        try {
            user = await this.authenticateUserUseCase.execute({ email, password });
        } catch (error) {
            return new AppMessage(error.message, true);
        }

        return user;
    }
}

module.exports = LoginController;