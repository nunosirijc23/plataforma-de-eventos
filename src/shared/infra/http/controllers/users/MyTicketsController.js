class MyTicketsController {
    constructor(findAllTicketsByUserIdUseCase) {
        this.findAllTicketsByUserIdUseCase = findAllTicketsByUserIdUseCase;
    }

    async render(request, response) {
        const tickets = await this.findAllTicketsByUserIdUseCase.execute(request.session.user.id);

        console.log(tickets);

        response.render('user/my-tickets', {
            title: 'Meus bilhetes',
            isIndex: false,
            search: false,
            menus: request.menus,
            user: request.session.user,
            tickets
        });
    }
}

module.exports = MyTicketsController;