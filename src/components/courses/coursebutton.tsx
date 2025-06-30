
import { Button } from "@/components/ui/button";
import type React from "react";
// import { useState } from "react";
import { useNavigate } from 'react-router-dom'


const CourseButton: React.FC<{ activeTabs: string }> = ({ activeTabs }) => {

  // const [activeTab, setactiveTab] = useState<'about' | 'notes' | 'task' | 'track'>('about');
  const navigate = useNavigate();


  return (
    <div className="flex justify-center gap-6 mb-12">
      <Button
        onClick={() => { navigate('/about/mernstack') }}
        className={
          activeTabs === 'about' ?
            "btnfocusshadow w-60 text-white"
            :
            "w-60 bg-[#EBEFF3] hover:bg-[#EBEFF3] focus:bg-[#EBEFF3] hover:bg-gradient-to-r focus:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white focus:text-white text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none focus:ring-2 focus:ring-[#7B00FF] focus:ring-opacity-50 transition-all duration-200"}
      >
        About
      </Button>

      <Button
        onClick={() => { navigate('/note_materials') }}
        className={activeTabs === 'notes' ? "btnfocusshadow w-60 text-white"
          : "w-60 bg-[#EBEFF3] hover:bg-[#EBEFF3] focus:bg-[#EBEFF3] hover:bg-gradient-to-r focus:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white focus:text-white text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none focus:ring-2 focus:ring-[#7B00FF] focus:ring-opacity-50 transition-all duration-200"}
      >
        Class Notes & Materials
      </Button>

      <Button
        onClick={() => { navigate('/task_projects') }}
        className={activeTabs === 'task' ? "btnfocusshadow w-60 text-white" :
          " w-60 bg-[#EBEFF3] hover:bg-[#EBEFF3] focus:bg-[#EBEFF3] hover:bg-gradient-to-r focus:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white focus:text-white text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]  focus:outline-none focus:ring-2 focus:ring-[#7B00FF] focus:ring-opacity-50 transition-all duration-200"}
      >
        Task & Projects
      </Button>

      <Button
        onClick={() => { navigate('/course_track') }}
        className={activeTabs === 'track' ? "btnfocusshadow w-60 text-white" :
          "w-60 bg-[#EBEFF3] hover:bg-[#EBEFF3] focus:bg-[#EBEFF3] hover:bg-gradient-to-r focus:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white focus:text-white text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none focus:ring-2 focus:ring-[#7B00FF] focus:ring-opacity-50 transition-all duration-200"}
      >
        Course Track
      </Button>
    </div>


  )
}

export default CourseButton