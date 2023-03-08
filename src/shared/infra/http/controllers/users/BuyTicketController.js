const AppMessage = require("../../../../../config/AppMessage");
const { verifyPDFFile, deleteFile } = require('../../../../../config/FileUpload');

class BuyTicketController {
    constructor(findOneEventByIdUseCase, buyTicketUseCase, findAllTicketsBoughtByEventIdUseCase) {
        this.findOneEventByIdUseCase = findOneEventByIdUseCase;
        this.buyTicketUseCase = buyTicketUseCase;
        this.findAllTicketsBoughtByEventIdUseCase = findAllTicketsBoughtByEventIdUseCase;
    }

    async render(request, response) {
        const { id } = request.params;
        
        const event = await this.findOneEventByIdUseCase.execute(id);
        const ticketsBought = await this.findAllTicketsBoughtByEventIdUseCase.execute(id);

        return response.render('user/buy-ticket', {
            title: 'Comprar bilhete',
            isIndex: false,
            search: false,
            user: request.session.user,            
            event,
            totalTicketBought: ticketsBought.length
        })
    }

    async handler(request, response) {
        const io = request.io;
        const { eventId, userId, payment } = request.body;
        const file = request.file;

        try {
            await verifyPDFFile(file);

            await this.buyTicketUseCase.execute({
                eventId,
                userId,
                payment,
                bankReceiptDirectory: file.filename
            });

            io.emit('buy-ticket', {
                eventId,
                userId
            });
        } catch (error) {
            await deleteFile(file.filename)
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Pedido de compra feito com sucesso!", false);
    }
}

module.exports = BuyTicketController;