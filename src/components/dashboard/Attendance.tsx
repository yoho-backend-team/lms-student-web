import React from 'react'
import { FONTS } from '@/constants/uiConstants'
import profile from '../../assets/icons/profiles/personal information.png'
import book from '../../assets/dashboard/book.png'
import close from '../../assets/dashboard/close.png'
import VerticalProgress from './ui/VerticalProgress'

const Attendance: React.FC = () => {
    return (
        <div className='divshadow w-full h-[300px] rounded-[16px] p-5'>
            <div className='flex flex-row justify-between'>
                <h1 style={{ ...FONTS.heading_02 }}>Attendance</h1>
                <button type="button" className='btnshadow rounded-xl w-[104px] h-[42px]' style={{ ...FONTS.heading_06 }}>Over All</button>
            </div>
            <div className='w-full flex flex-row justify-between gap-5 mt-5'>
                <div className='w-1/2 flex flex-row justify-evenly'>
                    <VerticalProgress style=' bg-gradient-to-r from-[#6AE1B7] via-[#6AE1B7EB] to-[#6AE1B7]' progress={60} />
                    <VerticalProgress style='bg-gradient-to-r from-[#4ADEE8] via-[#4ADEE8EB] to-[#4ADEE8]' progress={30} />
                    <VerticalProgress style='bg-gradient-to-r from-[#5585FF] via-[#5585FFEB] to-[#5585FF]' progress={20} />
                </div>
                <div className="w-1/2 flex flex-col gap-5 justify-center">
                    <div className="flex flex-row gap-5">
                        <img src={profile} alt="" className='w-[40px] h-[40px]' />
                        <p style={{ ...FONTS.heading_06 }}>Overall <span style={{ ...FONTS.heading_02 }}>7%</span> Attendance</p>
                    </div>
                    <div className="flex flex-row gap-5">
                        <img src={book} alt="" className='w-[40px] h-[40px]' />
                        <p style={{ ...FONTS.heading_06 }}><span style={{ ...FONTS.heading_02 }}>7%</span> Attendance Remaining</p>
                    </div>
                    <div className="flex flex-row gap-5">
                        <img src={close} alt="" className='w-[40px] h-[40px]' />
                        <p style={{ ...FONTS.heading_06 }}>Overall <span style={{ ...FONTS.heading_02 }}>7%</span> Day Absent</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance