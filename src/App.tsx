// COMPONENTS
import NavigationBar from "./components/navigation_bar/NavigationBar"
import AddSessionModal from "./components/modals/AddSessionModal"
import LogInModal from "./components/modals/LogInModal"
import Body from "./components/body/Body"

// REACT
import { useDebouncedCallback } from "use-debounce"
import { useState, useEffect } from "react"
import useStateRef from "react-usestateref"

// INTERFACES
import { Session, Size, SessionDict } from "./interfaces"

// MANAGERS
import FirebaseManager from "./managers/FirebaseManager"
import SignUpModal from "./components/modals/SignUpModal"
import Error from "./components/error/Error"
import ErrorManager from "./managers/ErrorManager"

export default function App() {
    // MODALS
    const [showingAddSessionModal, setShowingAddSessionModal] = useState(false)
    const [showingLogInModal, setShowingLogInModal] = useState(false)
    const [showingSignUpModal, setShowingSignUpModal] = useState(false)

    // WINDOW RESIZING SYSTEM
    const [windowSize, setWindowSize] = useState<Size>({ width: window.innerWidth, height: window.innerHeight })
    const resizeHandler = useDebouncedCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, 200)
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [resizeHandler])
    function smartphoneView(): boolean { return (windowSize.width / windowSize.height) < 0.7 }
    
    // SESSIONS
    const [sessions, setSessions, sessionsRef] = useStateRef<SessionDict>({})
    function todaySession(): Session | undefined { return sessions[buildDateString(new Date(selectedDateRef.current))] }
    
    // DATE MANAGEMENT SYSTEM
    const [selectedDate, setSelectedDate, selectedDateRef] = useStateRef(Date.now())
    function buildDateString(date: Date) { return `${date.getUTCMonth() + 1}-${date.getDate()}-${date.getUTCFullYear()}` }

    // ERROR SYSTEM
    const [showingError, setShowingError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const errorManager = new ErrorManager(setShowingError, setErrorMessage)

    // FIREBASE MANAGER
    const [loggedIn, setLoggedIn] = useState(false)
    const firebaseManager = new FirebaseManager(errorManager, setSessions, setLoggedIn)

    // PERSISTENCE
    useEffect(() => firebaseManager.setLogInPersistence(), [])

    return (
        <>
            <Error
                showed={showingError}
                setShowed={setShowingError}
                errorMessage={errorMessage}
            />
            <AddSessionModal
                smartphoneView={smartphoneView()}
                selectedDate={selectedDateRef.current}
                addSession={(session: Session, date: string) => firebaseManager.addSession(session, date)}
                buildDateString={buildDateString}
                showed={showingAddSessionModal}
                setShowed={setShowingAddSessionModal}
            />
            <LogInModal
                smartphoneView={smartphoneView()}
                showed={showingLogInModal}
                setShowed={setShowingLogInModal}
                logIn={(email: string, password: string) => firebaseManager.logIn(email, password)}
                setShowingSignUpModal={setShowingSignUpModal}
            />
            <SignUpModal
                smartphoneView={smartphoneView()}
                showed={showingSignUpModal}
                setShowed={setShowingSignUpModal}
                signUp={(email: string, password: string) => firebaseManager.signUp(email, password)}
                setShowingLogInModal={setShowingLogInModal}
            />
            <NavigationBar
                setShowingAddSessionModal={setShowingAddSessionModal}
                setShowingLogInModal={setShowingLogInModal}
                smartphoneView={smartphoneView()}
                selectedDate={selectedDateRef.current}
                setSelectedDate={setSelectedDate}
                windowSize={windowSize}
                loggedIn={loggedIn}
                logIn={(email: string, password: string) => firebaseManager.logIn(email, password)}
                logOut={() => firebaseManager.logOut()}
                signUp={(email: string, password: string) => firebaseManager.signUp(email, password)}
                user={firebaseManager.auth.currentUser}
            />
            <Body
                session={todaySession()}
                smartphoneView={smartphoneView()}
            />
        </>
    )
}