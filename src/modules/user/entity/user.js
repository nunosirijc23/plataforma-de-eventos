const { v4: uuidV4 } = require('uuid')

class User {
    constructor(name, email, phone, password) {
        if (!this.id) {
            this.id = uuidV4();
        }
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.photo = 'default.png'
        this.password = password;
        this.createAt = new Date()
    }

    setValues(id, name, email, phone, photo, password, createAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.photo = photo
        this.password = password;
        this.createAt = createAt
    }
}

module.exports = User;