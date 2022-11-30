const AppMessage = require("../../../../../config/AppMessage");

class BuyTicketController {
    constructor(findOneEventByIdUseCase, buyTicketUseCase, findAllTicketsByEventIdUseCase) {
        this.findOneEventByIdUseCase = findOneEventByIdUseCase;
        this.buyTicketUseCase = buyTicketUseCase;
        this.findAllTicketsByEventIdUseCase = findAllTicketsByEventIdUseCase;
    }

    async render(request, response) {
        const { id } = request.params;
        
        const event = await this.findOneEventByIdUseCase.execute(id);
        const tickets = await this.findAllTicketsByEventIdUseCase.execute(id);

        return response.render('user/buy-ticket', {
            title: 'Comprar bilhete',
            search: false,
            user: request.session.user,            
            event,
            totalTicketBought: tickets.length
        })
    }

    async handler(request, response) {
        const { eventId, userId, payment } = request.body;

        try {
            await this.buyTicketUseCase.execute({
                eventId,
                userId,
                payment
            });
        } catch (error) {
            console.log(error);
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Bilhete comprado!", false);
    }
}

module.exports = BuyTicketController;