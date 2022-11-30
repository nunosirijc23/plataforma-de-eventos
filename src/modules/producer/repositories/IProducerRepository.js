class IProducerRepository {
    create(producer) {}
    findById(id) {}
    findByEmail(email) {}
    updateProducerData(producer) {}
    updatePassword({ password, id }) {}
}

module.exports = IProducerRepository;