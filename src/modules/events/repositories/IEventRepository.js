class IEventRepository {
    findByNameAndCategoryIdAndProducerId({ name, categoryId, producerId }) {}
    create(event) {}
    findAll({ name, categoryId }) {}
    findOneById(id) {}
    findAllByProducerId(producerId) {}
    update(event) {}
    updatePhoto({ photo, id}) {}
}

module.exports = IEventRepository;