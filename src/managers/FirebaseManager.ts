// FIREBASE
import { initializeApp, FirebaseOptions } from "firebase/app"
import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, browserLocalPersistence, Unsubscribe } from "firebase/auth"
import { child, Database, get, getDatabase, ref, set, onValue } from "firebase/database"
import { Session } from "../interfaces"

// INTERFACES
import { SessionDict } from "../interfaces"

// MANAGERS
import ErrorManager from "./ErrorManager"

export default class FirebaseManager {

    // PROPERTIES
    auth: Auth
    database: Database
    private errorManager: ErrorManager
    private setSessions: React.Dispatch<React.SetStateAction<SessionDict>>
    private setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    private disableSessionsChangeListener?: Unsubscribe

    // CONSTRUCTOR
    constructor(errorManager: ErrorManager, setSessions: React.Dispatch<React.SetStateAction<SessionDict>>, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) {
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
        
        this.database = getDatabase(app)
        this.auth = getAuth(app)
        this.errorManager = errorManager
        this.setSessions = setSessions
        this.setLoggedIn = setLoggedIn
    }

    // GET SESSIONS
    fetchSessions() {
        return get(ref(this.database, `users/${this.auth.currentUser!.uid}/sessions`))
    }

    // PERSISTENCE
    setLogInPersistence() {
        this.auth.setPersistence(browserLocalPersistence)
            .then(() => {
                this.auth.onAuthStateChanged((user) => {
                    if (user !== null) {
                        this.enableSessionsChangeListener()
                        this.setLoggedIn(true)

                        let sessions: SessionDict = {}
                        this.fetchSessions()
                            .then((snapshot) => {
                                if (snapshot.exists()) sessions = snapshot.val() as SessionDict
                                
                                this.setSessions(sessions)
                            })
                            .catch((error) => this.errorManager.addError(error.code))
                    } else {
                        if (this.disableSessionsChangeListener !== undefined) {
                            this.disableSessionsChangeListener()
                        }
                    }
                }, (error) => this.errorManager.addError(error.stack ?? error.message))
            })
            .catch((error) => this.errorManager.addError(error.code))
    }

    // ADD SESSION
    addSession(session: Session, date: string) {
        let sessions: SessionDict = {}

        this.fetchSessions()
            .then((snapshot) => {
                if (snapshot.exists()) sessions = snapshot.val() as SessionDict
                sessions[date] = session

                set(ref(this.database, `users/${this.auth.currentUser!.uid}`), {
                    sessions: sessions
                })
            })
            .catch((error) => this.errorManager.addError(error.code))
    }

    // SESSIONS CHANGE
    private enableSessionsChangeListener() {
        if (this.auth.currentUser !== null) {
            this.disableSessionsChangeListener = onValue(child(ref(this.database, `users/${this.auth.currentUser!.uid}`), "sessions"), (snapshot) => {
                if (snapshot.exists()) {
                    this.setSessions(snapshot.val() as SessionDict | {} as SessionDict)
                }
            });
        }
    }

    // LOG IN
    logIn(email: string, password: string) {
        signInWithEmailAndPassword(this.auth, email, password)
            .catch((error) => this.errorManager.addError(error.code))
    }

    // LOG OUT
    logOut() {
        this.auth.signOut()
            .then(() => {
                this.setLoggedIn(false)
            })
            .catch((error) => this.errorManager.addError(error.code))
    }

    // SIGN UP
    signUp(email: string, password: string, ) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .catch((error) => this.errorManager.addError(error.code))
    }
}