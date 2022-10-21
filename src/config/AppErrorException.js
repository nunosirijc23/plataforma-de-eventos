class AppErrorException extends Error {
    constructor(message) {
        super(message);
        this.isKnownError = true
    }
}

module.exports = AppErrorException;