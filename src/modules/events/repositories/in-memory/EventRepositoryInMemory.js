const IEventRepository = require('../IEventRepository');

class EventRepositoryInMemory extends IEventRepository {
    constructor() {
        super();
        this.events = [];
    }

    async findAll({ name, categoryId }) {
        if (name && categoryId) {
            return this.events.filter( event => event.name === name && event.categoryId === categoryId);
        } else if (name) {
            return this.events.filter( event => event.name === name);
        } else if (categoryId) {
            return this.events.filter( event => event.categoryId === categoryId);
        } else {
            return this.events;
        }
    }

    async findOneById(id) {
        return this.events.find( event => event.id === id);
    }

    async findAllByProducerId(producerId) {
        return this.events.filter(event => event.producerId === producerId);
    }

    async findByNameAndCategoryIdAndProducerId({ name, categoryId, producerId }) {
        return this.events.find( event => (event.name === name ) && (event.categoryId === categoryId) && (event.producerId === producerId)
        );
    }
    
    async create(event) {
        this.events.push(event);
        return event;
    }

    async update(event) {
        const index = this.events.findIndex(e => e.id === event.id);
        this.events.splice(index, 1);
        this.events.push(event);
        return event;
    }

    async updatePhoto({ photo, id }) {
        const index = this.events.findIndex(e => e.id === id);
        const event = this.events[index];
        event.photo = photo;
        this.events.splice(index, 1);
        this.events.push(event);
        return event;
    }
}

module.exports = EventRepositoryInMemory;