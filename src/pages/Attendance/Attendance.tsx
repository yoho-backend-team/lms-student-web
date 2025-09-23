/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS, FONTS } from '@/constants/uiConstants'
import { Line, LineChart, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useEffect, useState, useCallback } from 'react'
import { Calendar } from '@/components/ui/calendar'
import filter from '../../assets/icons/common/Mask group.png'
import { startOfMonth, setMonth, setYear } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { selectAttendance, selectAttendanceByDate } from '@/features/Attendance/reducer/selectors'
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks'
import { selectDashBoard } from '@/features/Dashboard/reducers/selectors'
import Loader from '@/components/Loader/Loader';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getattendanceByDate, getStudentattendance } from '@/features/Attendance/reducer/thunks'
import { useNavigate } from 'react-router-dom'

const chartConfig = {
  desktop: {
    label: 'Day',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const

export const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedMonth, setSelectedMonth] = useState<string>(months[selectedDate.getMonth()])
  const [selectedYear, setSelectedYear] = useState<number>(selectedDate.getFullYear())
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const dispatch = useDispatch<any>();
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate()


  const attendancedata = useSelector(selectAttendance)


  const generateChartData = useCallback(() => {
    if (!attendancedata?.data?.formattedAttendance) return [];

    return Object.entries(attendancedata.data.formattedAttendance).map(([month, attendance]) => {
      const att = attendance as { presentDays?: number };
      return {
        month,
        desktop: att.presentDays || 0
      };
    });
  }, [attendancedata])

  const chartData = generateChartData();


  const attendanceCards = [
    {
      label: "Classes Attend",
      type: "totalOnly",
      current: attendancedata?.data?.attendedClassCount || 0,
      total: (attendancedata?.data?.offlineClassCount || 0) + (attendancedata?.data?.onlineClassCount || 0),
      color: COLORS.light_blue,
    },
    {
      label: "Present Days",
      type: "currentAndTotal",
      current: attendancedata?.data?.totalPresentDays || 0,
      total: attendancedata?.data?.totalWorkingDays || 0,
      color: COLORS.light_pink,
    },
    {
      label: "Absent Days",
      type: "currentAndTotal",
      current: attendancedata?.dat?.totalAbsentDays || 0,
      total: attendancedata?.data?.totalWorkingDays || 0,
      color: COLORS.light_green_02,
    }
  ]
  console.log(attendanceCards, 'datacon attendance data')


  const handleMonthChange = (newMonth: typeof months[number]) => {
    const monthIndex = months.indexOf(newMonth)
    const updatedDate = startOfMonth(setMonth(selectedDate, monthIndex))
    setSelectedMonth(newMonth)
    setSelectedDate(updatedDate)
  }

  const handleYearChange = (newYear: string) => {
    const numericYear = parseInt(newYear, 10)
    const updatedDate = startOfMonth(setYear(selectedDate, numericYear))
    setSelectedYear(numericYear)
    setSelectedDate(updatedDate)
  }

  const handleCalendarMonthChange = (newMonth: Date) => {
    setSelectedDate(newMonth)
    setSelectedMonth(months[newMonth.getMonth()])
    setSelectedYear(newMonth.getFullYear())
  }

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)


  const dashData = useSelector(selectDashBoard)
  const attendanceByDate = useSelector(selectAttendanceByDate)


  useEffect(() => {
    dispatch(getDashBoardReports())
    if (selectedDate?.toISOString().split('T')[0] == new Date().toISOString().split('T')[0]) {
      dispatch(getattendanceByDate({ date: selectedDate?.toISOString().split('T')[0] }));
    } else {
      const nextDay = new Date(selectedDate).setDate(selectedDate.getDate() + 1)
      dispatch(getattendanceByDate({ date: new Date(nextDay).toISOString().split('T')[0] }));
    }
  }, [dispatch, selectedDate])


  useEffect(() => {
    const timeout = setTimeout(() => {
      const payload = {
        userId: dashData.user.uuid,
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
        instituteId: dashData.institute.uuid,
      };
      console.log(payload, 'payload')
      dispatch(getStudentattendance(payload));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dashData, dispatch, selectedDate]);

  useEffect(() => {
    (async () => {
      try {
        showLoader();
        const timeoutId = setTimeout(() => {
          hideLoader();
        }, 5000);
        const response = await dispatch(getDashBoardReports());
        if (response) {
          clearTimeout(timeoutId);
        }
      } finally {
        hideLoader();
      }
    })();
  }, [dispatch, hideLoader, showLoader]);

  return (
    <>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-0 mx-1" style={{ ...FONTS.heading_01 }}>Attendance</h2>

          <div className="relative flex items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:scale-105 transition z-10"
              style={{ backgroundColor: COLORS.bg_Colour }}
              aria-label="Filter attendance data"
            >
              <img src={filter} alt="Filter" className="w-6 h-6" />
            </button>

            {showFilters && (
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-4 flex gap-4 opacity-100 max-w-[400px]">
                <Select value={selectedMonth} onValueChange={handleMonthChange}>
                  <SelectTrigger
                    style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
                    className="w-max-sm rounded-sm border-0 px-1 py-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                  >
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    {months.map((month) => (
                      <SelectItem
                        key={month}
                        value={month}
                        className={`
                        cursor-pointer text-gray-700 w-[100px]
                        rounded-sm 
                        bg-[#ebeff3]
                        shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] 
                        data-[state=checked]:bg-gradient-to-r 
                        data-[state=checked]:from-purple-500 
                        data-[state=checked]:to-purple-700 
                        data-[state=checked]:text-white
                        mb-2 transition
                      `}
                        style={{ backgroundColor: COLORS.bg_Colour }}
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                  <SelectTrigger
                    className="w-max-sm rounded-sm border-0 px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                    style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
                  >
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    {years.map((year) => (
                      <SelectItem
                        key={year}
                        value={year.toString()}
                        className={`
                        cursor-pointer px-2 py-2 text-gray-700 
                        rounded-sm 
                        bg-[#ebeff3]
                        shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(189,194,199,0.6)]
                        data-[state=checked]:bg-gradient-to-r 
                        data-[state=checked]:from-purple-500 
                        data-[state=checked]:to-purple-700 
                        data-[state=checked]:text-white
                        mb-2 transition
                      `}
                        style={{ backgroundColor: COLORS.bg_Colour }}
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4 justify-center pt-6">
          {attendanceCards?.map((card) => (
            <Card
              key={card.label}
              className="
              relative 
              w-full 
              md:max-w-full
              md:h-[150px]
              h-auto 
              shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] 
              overflow-hidden
            "
              style={{ backgroundColor: COLORS.bg_Colour }}
            >
              <CardHeader className='md:w-auto md:text-[10px] h-full'>
                <div className="max-w-screen-xl flex justify-between">
                  <span style={{ ...FONTS.heading_04 }}>{card.label}</span>
                  <span className="text-2xl font-bold" style={{ ...FONTS.heading_01 }}>
                    {card.type === "totalOnly" ? (
                      <span style={{ color: card.color }}>{card.total}</span>
                    ) : (
                      <>
                        <span style={{ color: card.color }}>{card.current}</span>
                        <span className="text-2xl text-gray-500">/{card.total}</span>
                      </>
                    )}
                  </span>
                </div>
              </CardHeader>
              <CardContent className='h-full md:h-[30px] md:w-[220px] md:pb-0 lg:w-[100%] lg:mb-2 '>
                <ChartContainer config={chartConfig} style={{ ...FONTS.para_03 }} >
                  <LineChart
                    data={chartData}
                    margin={{ left: 0, right: 0 }}
                    width={500}
                    height={70}
                    className='md:mb-20'
                  >
                    <XAxis dataKey="month" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke={card.color}
                      strokeWidth={2.5}
                      dot={true}
                      className='max-w-sm md:max-w-full h-auto md:h-[60px]'
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-row gap-6 pt-6 h-[45vh] ">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 mt-2" style={{ ...FONTS.heading_02 }}>Calendar</h2>
            <Calendar
              mode="single"
              required
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={selectedDate}
              onMonthChange={handleCalendarMonthChange}
              className="border **:gap-5 **:py-0.5 md:**:gap-2 rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]"
              style={{ ...FONTS.heading_02, backgroundColor: COLORS.bg_Colour }}
            />
          </div>

          <div className="flex flex-col w-full">
            <h3
              className="text-lg font-semibold mb-4 mt-2"
              style={{ ...FONTS.heading_02 }}
            >
              Day Overview
            </h3>

            <div
              className="flex flex-col justify-between rounded-md p-6 h-full shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]"
              style={{ backgroundColor: COLORS.bg_Colour }}
            >
              <div>
                <p className="text-sm mb-2 text-gray-700" style={{ ...FONTS.para_01 }}>
                  {selectedDate ? selectedDate.toDateString() : "Select a date"}
                </p>

                <ul
                  className="space-y-2 text-gray-700 h-64 overflow-y-scroll"
                  style={{ ...FONTS.heading_06 }}
                >
                  {attendanceByDate && attendanceByDate.length > 0 ? (
                    attendanceByDate.map((data: any, index: number) => (
                      <li key={index} className="p-4 flex flex-col gap-2">
                        <p>Class Name: {data?.class_name}</p>
                        <p>Start time: {data?.start_time?.split("T")[1]?.split(".")[0]}</p>
                        <p>End time: {data?.end_time?.split("T")[1]?.split(".")[0]}</p>
                        <p>Duration: {data?.duration}</p>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-gray-500 text-center italic">
                      {selectedDate
                        ? "No class scheduled for this date"
                        : "Please select a date to view schedule"}
                    </li>
                  )}
                </ul>
              </div>

              <button
                className={`w-max-sm mt-2 self-start px-4 py-2 rounded-md text-[14px] btnshadow cursor-pointer ${attendanceByDate && attendanceByDate.length > 0
                  ? "bg-gray text-white hover:!text-white btnhovershadow"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                onClick={() =>
                  attendanceByDate && attendanceByDate.length > 0 && navigate("/classes")
                }
                style={{ ...FONTS.heading_06 }}
                disabled={!attendanceByDate || attendanceByDate.length === 0}
              >
                View Details
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Attendance