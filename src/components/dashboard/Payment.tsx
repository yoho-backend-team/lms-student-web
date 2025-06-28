import React from 'react'
import payments from '../../assets/dashboard/payments.png'
import { FONTS } from '@/constants/uiConstants'

const Payment: React.FC = () => {
    return (
        <div className='flex flex-row p-5 gap-10 divshadow w-full h-[300px] rounded-[16px]'>
            <div className="flex flex-col justify-between">
                <div className='flex flex-col gap-4'>
                    <h1 style={{ ...FONTS.heading_02 }}>Payment</h1>
                    <p style={{ ...FONTS.heading_06 }}>Payment Pending for <span style={{ ...FONTS.heading_04 }}>April</span></p>
                    <p style={{ ...FONTS.heading_06 }}>Amount to pay:</p>
                    <h1 style={{ ...FONTS.heading_03, fontSize: "50px" }}>&#8377;90000</h1>
                </div>
                <button type="button" className='btnshadow w-[145px] h-[42px] rounded-xl' style={{ ...FONTS.heading_06 }}>Check Payments</button>
            </div>
            <div>
                <img src={payments} alt="" className='mt-10' />
            </div>
        </div>
    )
}

export default Payment