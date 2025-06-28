import React from 'react'

const VerticalProgress: React.FC<{ style: string, progress: number }> = ({ style, progress }) => {
    return (
        <>
            <div className="w-6 h-full bg-gray-200 rounded-full dark:bg-gray-700 flex flex-col-reverse btnshadow ">
                <div
                    className={"w-6 rounded-full transition-all duration-300 " + style}
                    style={{ height: `${progress ?? 20}%` }}
                />
            </div>
        </>
    )
}

export default VerticalProgress