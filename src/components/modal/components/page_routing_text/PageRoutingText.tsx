// RESOURCES
import classes from "./PageRoutingText.module.css"

interface Props {
    // LOOK
    text: string
    buttonText: string

    // ACTIONS
    onClick: () => void
}

export default function PageRoutingText({
    // LOOK
    text, buttonText,

    // ACTIONS
    onClick
}: Props) {
    return <div className={classes.wrapper}>
        {text + ","}
        <button onClick={() => onClick()} className={classes.button}>
            {buttonText}
        </button>
    </div>
}