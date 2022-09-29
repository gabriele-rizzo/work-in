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
import { Session, Size } from "./interfaces"

// MANAGERS
import FirebaseManager from "./managers/FirebaseManager"

type SessionDict = { [date: string]: Session }

export default function App() {
    // MODALS
    const [showingAddSessionModal, setShowingAddSessionModal] = useState(false)
    const [showingLogInModal, setShowingLogInModal] = useState(false)

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
    function addSession(session: Session, date: string): void {
        let sessionsTemp = sessionsRef.current
        sessionsTemp[date] = session
        setSessions(sessionsTemp)
    }
    function todaySession(): Session | undefined { return sessions[buildDateString(new Date(selectedDateRef.current))] }
    
    // DATE MANAGEMENT SYSTEM
    const [selectedDate, setSelectedDate, selectedDateRef] = useStateRef(Date.now())
    function buildDateString(date: Date) { return `${date.getUTCMonth() + 1}/${date.getDate()}/${date.getUTCFullYear()}` }

    // FIREBASE MANAGER
    const firebaseManager = new FirebaseManager()
    const [loggedIn, setLoggedIn] = useState(firebaseManager.auth.currentUser !== null)

    // AUTH MANAGEMENT SYSTEM
    function logIn(email: string, password: string) { firebaseManager.logIn(email, password, setLoggedIn) }
    function logOut() { firebaseManager.logOut(setLoggedIn) }
    function signUp(email: string, password: string) { firebaseManager.signUp(email, password, setLoggedIn) }

    return (
        <>
            <AddSessionModal
                smartphoneView={smartphoneView()}
                selectedDate={selectedDateRef.current}
                addSession={addSession}
                buildDateString={buildDateString}
                showed={showingAddSessionModal}
                setShowed={setShowingAddSessionModal}
            />
            <LogInModal
                smartphoneView={smartphoneView()}
                showed={showingLogInModal}
                setShowed={setShowingLogInModal}
                logIn={logIn}
            />
            <NavigationBar
                setShowingAddSessionModal={setShowingAddSessionModal}
                setShowingLogInModal={setShowingLogInModal}
                smartphoneView={smartphoneView()}
                selectedDate={selectedDateRef.current}
                setSelectedDate={setSelectedDate}
                windowSize={windowSize}
                loggedIn={loggedIn}
                logIn={logIn}
                logOut={logOut}
                signUp={signUp}
                user={firebaseManager.auth.currentUser}
            />
            <Body
                session={todaySession()}
                smartphoneView={smartphoneView()}
            />
        </>
    )
}