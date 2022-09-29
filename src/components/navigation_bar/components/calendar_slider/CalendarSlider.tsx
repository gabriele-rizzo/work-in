// RESOURCES
import classes from "./CalendarSlider.module.css"

// REACT
import { useState, useEffect } from "react"

// INTERFACES
import { Size } from "../../../../interfaces"

// COMPONENTS
import CalendarSliderItem from "./components/calendar_slider_item/CalendarSliderItem"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

interface Props {
    // WINDOW MANAGEMENT SYSTEM
    windowSize: Size
    smartphoneView: boolean

    // DATE MANAGEMENT SYSTEM
    selectedDate: number
    setSelectedDate: (date: number) => void
}

export default function CalendarSlider({
    // WINDOW MANAGEMENT SYSTEM
    windowSize, smartphoneView,

    // DATE MANAGEMENT SYSTEM
    selectedDate, setSelectedDate
}: Props) {
    // FIND HOW MANY ITEMS CAN FILL THE WIDTH
    const findCalendarItemsCount = (): number => {
        let calendarWidth = windowSize.width - (windowSize.width / 7.5)
        let count = 0
        
        while ((count + 1) * 40 + 30 * (count) <= calendarWidth) count++
        while (count % 2 !== 1) count --

        return count
    }

    // POPULE THE DATES ARRAY WITH THE DATES CENTERING THE SELECTED DATE
    const generateDates = (now: number): Date[] => {
        let dates: Date[] = []
        let calendarItemsCount = findCalendarItemsCount()
        
        for (let offset = -(calendarItemsCount - 1) / 2; offset <= (calendarItemsCount - 1) / 2; offset++) {
            dates.push(new Date(now + offset * 86400000))
        }

        return dates
    }

    // DATES ARRAY FOR STATE MANAGEMENT
    const [dates, setDates] = useState<Date[]>(generateDates(selectedDate))

    // HANDLE SELECTED DATE CHANGES
    const changeSelectedDate = (dateMilliseconds: number): void => {
        setSelectedDate(dateMilliseconds)
        setDates(generateDates(dateMilliseconds))
    }

    // HANDLE WINDOW RESIZING TO GENERATE NEW DATES
    useEffect(() => {
        setDates(generateDates(selectedDate))
    }, [windowSize])

    return (
        <div className={classes.mainWrapper}>
            <div
                className={classes.wrapper}
                style={{
                    width: smartphoneView ? "100%" : "calc(100% - 80px)",
                    marginLeft: smartphoneView ? 0 : 40,
                    marginRight: smartphoneView ? 0 : 40
                }}
            >
                {
                    dates.map((value, index) => {
                        return (
                            <CalendarSliderItem
                                date={value}
                                selected={index === (dates.length - 1) / 2}
                                key={index}
                                setSelectedDate={changeSelectedDate}
                            />
                        )
                    })
                }
            </div>
            {
                smartphoneView
                ? <></>
                : <div className={classes.iconWrapper}>
                    <IoChevronBack
                        className={classes.leftIcon}
                        color="#80ff72"
                        size={30}
                        onClick={() => changeSelectedDate(selectedDate - 86400000)}
                    />
                    <IoChevronForward
                        className={classes.rightIcon}
                        color="#80ff72"
                        size={30}
                        onClick={() => changeSelectedDate(selectedDate + 86400000)}
                    />
                </div>
            }
        </div>
    )
}