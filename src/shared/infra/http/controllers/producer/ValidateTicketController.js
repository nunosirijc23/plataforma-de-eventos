const AppMessage = require('../../../../../config/AppMessage');

class ValidateTicketController {
    constructor(approveTicketUseCase, findOneTicketByIdUseCase) {
        this.approveTicketUseCase = approveTicketUseCase;
        this.findOneTicketByIdUseCase = findOneTicketByIdUseCase;
    }
    
    async handler(request, response) {
        const io = request.io;
        const { id, isApproved } = request.body;

        try {
            await this.approveTicketUseCase.execute({ id, isApproved });
            const ticket = await this.findOneTicketByIdUseCase.execute(id);

            io.emit('validate-ticket', {
                ticket,
                approved: (isApproved) ? 'Aprovado' : "Rejeitado",
            });
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Operação feita com sucesso!", false);
    }
}

module.exports = ValidateTicketController;