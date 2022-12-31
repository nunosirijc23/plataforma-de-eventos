const { validateUpdateProducerData, validatePassword } = require("../../utils/dataValidator");
const AppMessage = require('../../../../../config/AppMessage');

class DashboardBoard {
    constructor(findAllEventsByProducerIdUseCase, updateProducerDataUseCase, changeProducerPasswordUseCase) {
        this.findAllEventsByProducerIdUseCase = findAllEventsByProducerIdUseCase;
        this.updateProducerDataUseCase = updateProducerDataUseCase;
        this.changeProducerPasswordUseCase = changeProducerPasswordUseCase;
    }

    async render(request, response) {
        const events = await this.findAllEventsByProducerIdUseCase.execute(request.session.producer.id);
        const done = events.filter( event => new Date().getTime() > new Date(event.date).getTime());
        const pending = events.filter( event => new Date().getTime() < new Date(event.date).getTime());


        return response.render('producer/index', {
            title: 'Dashboard',
            menus: request.menus,
            producer: request.session.producer,
            eventsDashboard: {
                all: events.length,
                pending: pending.length,
                done: done.length
            },
            events
        })
    }

    async handlerUpdateProducerData(request, response) {
        const { name, email, id } = request.body;

        const message = validateUpdateProducerData(name, email);
        
        if (message) return new AppMessage(message, true);
    
        try {
            const producer = await this.updateProducerDataUseCase.execute({ name, email, id });
            delete producer.password;
            request.session.producer = producer;
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Dados actualizados com sucesso!", false);
    }

    async handlerUpdateProducerPassword(request, response) {
        const { password, id } = request.body;

        const message = validatePassword(password);
        
        if (message) return new AppMessage(message, true); 

        try {
            await this.changeProducerPasswordUseCase.execute({ password, id });
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Senha actualizada com sucesso!", false);
    }
}

module.exports = DashboardBoard;