const { deleteFile } = require("../../../../config/FileUpload");

class UpdateEventPhotoUseCase {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute({ photo, eventId }) {
        const event = await this.eventRepository.findOneById(eventId);
        await deleteFile(event.photo);
        const eventUpdated = await this.eventRepository.updatePhoto({ 
            photo, 
            id: eventId 
        });
        return eventUpdated;
    }
}

module.exports = UpdateEventPhotoUseCase;