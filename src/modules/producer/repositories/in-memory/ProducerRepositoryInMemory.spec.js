const Producer = require('../../entity/producer');
const ProducerRepositoryInMemory = require('./ProducerRepositoryInMemory');

let producerRepositoryInMemory;

describe("Producer Repository In Memory", () => {
    beforeEach(() => {
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
    })

    it("should be able to save a new producer in memory", async () => {
        const producer = new Producer("Pro Events", "pro.events@gmail.com", "123456");
        const producerSaved = await producerRepositoryInMemory.create(producer);
        expect(producer).toEqual(producerSaved);
    })    

    it("should be able to find producer by id in memory", async () => {
        const producer = new Producer("Pro Events", "pro.events@gmail.com", "123456");
        await producerRepositoryInMemory.create(producer);
        const producerFetched = await producerRepositoryInMemory.findById(producer.id);
        expect(producer).toEqual(producerFetched);
    }) 

    it("should be able to find producer by email in memory", async () => {
        const producer = new Producer("Pro Events", "pro.events@gmail.com", "123456");
        await producerRepositoryInMemory.create(producer);
        const producerFetched = await producerRepositoryInMemory.findByEmail(producer.email);
        expect(producer).toEqual(producerFetched);
    }) 
    
    it("should be able to update producer data in memory", async () => {
        const producer = new Producer("Pro Events", "pro.events@gmail.com", "123456");
        await producerRepositoryInMemory.create(producer);
        const producerToUpdate = new Producer();
        producerToUpdate.id = producer.id;
        producerToUpdate.name = "New Name";
        producerToUpdate.email = "newemail@gmail.com";
        const producerFetched = await producerRepositoryInMemory.updateProducerData({
            name: producerToUpdate.name,
            email: producerToUpdate.email,
            id: producerToUpdate.id
        });
        expect(producerFetched.id).toEqual(producer.id);
    }) 

    it("should be able to update producer password in memory", async () => {
        const producer = new Producer("Pro Events", "pro.events@gmail.com", "123456");
        await producerRepositoryInMemory.create(producer);
        const oldPassword = producer.password;
        const producerFetched = await producerRepositoryInMemory.updatePassword({
            password: "newPassword",
            id: producer.id
        });
        expect(producerFetched.password).not.toEqual(oldPassword);
    }) 
})