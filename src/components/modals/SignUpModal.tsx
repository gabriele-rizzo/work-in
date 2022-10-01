// REACT
import useStateRef from "react-usestateref"

// COMPONENTS
import TextInput from "../modal/components/modal_text_input/TextInput"
import Modal from "../modal/Modal"
import ModalBigButton from "../modal/components/modal_big_button/ModalBigButton"
import PageRoutingText from "../modal/components/page_routing_text/PageRoutingText"

interface Props {
    // WINDOW RESIZING SYSTEM
    smartphoneView: boolean

    // SHOWING MODAL SYSTEM
    showed: boolean
    setShowed: React.Dispatch<React.SetStateAction<boolean>>
    setShowingLogInModal: React.Dispatch<React.SetStateAction<boolean>>

    // AUTH MANAGEMENT SYSTEM
    signUp: (email: string, password: string) => void
}

export default function SignUpModal({
    // WINDOW RESIZING SYSTEM
    smartphoneView,

    // SHOWING MODAL SYSTEM
    showed, setShowed, setShowingLogInModal,

    // AUTH MANAGEMENT SYSTEM
    signUp
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
            title="Sign Up"
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
                title="Sign Up"
                onClick={() => {
                    setShowed(false)
                    signUp(emailRef.current, passwordRef.current)
                }}
            />
            <PageRoutingText
                text="If you already have an account"
                buttonText="Log In"
                onClick={() => {
                    setShowed(false)
                    setShowingLogInModal(true)
                }}
            />
        </Modal>
    )
}