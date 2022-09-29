// INTERFACES
import { Session } from "../../interfaces"

// COMPONENTS
import SessionContainer from "./components/session_container/SessionContainer"

interface Props {
    // SESSIONS MANAGEMENT SYSTEM
    session: Session | undefined

    // WINDOW RESIZING SYSTEM
    smartphoneView: boolean
}

export default function Body({
    // SESSIONS MANAGEMENT SYSTEM
    session,

    // WINDOW RESIZING SYSTEM
    smartphoneView
}: Props) {
    return <SessionContainer
        session={session}
        smartphoneView={smartphoneView}
    />
}