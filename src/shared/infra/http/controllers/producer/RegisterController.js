const AppMessage = require('../../../../../config/AppMessage');
const { validateProducerData } = require('../../utils/dataValidator');

class RegisterController {
    constructor (createProducerUseCase) {
        this.createProducerUseCase = createProducerUseCase;
    }

    render(request, response, body, success, error) {
        return response.render('producer/register', {
            title: 'Cadastrar',
            body,
            success,
            error
        });
    }

    async handler(request, response) {
        const { name, email, password } = request.body;
        
        const message = validateProducerData(name, email, password);
        
        if (message) return new AppMessage(message, true);

        try {
            await this.createProducerUseCase.execute({ name, email, password });
        } catch (error) {
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Conta criada com sucesso!", false);
    }
}

module.exports = RegisterController;