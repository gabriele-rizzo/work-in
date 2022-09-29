// INTERFACES
import { Session } from "../../../../interfaces"

// RESOURCES
import classes from "./SessionContainer.module.css"

interface Props {
    // SESSIONS MANAGEMENT SYSTEM
    session: Session | undefined

    // WINDOW RESIZING SYSTEM
    smartphoneView: boolean
}

export default function SessionContainer({
    // SESSIONS MANAGEMENT SYSTEM
    session,

    // WINDOW RESIZING SYSTEM
    smartphoneView
}: Props) {
    return <div
        className={classes.wrapper}
        style={{
            height: smartphoneView ? "calc(100vh - 130px)" : "calc((100vh - 132px) * 0.92)",
            width: smartphoneView ? "100vw" : "calc(100vw - ((100vh - 130px) * 0.08))",
            margin: smartphoneView ? 0 : "calc(((100vh - 132px) * 0.04) - 1px)",
            borderRadius: smartphoneView ? 0 : 15,
            border: smartphoneView ? "none" : "1px solid rgb(40, 40, 43)"
        }}
    >
        {session ? session.name : "No session"}
    </div>
}