// REACT
import { useState } from "react"

// RESOURCES
import classes from "./NavigationBarItem.module.css"

interface Props {
    // LOOK
    icon: JSX.Element
    label: string
    disabled?: boolean

    // ACTIONS
    onClick: () => void

    // WINDOW MANAGEMENT SYSTEM
    smartphoneView: boolean
}

export default function NavigationBarItem({
    // LOOK
    icon, label, disabled,

    // ACTIONS
    onClick,

    // WINDOW MANAGEMENT SYSTEM
    smartphoneView
}: Props) {
    return <div
        className={classes.actionWrapper}
        onClick={() => onClick()}
        style={{
            pointerEvents: disabled ? "none" : "initial",
            opacity: disabled ? "0.2" : "initial",
        }}
    >
        <div className={classes.clickWrapper}>
            {icon}
            {smartphoneView ? <></> : <p className={classes.actionText}>{label}</p>}
        </div>
    </div>
}