// RESOURCES
import classes from "./CalendarSliderItem.module.css"

interface Props {
    // DATE MANAGEMENT SYSTEM
    date: Date
    setSelectedDate: (date: number) => void

    // LOOK
    selected: boolean
}

export default function CalendarSliderItem({
    // DATE MANAGEMENT SYSTEM
    date, setSelectedDate,

    // LOOK
    selected
}: Props) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const isToday = () => {
        const today = new Date()

        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
      }

    setInterval(isToday, 300000)

    return (
        <div
            className={selected ? classes.selectedWrapper : classes.wrapper}
            style={{ borderColor: isToday() ? "gray" : "transparent" }}
            onClick={() => setSelectedDate(date.getTime())}
        >
            <p className={classes.number}>{date.getDate()}</p>
            <p className={classes.month}>{months[date.getMonth()]}</p>
        </div>
    )
}