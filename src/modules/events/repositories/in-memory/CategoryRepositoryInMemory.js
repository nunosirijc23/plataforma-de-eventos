const ICategoryRepository = require("../ICategoryRepository");

class CategoryRepositoryInMemory extends ICategoryRepository {
    constructor() {
        super();
        this.categories = [];
    }

    async create(category) {
        this.categories.push(category);
        return category;
    }

    async findAll() {
        return this.categories;
    }
}

module.exports = CategoryRepositoryInMemory;