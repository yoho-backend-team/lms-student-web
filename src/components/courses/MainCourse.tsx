import React from 'react'
import { Button } from "@/components/ui/button"
import humanimg from "../../assets/courses icons/demo human.png"
import threebox from "../../assets/courses icons/threebox.svg"
import timer from "../../assets/courses icons/timer.svg"

const MainCourse = () => {
  return (
    <div className="px-4 py-6">
      <h1 className="text-black text-2xl font-semibold mb-6">Courses</h1>

      
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto">
       
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#EBEFF3] text-[#444447] shadow-[inset_2px_-2px_rgba(255,255,255,0.7),4px_4px_10px_rgba(0,0,0,0.25)] p-6 rounded-lg">
         
          <div className="flex justify-center items-center mb-4 md:mb-0">
            <div className="bg-[#EBEFF3] shadow-[inset_2px_-2px_rgba(255,255,255,0.7),4px_4px_10px_rgba(0,0,0,0.25)] p-4 rounded-md w-full max-w-[200px]">
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
                <Button  className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                  <img src={threebox} alt="Three Box" className="h-5 w-5" />
                </Button>
                <span className="text-sm">1 Module</span>
              </div>

              <div className="flex items-center gap-2">
                <Button  className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                  <img src={timer} alt="Timer" className="h-5 w-5" />
                </Button>
                <span className="text-sm">30 Days</span>
              </div>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#EBEFF3] text-[#444447] shadow-[inset_2px_-2px_rgba(255,255,255,0.7),4px_4px_10px_rgba(0,0,0,0.25)] p-6 rounded-lg">
         
          <div className="flex justify-center items-center mb-4 md:mb-0">
            <div className="bg-[#EBEFF3] shadow-[inset_2px_-2px_rgba(255,255,255,0.7),4px_4px_10px_rgba(0,0,0,0.25)] p-4 rounded-md w-full max-w-[200px]">
              <img src={humanimg} alt="Communication Icon" className="w-full h-auto object-contain max-h-40" />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-lg font-bold">MERN STACK</h1>
              <p className="mt-2 text-sm">
                The MERN stack helps you develop frontend and backend apps using MongoDB, Express, React, and Node.js efficiently.
              </p>
            </div>

            <div className="flex items-center gap-6 mt-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Button  className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                  <img src={threebox} alt="Three Box" className="h-5 w-5" />
                </Button>
                <span className="text-sm">2 Modules</span>
              </div>

              <div className="flex items-center gap-2">
                <Button  className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                  <img src={timer} alt="Timer" className="h-5 w-5" />
                </Button>
                <span className="text-sm">45 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCourse
