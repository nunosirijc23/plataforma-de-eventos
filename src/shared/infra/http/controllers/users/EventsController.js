const AppMessage = require("../../../../../config/AppMessage");
const { validateUpdateUserData, validatePassword } = require("../../utils/dataValidator");
const { verifyImage, deleteFile } = require("../../../../../config/FileUpload");

class EventsController {
    constructor (findAllEventsUseCase, findAllCategories, updateUserDataUseCase, updateUserPhotoUseCase, changeUserPasswordUseCase) {
        this.findAllEventsUseCase = findAllEventsUseCase;
        this.findAllCategories = findAllCategories;
        this.updateUserDataUseCase = updateUserDataUseCase;
        this.updateUserPhotoUseCase = updateUserPhotoUseCase;
        this.changeUserPasswordUseCase = changeUserPasswordUseCase;
    }

    async render(request, response) {
        const { name, categoryId } = request.query;

        const events = await this.findAllEventsUseCase.execute({ name, categoryId });
        const categories = await this.findAllCategories.execute();

        const eventsFiltersByDate = events.filter( event => new Date().getTime() < new Date(event.date).getTime());

        return response.render('user/index', {
            title: 'Eventos',
            isIndex: true,
            search: true,
            menus: request.menus,
            user: request.session.user,
            events: eventsFiltersByDate,
            categories
        });
    }

    async handlerUpdateUserData(request, response) {
        const { name, email, phone, id } = request.body;

        const message = validateUpdateUserData(name, email, phone);
        
        if (message) return new AppMessage(message, true);
        

        try {
            const user = await this.updateUserDataUseCase.execute({ name, email, phone, id });
            delete user.password;
            request.session.user = user;
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Dados actualizados com sucesso!", false);
    }

    async handlerUpdateUserPhoto(request, response) {
        const file = request.file;
        const { id } = request.body;

        try {
            await verifyImage(file);
            const user = await this.updateUserPhotoUseCase.execute({
                photo: file.filename,
                id
            });
            delete user.password;
            request.session.user = user;
        } catch (error) {
            if (file) await deleteFile(file.filename);
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Foto alterada com sucesso!", false);
    }

    async handlerUpdateUserPassword(request, response) {
        const { password, id } = request.body;

        const message = validatePassword(password);
        
        if (message) return new AppMessage(message, true); 

        try {
            await this.changeUserPasswordUseCase.execute({ password, id });
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Senha actualizada com sucesso!", false);
    }
}

module.exports = EventsController;