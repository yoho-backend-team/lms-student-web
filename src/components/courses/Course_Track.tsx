import React from 'react';
import frame from "../../assets/courses icons/GFrame.png"
import group from "../../assets/courses icons/htmlGroup.png"

const CourseTrack: React.FC = () => {
  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-2xl font-semibold text-black mb-6">Course Tracks</h1>

    
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <button className="bg-[#EBEFF3] text-black px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">About</button>
        <button className="bg-[#EBEFF3] text-black px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Class Note & Materials</button>
        <button className="bg-[#EBEFF3] text-black px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Task & Projects</button>
        <button className="bg-[#7b00ff] text-white px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Course Track</button>
      </div>

   
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
