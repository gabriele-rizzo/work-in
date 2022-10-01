// REACT
import { useEffect } from "react"

// RESOURCES
import classes from "./TextInput.module.css"

interface Props {
    // LOOK
    title: string
    text: string
    type?: string

    // ACTIONS
    onChange?: (text: string) => void

    // STATE MANAGEMENT SYSTEM
    setText: React.Dispatch<React.SetStateAction<string>>
    textRef: string
}

export default function TextInput({
    // LOOK
    title, text, type,

    // ACTIONS
    onChange,

    // STATE MANAGEMENT SYSTEM
    setText, textRef
}: Props) {
    // HANDLE TEXT CHANGE
    useEffect(() => {
        if (onChange !== undefined) onChange(textRef)
        setText(textRef)
    }, [text])

    // CAPITALIZE FIRST LETTER
    const capitalizeAndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value
        setText(text.charAt(0).toUpperCase() + text.slice(1))
    }

    return <input
        className={classes.wrapper}
        onChange={(event) => capitalizeAndChange(event)}
        placeholder={title}
        value={text}
        type={type !== undefined ? type : "text" }
        style={{
            inputSecurity: "none"
        }}
    />
}