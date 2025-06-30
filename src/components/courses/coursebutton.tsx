import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'
import navigationicon from "../../assets/courses icons/navigation arrow.svg"


function CourseButton() {

  const navigate = useNavigate();


  return (
    <div>

      <div className="flex justify-center gap-4 mb-12">
        <Button onClick={() => {
          navigate('/about/mernstack')
        }} className="bg-[#7b00ff]  text-white px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
          About
        </Button>
        <Button onClick={() => {
          navigate('/note_materials')
          // setpagename('Class Notes & Materials')
        }} className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Class Notes & Materials</Button>
        <Button onClick={() => {
          navigate('/task_projects')
          // setpagename('Task & Projects')
        }} className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Task & Projects</Button>
        <Button onClick={() => {
          navigate('/course_track')
          // setpagename('Course Track')
        }} className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Course Track</Button>
      </div>


    </div>
  )
}

export default CourseButton