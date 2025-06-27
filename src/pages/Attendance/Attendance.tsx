
import React from 'react'

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

const chartData = [
  { month: 'January', desktop: 140 },
  { month: 'February', desktop: 165 },
  { month: 'March', desktop: 135 },
  { month: 'April', desktop: 153 },
  { month: 'May', desktop: 137},
  { month: 'June', desktop: 152 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export const Attendance = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>

     
      <div className="flex flex-row gap-4 justify-center">

        <Card className="w-[440px] h-[162px]">
          <CardHeader> Classes Attend</CardHeader> 
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData} margin={{ left: 12, right: 12 }} width={0} height={0}>
                <XAxis dataKey="month" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={1} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

     
        <Card className="w-[440px] h-[162px]">
          <CardHeader>Present Days
			
			</CardHeader> 
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData} margin={{ left: 12, right: 12 }} width={3} height={13}>
                <XAxis dataKey="month" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={1} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

       
      <Card className="w-[440px] h-[162px]">
        <CardHeader>
			<div className='flex items-baseline gap-54'>
          <span>Absent Days</span>
          <span className="text-2xl font-bold text-cyan-500">
            23 <span className="text-sm text-gray-500">/40</span>
          </span>
		  </div>
        </CardHeader> 
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData} margin={{ left: 12, right: 12 }} width={4} height={3}>
              <XAxis dataKey="month" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={1} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default Attendance
