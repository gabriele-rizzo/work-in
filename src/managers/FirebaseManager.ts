// FIREBASE
import { initializeApp, FirebaseOptions } from "firebase/app"
import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

// MANAGERS
import ErrorManager from "./ErrorManager"

class FirebaseManager {

    auth: Auth
    private errorManager: ErrorManager

    constructor() {
        const options: FirebaseOptions = {
            apiKey: "AIzaSyBtmiss84rOC6z7JKHa8qOkTJETudAg04A",
            authDomain: "work-in-76293.firebaseapp.com",
            projectId: "work-in-76293",
            storageBucket: "work-in-76293.appspot.com",
            messagingSenderId: "987318648342",
            appId: "1:987318648342:web:c2fb4a5370f010dac87f37",
            measurementId: "G-DS0RMRB8RS"
        }
        const app = initializeApp(options)

        this.auth = getAuth(app)
        this.errorManager = new ErrorManager()
    }

    private createUserDatabaseSection() {
        
    }

    logIn(email: string, password: string, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) {
        signInWithEmailAndPassword(this.auth, email, password)
            .then(() => {
                setLoggedIn(true)
            })
            .catch((error) => this.errorManager.addError(error.code))
    }

    logOut(setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) {
        this.auth.signOut()
            .then(() => {
                setLoggedIn(false)
            })
            .catch((error) => this.errorManager.addError(error.code))
    }

    signUp(email: string, password: string, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then(() => {
                setLoggedIn(true)
                this.createUserDatabaseSection()
            })
            .catch((error) => this.errorManager.addError(error.code))
    }
}

export default FirebaseManager