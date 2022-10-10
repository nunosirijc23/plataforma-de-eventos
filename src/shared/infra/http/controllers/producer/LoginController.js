const AppMessage = require('../../../../../config/AppMessage');
const { validateLoginData } = require('../../utils/dataValidator');

class LoginController {
    constructor(authenticateProducerUseCase) {
        this.authenticateProducerUseCase = authenticateProducerUseCase;
    }

    render(request, response, body, error) {
        return response.render('producer/login', {
            title: 'Entrar',
            body,
            error
        });
    }

    async handler(request, response) {
        const { email, password } = request.body;

        const message = validateLoginData(email, password);

        if (message) return new AppMessage(message, true);

        let producer;

        try {
            producer = await this.authenticateProducerUseCase.execute({ email, password });
        } catch (error) {
            return new AppMessage(error.message, true);
        }

        return producer;
    }
}

module.exports = LoginController;