import React from 'react'
import { FONTS } from '@/constants/uiConstants'
import profile from '../../assets/icons/profiles/personal information.png'
import book from '../../assets/dashboard/book.png'
import close from '../../assets/dashboard/close.png'
import VerticalProgress from './ui/VerticalProgress'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const Attendance: React.FC = () => {
    const navigate = useNavigate()

    const attendanceBars = [
        {
            height: "h-[155px]",
            top: "top-[42px]",
            color:
                "bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]",
            shadow:
                "shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#45ab87bf,inset_8px_8px_12px_#46ab8740,inset_-4px_-4px_8px_#46ab87bf,inset_-8px_-8px_12px_#46ab8740]",
        },
        {
            height: "h-[63px]",
            top: "top-[134px]",
            color:
                "bg-[linear-gradient(90deg,rgba(74,222,232,1)_0%,rgba(74,222,232,0.92)_52%,rgba(74,222,232,1)_100%)]",
            shadow:
                "shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#34a9b1bf,inset_8px_8px_12px_#34aab140,inset_-4px_-4px_8px_#34aab1bf,inset_-8px_-8px_12px_#34aab140]",
        },
        {
            height: "h-9",
            top: "top-[161px]",
            color:
                "bg-[linear-gradient(90deg,rgba(85,133,255,1)_0%,rgba(85,133,255,0.92)_53%,rgba(85,133,255,1)_100%)]",
            shadow:
                "shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#3358b8bf,inset_8px_8px_12px_#3358b840,inset_-4px_-4px_8px_#3358b8bf,inset_-8px_-8px_12px_#3358b840]",
        },
    ];

    const attendanceMetrics = [
        {
            icon: "https://c.animaapp.com/mck68j5cT59wYP/img/frame-357.svg",
            text: "Overall 7% Attendance",
        },
        {
            icon: "https://c.animaapp.com/mck68j5cT59wYP/img/frame-358.svg",
            text: "3% Attendance Remaining",
        },
        {
            icon: "https://c.animaapp.com/mck68j5cT59wYP/img/frame-359.svg",
            text: "0% Days Absent",
        },
    ];

    return (
        <>
            <Card className="w-[440px] h-[300px] p-5 flex flex-col items-start gap-2.5 relative bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
                <CardContent className="flex flex-col w-[400px] items-start gap-5 relative flex-[0_0_auto] p-0">
                    <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                        <div className="flex flex-col w-[228px] items-start gap-3 relative">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-dark text-xl tracking-[0] leading-[normal]">
                                Attendance
                            </div>
                        </div>

                        <Button style={{ ...FONTS.heading_06 }} className=" text-[] btnshadow btnhovershadow hover:!text-white bg-gray-100 flex w-[104px] h-[42px] items-center justify-center gap-2.5 px-3 py-2 relative rounded-lg " >
                            <span className="">
                                Over All
                            </span>
                        </Button>
                    </div>

                    <div className="flex items-center gap-[30px] relative self-stretch w-full flex-[0_0_auto]">
                        <div className="inline-flex items-center gap-[30px] relative flex-[0_0_auto]">
                            {attendanceBars.map((bar, index) => (
                                <div
                                    key={`bar-${index}`}
                                    className="relative w-7 h-[198px] bg-[#ebeff3] rounded-2xl border border-solid border-[#f4f6f8] shadow-[4px_4px_8px_#ffffffbf,inset_2px_2px_8px_#bdc2c7]"
                                >
                                    <div
                                        className={`relative w-[26px] ${bar.height} ${bar.top} rounded-2xl ${bar.shadow} ${bar.color}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col w-[226px] items-start gap-5 relative">
                            {attendanceMetrics.map((metric, index) => (
                                <div
                                    key={`metric-${index}`}
                                    className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]"
                                >
                                    <img
                                        className="relative w-20 h-20 mt-[-20.00px] mb-[-20.00px] ml-[-20.00px]"
                                        alt="Attendance icon"
                                        src={metric.icon}
                                    />
                                    <div className="relative w-[150px] [font-family:'Quicksand',Helvetica] font-semibold text-[#706f6f] text-xs tracking-[0] leading-[normal]">
                                        {metric.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Attendance