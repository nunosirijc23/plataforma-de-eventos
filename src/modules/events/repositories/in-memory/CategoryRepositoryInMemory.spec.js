const CategoryRepositoryInMemory = require('./CategoryRepositoryInMemory');
const Category = require('../../entity/category');

let categoryRepositoryInMemory;

describe("Category Repository In Memory", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    })

    it("should be able to save a new category in memory", async () => {
        const category = new Category("Festa");
        await categoryRepositoryInMemory.create(category);
        expect(categoryRepositoryInMemory.categories[0]).toEqual(category);
    })

    it("should be able to find all categories in memory", async () => {
        const category1 = new Category("Festa");
        const category2 = new Category("Palestra");
        await categoryRepositoryInMemory.create(category1);
        await categoryRepositoryInMemory.create(category2);
        expect(categoryRepositoryInMemory.categories).toEqual([category1, category2]);
    })
})