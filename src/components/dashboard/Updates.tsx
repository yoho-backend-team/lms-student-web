import React from 'react'
import { FONTS, bluebtnHover } from '@/constants/uiConstants'
import updatesimg from '../../assets/dashboard/updates.png'

const Updates: React.FC = () => {

    const data = []

    return (
        <div className='flex flex-col gap-5 divshadow w-full h-full rounded-[16px] p-5'>
            <div className="flex flex-row justify-between">
                <h1 style={{ ...FONTS.heading_02 }}>Updates</h1>
                <p style={{ ...FONTS.para_01 }}><span>0</span> New Messages</p>
            </div>
            <div className='flex flex-row gap-10'>
                <button style={{ fontFamily: FONTS.heading_06.fontFamily, fontSize: FONTS.heading_06.fontSize, fontWeight: FONTS.heading_06.fontWeight }} className={`text-[#716F6F] btnshadow w-[86px] h-[42px] rounded-xl ${bluebtnHover}`}>Today</button>
                <button style={{ fontFamily: FONTS.heading_06.fontFamily, fontSize: FONTS.heading_06.fontSize, fontWeight: FONTS.heading_06.fontWeight }} className={`text-[#716F6F] btnshadow w-[86px] h-[42px] rounded-xl ${bluebtnHover}`}>Previous</button>
            </div>
            <div>
                {
                    data.length == 0 ?
                        <div className='flex flex-col w-full items-center gap-3'>
                            <img src={updatesimg} alt="" className='w-[646px] h-[200px]' />
                            <h1 style={{ ...FONTS.heading_04 }}>No New Message found</h1>
                            <p style={{ ...FONTS.para_02 }}>Any updates will appear here when available</p>
                        </div> :
                        <div>

                        </div>
                }
            </div>
        </div>
    )
}

export default Updates