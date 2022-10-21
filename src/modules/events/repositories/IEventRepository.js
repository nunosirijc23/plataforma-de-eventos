class IEventRepository {
    findByNameAndCategoryIdAndProducerId({ name, categoryId, producerId }) {}
    create(event) {}
    findAll({ name, categoryId }) {}
    findAllByProducerId(producerId) {}
}

module.exports = IEventRepository;