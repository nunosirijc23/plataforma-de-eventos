const Event = require('../../entity/event');

class UpdateEventUseCase {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute({ id, name, date, startTime, endTime, price, capacity, province, county, district, street, description, categoryId}) {
        const eventFetched = await this.eventRepository.findOneById(id);
        const event = new Event();
        event.setValues(
            eventFetched.id,
            name,
            date,
            startTime,
            endTime,
            price,
            capacity,
            province,
            county,
            district,
            street,
            description,
            categoryId,
            eventFetched.producerId,
            eventFetched.createdAt
        );
        const eventUpdated = await this.eventRepository.update(event);
        return eventUpdated;
    }
}

module.exports = UpdateEventUseCase;