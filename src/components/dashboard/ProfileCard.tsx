import Gridprofile from '@/components/dashboard/ui/GridProgress'
import React from 'react'
import proLogo from '../../assets/icons/navbar/icons8-ionic-50.png'

const ProfileCard: React.FC = () => {
    return (
        <div className='flex flex-col w-[655px] h-[365px] gap-[10px] p-[20px] bg-[#EBEFF3] shadow-xl rounded-[16px]'>
            <h2 className='text-[#2A2A2A] text-[20px]'>Classes</h2>
            <div className="flex flex-row justify-between">
                <div className='flex flex-row gap-5'>
                    <img src={proLogo} alt="" width={62} height={62} className='rounded-xl' />
                    <div className="flex flex-col w-[215px] h-[53px]">
                        <h3 className='text-transparent bg-clip-text bg-gradient-to-r from-[#7B00FF] to-[#B200FF]'>Name</h3>
                        <p>Trainee ID:</p>
                    </div>
                </div>
                <button type="button"
                    className=' bg-white items-center w-[104px] h-[48px] rounded-xl btnshadow text-[#716F6F] text-[14px]'
                >View Profile</button>
            </div>
            <div className="flex flex-row flex-wrap gap-4 justify-center">
                <div className='w-[185px] h-[89px] bg-white shadow-lg rounded-xl'>
                    <Gridprofile />
                </div>
                <div className='w-[185px] h-[89px] bg-white shadow-lg rounded-xl'>
                    <Gridprofile />
                </div>
                <div className='w-[185px] h-[89px] bg-white shadow-lg rounded-xl'>
                    <Gridprofile />
                </div>
                <div className='w-[185px] h-[89px] bg-white shadow-lg rounded-xl'>
                    <Gridprofile />
                </div>
                <div className='w-[185px] h-[89px] bg-white shadow-lg rounded-xl'>
                    <Gridprofile />
                </div>
                <div className='w-[185px] h-[89px] bg-white shadow-lg rounded-xl'>
                    <Gridprofile />
                </div>
            </div>
        </div>
    )
}

export default ProfileCard