import { COLORS, FONTS } from '@/constants/uiConstants'
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
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
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

const chartData = [
  { month: 'January', desktop: 140 },
  { month: 'February', desktop: 165 },
  { month: 'March', desktop: 135 },
  { month: 'April', desktop: 153 },
  { month: 'May', desktop: 137 },
  { month: 'June', desktop: 152 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4" style={{ ...FONTS.heading_02 }}>Attendance</h2>

      <div className="flex flex-row gap-4 justify-center">

        
        <Card className="w-[440px] h-[162px] overflow-hidden" style={{ backgroundColor: COLORS.bg_Colour }}>
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <span style={{ ...FONTS.heading_05 }}>Classes Attend</span>
              <span className="text-2xl font-bold text-purple-600" style={{ ...FONTS.heading_01, color: COLORS.light_blue }}>
                32<span className="text-sm text-gray-500">/40</span>
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-4 pt-0">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={70}>
                <LineChart data={chartData} margin={{ left: 0, right: 0 }}>
                  <XAxis dataKey="month" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Line
                    dataKey="desktop"
                    type="monotone"
                    stroke={COLORS.light_blue}
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

       
        <Card className="w-[440px] h-[162px] overflow-hidden" style={{ backgroundColor: COLORS.bg_Colour }}>
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <span style={{ ...FONTS.heading_05 }}>Present Days</span>
              <span className="text-2xl font-bold text-pink-500"  style={{...FONTS.heading_01, color:COLORS.light_pink}}>
                12<span className="text-sm text-gray-500">/40</span>
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-4 pt-0">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={70}>
                <LineChart data={chartData} margin={{ left: 0, right: 0 }}>
                  <XAxis dataKey="month" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Line
                    dataKey="desktop"
                    type="monotone"
                    stroke={COLORS.light_pink}
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="w-[440px] h-[162px] overflow-hidden" style={{ backgroundColor: COLORS.bg_Colour }}>
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <span style={{ ...FONTS.heading_05 }}>Absent Days</span>
              <span className="text-2xl font-bold text-cyan-500" style={{...FONTS.heading_01, color:COLORS.light_green_02}}>
                23<span className="text-sm text-gray-500">/40</span>
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-4 pt-0">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={70}>
                <LineChart data={chartData} margin={{ left: 0, right: 0 }}>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Line
                    dataKey="desktop"
                    type="monotone"
                    stroke={COLORS.light_green_02}
                    strokeWidth={2.5}
                    dot={false}
					
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>

      <h2 className="text-xl font-semibold mb-4 mt-4" style={{ ...FONTS.heading_02 }}>Calendar</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm bg-gray-100 w-[500px] **:gap-6"
        style={{ backgroundColor: COLORS.bg_Colour }}
        captionLayout="dropdown"
      />
    </div>
  )
}

export default Attendance
