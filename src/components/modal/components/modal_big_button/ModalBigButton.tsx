// RESOURCES
import classes from "./ModalBigButton.module.css"

interface Props {
    // LOOK
    title: string

    // ACTIONS
    onClick: () => void
}

export default function ModalBigButton({
    // LOOK
    title,

    // ACTIONS
    onClick
}: Props) {
    return <button
        className={classes.wrapper}
        onClick={() => onClick()}
    >
        {title}
    </button>
}