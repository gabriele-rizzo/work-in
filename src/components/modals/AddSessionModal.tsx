// INTERFACES
import { Session } from "../../interfaces"

// REACT
import useStateRef from "react-usestateref"

// COMPONENTS
import TextInput from "../modal/components/modal_text_input/TextInput"
import Modal from "../modal/Modal"
import ModalBigButton from "../modal/components/modal_big_button/ModalBigButton"

interface Props {
    // WINDOW RESIZING SYSTEM
    smartphoneView: boolean

    // DATE MANAGEMENT SYSTEM
    selectedDate: number
    buildDateString: (date: Date) => string
    
    // SESSIONS MANAGEMENT SYSTEM
    addSession: (session: Session, date: string) => void

    // SHOWING MODAL SYSTEM
    showed: boolean
    setShowed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSessionModal({
    // WINDOW RESIZING SYSTEM
    smartphoneView,

    // DATE MANAGEMENT SYSTEM
    selectedDate, buildDateString,
    
    // SESSIONS MANAGEMENT SYSTEM
    addSession,

    // SHOWING MODAL SYSTEM
    showed, setShowed
}: Props) {
    // TEXT INPUT MANAGEMENT
    const [text, setText, textRef] = useStateRef<string>("")
    
    // CREATED SESSION MANAGEMENT
    const [session, setSession, sessionRef] = useStateRef<Session>({
        name: textRef.current,
        date: new Date(selectedDate),
        excercises: []
    })

    return (
        <Modal
            smartphoneView={smartphoneView}
            resetValues={() => {
                setText("")
                setSession({
                    name: textRef.current,
                    date: new Date(selectedDate),
                    excercises: []
                })
            }}
            title="Add Session"
            showed={showed}
            setShowed={setShowed}
        >
            <TextInput
                title="Session name"
                onChange={(text) => setSession({
                    ...session, name: text
                })}
                text={text}
                setText={setText}
                textRef={textRef.current}
            />
            <ModalBigButton
                title="Add"
                onClick={() => {
                    setShowed(false)
                    addSession(sessionRef.current, buildDateString(new Date(selectedDate)))
                }}
            />
        </Modal>
    )
}