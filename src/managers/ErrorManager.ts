export default class ErrorManager {

    private setShowingError: React.Dispatch<React.SetStateAction<boolean>>
    private setErrorMessage: React.Dispatch<React.SetStateAction<string>>

    constructor(setShowingError: React.Dispatch<React.SetStateAction<boolean>>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) {
        this.setShowingError = setShowingError
        this.setErrorMessage = setErrorMessage
    }

    addError(message: string) {
        this.setErrorMessage(message)
        this.setShowingError(true)
        setTimeout(() => this.setShowingError(false), 3000)
    }
}