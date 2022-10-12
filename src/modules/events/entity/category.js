const { v4: uuidV4 } = require('uuid');

class Category {
    constructor(name) {
        if (!this.id) {
            this.id = uuidV4()
        }
        this.name = name;
        this.createAt = new Date()
    }

    setValues(id, name, createAt) {
        this.id = id;
        this.name = name;
        this.createAt = createAt;
    }
}

module.exports = Category;