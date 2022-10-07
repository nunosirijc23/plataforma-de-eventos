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

    async handler({ name, email, phone, password }) {
        try {
            await this.createUserUseCase.execute({ name, email, phone, password });
        } catch (error) {
            return new AppMessage(error.message, true);
        }

        // return new AppMessage("Usuário criado com sucesso", false);
    }
}

module.exports = RegisterController;