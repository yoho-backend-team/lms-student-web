import React from 'react'
import { Button } from "@/components/ui/button"
import humanimg from "../../assets/courses icons/demo human.png"
import threebox from "../../assets/courses icons/threebox.svg"
import timer from "../../assets/courses icons/timer.svg"

const MainCourse = () => {
  return (
    <div>

  <h1 className='text-black bg-grey text-2xl'>Courses</h1>
    <div className='flex justify-between px-0 mt-10'>  
  <div className="card flex ml-15 h-70 w-170 bg-[linear-gradient(to_bottom_left,#EBEFF3,#EBEFF3)] gap-6 text-[#444447] shadow-[inset_2px_-2px_hsl(0_0%_100%_/_1),4px_4px_10px_hsl(0_0%_0%_/_0.25)] p-10 rounded-[0.5rem]">
    
    <div className="w-1/2">
     <div className="card  h-50 w-60 bg-[linear-gradient(to_bottom_left,#EBEFF3,#EBEFF3)] gap-6 text-[#444447] shadow-[inset_2px_-2px_hsl(0_0%_100%_/_1),4px_4px_10px_hsl(0_0%_0%_/_0.25)] p-10 rounded-[0.5rem]">
    
     <img src={humanimg} alt="Communication Icon" className="h-35 w-50" />
     </div>
     
      
    </div>
    <div className="w-1/2">
    <h1>MERN STACK</h1>
     <h1 className='mt-2'>The MERN stack is a popular JavaScript-based framework used for building full-stack web applications.</h1>
     <div className="flex items-center gap-6 mt-6">
  
<div className="flex items-center mt-5 gap-2">
    <Button className="bg-white  p-2">
      <img src={threebox} alt="Three Box" className="h-5 w-5" />
    </Button>
    <span className="text-sm text-[#444447]">1 Modules</span>
  </div>


  <div className="flex items-center mt-5 gap-2">
    <Button className="bg-white p-2">
      <img src={timer} alt="Timer" className="h-5 w-5" />
    </Button>
    <span className="text-sm text-[#444447]">30 Days Hours</span>
  </div>
</div>


    </div>
    
     </div>

      <div className="card flex mr-5 h-70 w-170 bg-[linear-gradient(to_bottom_left,#EBEFF3,#EBEFF3)] gap-6 text-[#444447] shadow-[inset_2px_-2px_hsl(0_0%_100%_/_1),4px_4px_10px_hsl(0_0%_0%_/_0.25)] p-10 rounded-[0.5rem]">
    
    <div className="w-1/2">
     <div className="card  h-50 w-60 bg-[linear-gradient(to_bottom_left,#EBEFF3,#EBEFF3)] gap-6 text-[#444447] shadow-[inset_2px_-2px_hsl(0_0%_100%_/_1),4px_4px_10px_hsl(0_0%_0%_/_0.25)] p-10 rounded-[0.5rem]">
    
     <img src={humanimg} alt="Communication Icon" className="h-35 w-50" />
     </div>
     
      
    </div>
    <div className="w-1/2">
    <h1>MERN STACK</h1>
     <h1 className='mt-2'>The MERN stack is a popular JavaScript-based framework used for building full-stack web applications.</h1>
     <div className="flex items-center gap-6 mt-6">
  
<div className="flex items-center mt-5 gap-2">
    <Button className="bg-white  p-2">
      <img src={threebox} alt="Three Box" className="h-5 w-5" />
    </Button>
    <span className="text-sm text-[#444447]">1 Modules</span>
  </div>


  <div className="flex items-center mt-5 gap-2">
    <Button className="bg-white p-2">
      <img src={timer} alt="Timer" className="h-5 w-5" />
    </Button>
    <span className="text-sm text-[#444447]">30 Days Hours</span>
  </div>
</div>
    </div>
    
     </div>
     </div>
     </div>
    
  )
}

export default MainCourse
