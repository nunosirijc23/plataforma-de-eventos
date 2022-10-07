class AppMessage {
    constructor(message, isError) {
        this.message = message;
        this.isError = isError;
    }
}

module.exports = AppMessage;