import React from 'react'
import instituteLogo from '../../assets/dashboard/Group 191.png'
import { FONTS } from '@/constants/uiConstants'

const InstituteDetails: React.FC = () => {
    return (
        <div className='w-full h-[365px] flex flex-col gap-[10px] p-[20px] rounded-[16px] divshadow'>
            <h1 style={{ ...FONTS.heading_02 }}>Institute Name</h1>
            <p style={{ ...FONTS.para_01 }}>university</p>
            <img src={instituteLogo} alt="" className='w-[265px] h-[290px] -mt-5 self-center' />
        </div>
    )
}

export default InstituteDetails