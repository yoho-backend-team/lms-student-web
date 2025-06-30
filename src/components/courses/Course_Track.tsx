import React from 'react';
import frame from "../../assets/courses icons/GFrame.png"
import group from "../../assets/courses icons/htmlGroup.png"
import CourseButton from './coursebutton';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import navigationicon from "../../assets/courses icons/navigation arrow.svg"


const CourseTrack: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => {
            navigate(-1)
          }}
          className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 className="text-black text-2xl font-semibold">Class Notes & Materials</h1>
      </div>
      <CourseButton />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        <div className="w-full flex justify-center">
          <img
            src={frame}
            alt="Course Preview"
            className="rounded-lg shadow-lg max-w-full"
          />
        </div>


        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <div className="rounded-xl shadow-lg p-4 bg-white">
              <img
                src={group}
                alt="HTML/CSS/JS"
                className="w-82 h-82 mx-auto mb-2"
              />
              <p className="text-sm font-medium">HTML, CSS, Javascript</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CourseTrack;
