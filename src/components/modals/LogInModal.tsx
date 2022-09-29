// REACT
import useStateRef from "react-usestateref"

// COMPONENTS
import TextInput from "../modal/components/modal_text_input/TextInput"
import Modal from "../modal/Modal"
import ModalBigButton from "../modal/components/modal_big_button/ModalBigButton"

interface Props {
    // WINDOW RESIZING SYSTEM
    smartphoneView: boolean

    // SHOWING MODAL SYSTEM
    showed: boolean
    setShowed: React.Dispatch<React.SetStateAction<boolean>>

    // AUTH MANAGEMENT SYSTEM
    logIn: (email: string, password: string) => void
}

export default function AddSessionModal({
    // WINDOW RESIZING SYSTEM
    smartphoneView,

    // SHOWING MODAL SYSTEM
    showed, setShowed,

    // AUTH MANAGEMENT SYSTEM
    logIn
}: Props) {
    // TEXT INPUT MANAGEMENT
    const [email, setEmail, emailRef] = useStateRef<string>("")
    const [password, setPassword, passwordRef] = useStateRef<string>("")

    return (
        <Modal
            smartphoneView={smartphoneView}
            resetValues={() => {
                setEmail("")
                setPassword("")
            }}
            title="Log In"
            showed={showed}
            setShowed={setShowed}
        >
            <TextInput
                title="Email Address"
                text={email}
                setText={setEmail}
                textRef={emailRef.current}
            />
            <TextInput
                title="Password"
                text={password}
                setText={setPassword}
                textRef={passwordRef.current}
                type="password"
            />
            <ModalBigButton
                title="Add"
                onClick={() => {
                    setShowed(false)
                    logIn(emailRef.current, passwordRef.current)
                }}
            />
        </Modal>
    )
}