const ICategoryRepository = require("../../../repositories/ICategoryRepository");
const Category = require('../model/category');

class CategoryRepository extends ICategoryRepository {
    constructor() {
        super();
        this.repository = Category;
    }

    async create(category) {
        const categorySaved = await this.repository.create({
            id: category.id,
            name: category.name,
            createAt: category.createAt
        });

        return categorySaved.save();
    }

    async findAll() {
        return await this.repository.findAll();
    }
}

module.exports = CategoryRepository;