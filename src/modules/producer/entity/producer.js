const { v4: uuidV4 } = require("uuid");

class Producer {
    constructor(name, email, password) {
        if (!this.id) {
            this.id = uuidV4();
        }
        this.name = name;
        this.email = email;
        this.password = password;
        this.createAt = new Date();
    }

    setValues(id, name, email, password, createAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createAt = createAt;
    }
}

module.exports = Producer;