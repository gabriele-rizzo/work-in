import { IoAlertCircle } from "react-icons/io5"
import classes from "./Error.module.css"

interface Props {
    // WINDOW MANAGEMENT SYSTEM
    showed: boolean
    setShowed: React.Dispatch<React.SetStateAction<boolean>>

    // LOOK
    errorMessage: string
}

export default function Error({
    // WINDOW MANAGEMENT SYSTEM
    showed, setShowed,

    // LOOK
    errorMessage
}: Props) {
    return <div
        className={classes.wrapper}
        style={{
            display: showed ? "flex" : "none"
        }}
    >
        <IoAlertCircle
            color="rgba(22, 22, 23)"
            size={35}
            style={{
                paddingLeft: 5
            }}
        />
        <p className={classes.text}>
            {errorMessage !== "" ? errorMessage.split("/")[1].replaceAll("-", " ") : ""}
        </p>
    </div>
}