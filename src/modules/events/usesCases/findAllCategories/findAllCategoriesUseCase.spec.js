const CategoryRepositoryInMemory = require('../../repositories/in-memory/CategoryRepositoryInMemory');
const FindAllCategoriesUseCase = require('./findAllCategoriesUseCase');
const Category = require('../../entity/category');

let categoryRepositoryInMemory;
let findAllCategoriesUseCase;

describe("Find All Categories Use Case", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoryRepositoryInMemory);
    })

    it("should be able to find all categories", async () => {
        const category1 = new Category("Festa");
        const category2 = new Category("Palestra");
        await categoryRepositoryInMemory.create(category1);
        await categoryRepositoryInMemory.create(category2);
        const categories = await findAllCategoriesUseCase.execute();
        expect(categories).toEqual([category1, category2]);
    })
})