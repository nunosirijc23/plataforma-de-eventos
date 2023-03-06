const AppMessage = require('../../../../../config/AppMessage');

class ValidateTicketController {
    constructor(approveTicketUseCase) {
        this.approveTicketUseCase = approveTicketUseCase;
    }
    
    async handler(request, response) {
        const { id, isApproved } = request.body;

        try {
            await this.approveTicketUseCase.execute({ id, isApproved });
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Operação feita com sucesso!", false);
    }
}

module.exports = ValidateTicketController;