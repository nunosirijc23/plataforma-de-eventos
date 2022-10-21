const { validateLoginData } = require('../../utils/dataValidator');
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

        const message = validateLoginData(email, password);
        
        if (message) return new AppMessage(message, true);
        
        let user = null;

        try {
            user = await this.authenticateUserUseCase.execute({ email, password });
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return user;
    }
}

module.exports = LoginController;