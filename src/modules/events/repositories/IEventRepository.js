class IEventRepository {
    findByNameAndCategoryIdAndProducerId({ name, categoryId, producerId }) {}
    create(event) {}
    findAll({ name, categoryId }) {}
    findOneById(id) {}
    findAllByProducerId(producerId) {}
}

module.exports = IEventRepository;