const { validateUserData } = require('../../utils/dataValidator');
const AppMessage = require("../../../../../config/AppMessage");

class RegisterController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    render(request, response, body, success, error) {
        response.render('user/register', {
            title: 'Cadastrar',
            body,
            success,
            error
        })
    }

    async handler(request, response) {
        const { name, email, phone, password } = request.body;

        const message = validateUserData(name, email, String(phone).toString(), password);

        if (message) return new AppMessage(message, true);
        
        try {
            await this.createUserUseCase.execute({ name, email, phone, password });
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Conta criada com sucesso!", false);
    }
}

module.exports = RegisterController;