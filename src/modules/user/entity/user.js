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
        this.create_at = new Date()
    }
}

module.exports = User;