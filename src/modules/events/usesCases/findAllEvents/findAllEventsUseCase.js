
class FindAllEventsUseCase {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute({ name, categoryId }) {
        const events = await this.eventRepository.findAll({ name, categoryId });
        return events;
    }
}

module.exports = FindAllEventsUseCase;