const Producer = require('../../entity/producer');
const ProducerRepositoryInMemory = require('./ProducerRepositoryInMemory');

let producerRepositoryInMemory;

describe("Producer Repository In Memory", () => {
    beforeEach(() => {
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
    })

    it("should be able to create producer in memory", async () => {
        const producer = new Producer("Pro Events", "pro.events@gmail.com", "123456");
        const producerSaved = await producerRepositoryInMemory.create(producer);
        expect(producer).toEqual(producerSaved);
    })    

    it("should be able to find producer by email in memory", async () => {
        const producer = new Producer("Pro Events", "pro.events@gmail.com", "123456");
        await producerRepositoryInMemory.create(producer);
        const producerFetched = await producerRepositoryInMemory.findByEmail(producer.email);
        expect(producer).toEqual(producerFetched);
    }) 
})