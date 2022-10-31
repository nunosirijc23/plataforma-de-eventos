class BuyTicketController {
    constructor(findOneEventByIdUseCase) {
        this.findOneEventByIdUseCase = findOneEventByIdUseCase;
    }

    async render(request, response) {
        const { id } = request.params;
        
        const event = await this.findOneEventByIdUseCase.execute(id);

        return response.render('user/buy-ticket', {
            title: 'Comprar bilhete',
            search: false,
            user: request.session.user,            
            event
        })
    }
}

module.exports = BuyTicketController;