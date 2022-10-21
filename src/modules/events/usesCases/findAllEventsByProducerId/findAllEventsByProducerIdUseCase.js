class FindAllEventsByProducerId {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(producerId) {
        const events = await this.eventRepository.findAllByProducerId(producerId);
        return events;
    }
}

module.exports = FindAllEventsByProducerId;