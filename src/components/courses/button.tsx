import React from 'react';

import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from 'react-router-dom'

function Mainbutton() {

    const navigate=useNavigate();
    

    return (
    <div>
    <div className="flex flex-row gap-3  mb-12 flex align-items-center flex justify-center">
        <Button className="bg-[#EBEFF3] hover:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white transition-colors duration-300
 hover:transition-none  font-semibold  boxshadow h-10 w-60 shadow-md "   variant="outline" onClick={() => navigate("/about")} >
          About
        </Button>
         <Button className="bg-[#EBEFF3] hover:bg-gradient-to-r  from-[#7B00FF] to-[#B200FF] hover:text-white boxshadow h-10 w-60 shadow-sm" variant="outline" onClick={() => navigate("/note_materials")}>
          Class notes & materials
        </Button>
         <Button className="bg-[#EBEFF3] hover:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white boxshadow h-10 w-60 shadow-sm" variant="outline" onClick={() => navigate("/task_projects")}>
          Task & project
        </Button>
         <Button className="bg-[#EBEFF3] hover:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white boxshadow h-10 w-60 shadow-sm" variant="outline">
        Course Tracking
        </Button>
        </div>


    </div>
  )
}

export default Mainbutton