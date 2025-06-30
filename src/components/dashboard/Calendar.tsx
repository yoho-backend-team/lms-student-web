import React from 'react'
import { Calendar } from '../ui/calendar'
import { COLORS, FONTS } from '@/constants/uiConstants'

const CalendarDash: React.FC = () => {
    const date = new Date()
    return (
        <div className='divshadow w-full h-full rounded-[16px] p-2'>
            <h1 style={{ ...FONTS.heading_02 }}>Calendar</h1>
            <Calendar
                mode="single"
                selected={date}
                // onSelect={setDate}
                className="rounded-md border shadow-lg bg-gray-100 w-full **:mt-2 **:gap-7 "
                style={{ backgroundColor: COLORS.bg_Colour }}
                captionLayout="dropdown"
            />
        </div>
    )
}

export default CalendarDash