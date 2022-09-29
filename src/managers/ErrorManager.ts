class ErrorManager {

    private message: string | undefined

    constructor() {
    }

    addError(message: string) {
        this.message = message
        alert(message)
    }
}

export default ErrorManager