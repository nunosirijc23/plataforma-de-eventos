class FindOneEventByIdUseCase {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(id) {
        const event = await this.eventRepository.findOneById(id);
        return event;
    }
}

module.exports = FindOneEventByIdUseCase;