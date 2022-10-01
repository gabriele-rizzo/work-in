// RESOURCES
import classes from "./Modal.module.css"

// REACT
import { useEffect, useCallback, useState } from "react"

// COMPONENTS
import { IoClose } from "react-icons/io5"

interface Props {
    // WINDOW RESIZING SYSTEM
    smartphoneView: boolean

    // RESETTING VALUES SYSTEM
    resetValues: () => void

    // LOOK
    title: string

    // SHOWING MODAL SYSTEM
    showed: boolean
    setShowed: React.Dispatch<React.SetStateAction<boolean>>

    // REACT
    children?: React.ReactNode
}

export default function Modal({
    // WINDOW RESIZING SYSTEM
    smartphoneView,

    // RESETTING VALUES SYSTEM
    resetValues,

    // LOOK
    title,

    // SHOWING MODAL SYSTEM
    showed, setShowed,

    // REACT
    children
}: Props) {
    // TITLE BAR HEIGHT STATE
    const [titleBarHeight, setTitleBarHeight] = useState(getTitleBarHeight())

    // HANDLE SHOWING TOGGLING
    useEffect(() => resetValues(), [showed])

    // GET TITLE BAR HEIGHT
    function getTitleBarHeight(): number {
        if (!smartphoneView) {
            let modalIndex = title === "Add Session" ? 0 : title === "Log In" ? 1 : 2
            let titleBar = document.getElementsByClassName(classes.actions)[modalIndex]
               
            if (titleBar !== undefined && titleBar !== null) {
                return (titleBar.clientHeight | titleBar.scrollHeight) + 1
            } else {
                return 0
            }
        } else {
            return 0
        }
    }

    // TITLE BAR SIZE HANDLING
    useEffect(() => setTitleBarHeight(getTitleBarHeight()), [showed])

    return (
        <div
            className={classes.background}
            style={{
                display: showed ? "flex" : "none"
            }}
        >
            <div
                className={classes.wrapper}
                style={{
                    width: smartphoneView ? "100%" : "calc(100vw * 0.4)",
                    height: smartphoneView ? "100%" : "calc(100vh * 0.7)",
                    borderRadius: smartphoneView ? 0 : 15
                }}
            >
                <div
                    className={classes.actions}
                >
                    <h1 className={classes.title}>{title}</h1>
                    <IoClose
                        color="#80ff72"
                        size={35}
                        className={classes.icon}
                        onClick={() => setShowed(false)}
                    />
                </div>
                <div
                    className={classes.contentWrapper}
                    style={{
                        height: `calc(100% - (40px + ${titleBarHeight}px))`
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}