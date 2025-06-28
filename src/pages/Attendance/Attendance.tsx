import { COLORS, FONTS } from '@/constants/uiConstants'
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
import {
  Card,
  CardHeader,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import filter from '../../assets/icons/common/Mask group.png'
import { startOfMonth, setMonth, setYear } from 'date-fns'

const chartData = [
  { month: 'January', desktop: 10 },
  { month: 'February', desktop: 11.5 },
  { month: 'March', desktop: 10 },
  { month: 'April', desktop: 11 },
  { month: 'May', desktop: 10 },
  { month: 'June', desktop: 11 },
]

const chartConfig = {
  desktop: {
    label: 'Day',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const attendanceCards = [
  {
    label: "Classes Attend",
    current: 32,
    total: 40,
    color: COLORS.light_blue,
  },
  {
    label: "Present Days",
    current: 12,
    total: 40,
    color: COLORS.light_pink,
  },
  {
    label: "Absent Days",
    current: 23,
    total: 40,
    color: COLORS.light_green_02,
  },
]

export const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedMonth, setSelectedMonth] = useState<number>(selectedDate.getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(selectedDate.getFullYear())
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(e.target.value)
    setSelectedMonth(newMonth)
    const updatedDate = startOfMonth(setMonth(selectedDate, newMonth))
    setSelectedDate(updatedDate)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value)
    setSelectedYear(newYear)
    const updatedDate = startOfMonth(setYear(selectedDate, newYear))
    setSelectedDate(updatedDate)
  }

  const handleCalendarMonthChange = (newMonth: Date) => {
    setSelectedDate(newMonth)
    setSelectedMonth(newMonth.getMonth())
    setSelectedYear(newMonth.getFullYear())
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold mb-0 mx-1" style={{ ...FONTS.heading_02 }}>Attendance</h2>

  <div className="relative flex items-center">
    {/* Filter Toggle Button */}
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="p-2 rounded-full bg-[#ebeff3] shadow-[3px_3px_6px_rgba(189,194,199,0.75),-3px_-3px_6px_rgba(255,255,255,0.7)] hover:scale-105 transition z-10"
    >
      <img src={filter} alt="Filter" className="w-6 h-6" />
    </button>

    {/* Filters Panel - absolutely positioned inside the relative parent */}
    <div
      className={`absolute right-full top-1/2 transform -translate-y-1/2 mr-4 flex gap-2 ${
        showFilters ? 'opacity-100 max-w-[400px]' : 'opacity-0 max-w-0 overflow-hidden'
      }`}
    >
      <select
        className="px-2 py-2 text-sm rounded-md bg-[#ebeff3] text-gray-700 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
        style={{ ...FONTS.para_02 }}
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        {[
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ].map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>

      <select
        className="px-2 py-2 text-sm rounded-md bg-[#ebeff3] text-gray-700 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
        style={{ ...FONTS.para_02 }}
        value={selectedYear}
        onChange={handleYearChange}
      >
        {Array.from({ length: 36 }, (_, i) => 2000 + i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>


      {/* Cards */}
      <div className="flex flex-row gap-4 justify-center pt-6">
        {attendanceCards.map((card) => (
          <Card
            key={card.label}
            className="relative bg-[#ebeff3] w-[440px] h-[120px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] overflow-hidden"
          >
            <CardHeader>
              <div className="flex justify-between">
                <span style={{ ...FONTS.heading_04 }}>{card.label}</span>
                <span className="text-2xl font-bold" style={{ ...FONTS.heading_01 }}>
                  <span style={{ color: card.color }}>{card.current}</span>
                  <span className="text-sm text-gray-500">/{card.total}</span>
                </span>
              </div>

              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart data={chartData} margin={{ left: 0, right: 0 }}>
                    <XAxis dataKey="month" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke={card.color}
                      strokeWidth={2.5}
                      dot={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Calendar + Day Overview */}
      <div className="flex gap-6 pt-6">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4 mt-2" style={{ ...FONTS.heading_02 }}>Calendar</h2>
          <Calendar
            mode="single"
            required
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={selectedDate}
            onMonthChange={handleCalendarMonthChange}
            className="bg-[#ebeff3] border w-[500px]  **:gap-5 **:py-0.5  shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]"
            style={{ ...FONTS.heading_02 }}
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4 mt-2" style={{ ...FONTS.heading_02 }}>
            Day Overview
          </h3>
          <div className="flex flex-col justify-between bg-[#ebeff3] rounded-md p-6 w-[830px] h-[315px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]">
            <div>
              <p className="text-sm mb-4 text-gray-700">
                {selectedDate ? selectedDate.toDateString() : "Select a date"}
              </p>
              <ul className="space-y-2 text-gray-700" style={{ ...FONTS.heading_06 }}>
                <li>Classes Scheduled: 4</li>
                <li>Classes Attended: 3</li>
                <li>Absent: 1</li>
                <li>Notes: Good performance</li>
              </ul>
            </div>
            <button
              className="mt-4 self-start px-4 py-2 rounded-md bg-[#ebeff3] text-gray-700 shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]"
              style={{ ...FONTS.heading_06 }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
