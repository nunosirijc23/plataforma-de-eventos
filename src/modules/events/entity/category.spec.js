const { v4: uuidV4 } = require('uuid');

const Category = require('./category'); 

describe("Category Entity", () => {
    it("should be able to create a new category", () => {
        const category = new Category("Festa");
        expect(category.id).not.toBeUndefined();
    });

    it("should be able to set values to category", () => {
        const category = new Category();
        const oldId = category.id;
        category.setValues(uuidV4(), "Palestra", new Date());
        expect(category.id).not.toEqual(oldId);
    })
})