// RESOURCES
import classes from "./NavigationBar.module.css"
import logo from "../../assets/logo.png"

// COMPONENTS
import Separator from "./components/separator/Separator"
import CalendarSlider from "./components/calendar_slider/CalendarSlider"
import NavigationBarItem from "./components/navigation_bar_item/NavigationBarItem"
import { IoAddCircle, IoPersonAdd, IoPersonRemove } from "react-icons/io5"

// INTERFACES
import { Size } from "../../interfaces"

// FIREBASE
import { User } from "firebase/auth"

interface Props {
    // WINDOW RESIZING SYSTEM
    smartphoneView: boolean
    windowSize: Size

    // DATE MANAGEMENT SYSTEM
    selectedDate: number
    setSelectedDate: (date: number) => void

    // AUTH MANAGEMENT SYSTEM
    loggedIn: boolean
    logIn: (email: string, password: string) => void
    logOut: () => void
    signUp: (email: string, password: string) => void
    user: User | null

    // MODALS
    setShowingAddSessionModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowingLogInModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavigationBar({
    // WINDOW RESIZING SYSTEM
    smartphoneView, windowSize,

    // DATE MANAGEMENT SYSTEM
    selectedDate, setSelectedDate,

    // AUTH MANAGEMENT SYSTEM
    loggedIn, logIn, logOut, signUp, user,

    // MODALS
    setShowingAddSessionModal, setShowingLogInModal
}: Props) {
    return (
        <div className={classes.wrapper}>
            <div
                className={classes.main}
            >
                <div className={classes.logoWrapper}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <h1 className={classes.title}>Work-in</h1>
                </div>
                <div className={classes.itemsWrapper}>
                    <NavigationBarItem
                        icon={
                            loggedIn
                                ? <IoPersonRemove
                                    color="#80ff72"
                                    lightingColor="red"
                                    size={smartphoneView ? 30 : 23}
                                />
                                : <IoPersonAdd
                                    color="#80ff72"
                                    lightingColor="red"
                                    size={smartphoneView ? 30 : 23}
                                />
                        }
                        onClick={() => {
                            if (loggedIn) logOut()
                            else setShowingLogInModal(true)
                        }}
                        label={
                            loggedIn
                                ? user !== null
                                    ? user.displayName !== null
                                        ? user.displayName
                                        : "Log Out"
                                    : "Log In"
                                : "Log In"
                        }
                        smartphoneView={smartphoneView}
                    />
                    <NavigationBarItem
                        icon={<IoAddCircle
                            color="#80ff72"
                            size={smartphoneView ? 30 : 23}
                        />}
                        onClick={() => setShowingAddSessionModal(true)}
                        label="Add Session"
                        smartphoneView={smartphoneView}
                        disabled={!loggedIn}
                    />
                </div>
            </div>
            <Separator />
            <CalendarSlider
                windowSize={windowSize}
                smartphoneView={smartphoneView}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
        </div>
    )
}