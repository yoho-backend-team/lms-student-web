import React from 'react'
import Progress3D from './ui/Progress3D'

const CourseProgress: React.FC = () => {
    return (
        <div className='flex flex-col justify-between w-[282px] h-[365px] bg-[#EBEFF3] shadow-xl rounded-[16px] p-[20px] gap-[10px]'>
            <h1>Courses Progress</h1>
            <div className='-mt-20'>
                <Progress3D />
            </div>
            <div className='flex flex-row justify-between -mt-30'>
                <h1>Total Classes</h1>
                <h1>2 Classes</h1>
            </div>
        </div>
    )
}

export default CourseProgress