import React from 'react'
import { Button } from "@/components/ui/button"
import humanimg from "../../assets/courses icons/demo human.png"
import threebox from "../../assets/courses icons/threebox.svg"
import timer from "../../assets/courses icons/timer.svg"


const AboutCourse = () => {
  return (
    <div className="px-4 py-6 ">
      <h1 className="text-black text-2xl font-semibold mb-6">About</h1>

       <div className="flex flex-row gap-3  mb-12">
        <Button className="bg-[#7b00ff]" variant="outline">
          About
        </Button>
         <Button className="bg-[#EBEFF3]" variant="outline">
          Class notes & materials
        </Button>
         <Button className="bg-[#EBEFF3]" variant="outline">
          Task & project
        </Button>
         <Button className="bg-[#EBEFF3]" variant="outline">
        Course Tracking
        </Button>
        </div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto items-start">

       
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#EBEFF3] text-[#444447] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg">
         
          <div className="flex justify-center items-center mb-4 md:mb-0">
            <div className="bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-4 rounded-md w-full max-w-[200px]">
              <img src={humanimg} alt="Communication Icon" className="w-full h-auto object-contain max-h-40" />
            </div>
          </div>

         
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-lg font-bold">MERN STACK</h1>
              <p className="mt-2 text-sm">
                The MERN stack is a popular JavaScript-based framework used for building full-stack web applications.
              </p>
            </div>

            <div className="flex items-center gap-6 mt-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Button   className="bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                  <img src={threebox} alt="Three Box" className="h-5 w-5" />
                </Button>
                <span className="text-sm">1 Module</span>
              </div>

              <div className="flex items-center gap-2">
                <Button   className="bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                  <img src={timer} alt="Timer" className="h-5 w-5" />
                </Button>
                <span className="text-sm">30 Days</span>
              </div>
            </div>
          </div>
        </div>

       
        <div 
        className="grid grid-cols-1 md:grid-cols-2 bg-[#EBEFF3] text-[#444447] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg">
         
         <div><h3 className='text-black text-xl font-semibold'>
            Course Name
         </h3>
         <Button   className="bg-[#ebeff3] hover:bg-[#ebeff3] mt-3 text-grey shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <p>If you can this yes successfully on android mobile app</p>
                </Button>

                
                <h3 className='text-black mt-5 text-xl font-semibold'>
            Couse Durations
         </h3>
         <Button   className="bg-[#ebeff3] hover:bg-[#ebeff3] mt-3 text-grey shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <p>Feedback</p>
                </Button>
                <h3 className='text-black mt-5 text-xl font-semibold'>
            Total Hours
         </h3>
         <Button   className="bg-[#ebeff3] hover:bg-[#ebeff3] mt-3 text-grey shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <p>If you can this yes successfully on android mobile app</p>
                </Button>
            </div>

            
         

         
        </div>
      </div>
    </div>
  )
}

export default AboutCourse
