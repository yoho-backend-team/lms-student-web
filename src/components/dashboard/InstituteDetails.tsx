import React from 'react'
import instituteLogo from '../../assets/dashboard/Group 191.png'

const InstituteDetails: React.FC = () => {
    return (
        <div className='w-[383px] h-[365px] gap-[10px] p-[20px] rounded-[16px] bg-[#EBEFF3] shadow-xl'>
            <h1>Institute Name</h1>
            <p>university</p>
            <img src={instituteLogo} alt="" className='w-[266px] h-[290px] -mt-5 ml-5' />
        </div>
    )
}

export default InstituteDetails