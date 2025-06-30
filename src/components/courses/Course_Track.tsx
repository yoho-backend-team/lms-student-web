import React, { useState } from 'react';
// import frame from "../../assets/courses icons/GFrame.png"
import group from "../../assets/courses icons/htmlGroup.png"
import CourseButton from './coursebutton';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import { FONTS } from '@/constants/uiConstants';


const CourseTrack: React.FC = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
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
          <div
            className="aspect-video w-full max-w-2xl  shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setShowVideoModal(true)}
          >
            <iframe
              className="w-full h-full pointer-events-none"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Course Video Preview"
              frameBorder="0"
            ></iframe>
          </div>
        </div>


        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <div className="rounded-xl shadow-lg p-4 bg-white">
              <img
                src={group}
                alt="HTML/CSS/JS"
                className="w-82 h-82 mx-auto mb-2"
              />
              <p className=""style={FONTS.para_02}>HTML, CSS, Javascript</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full max-w-6xl aspect-video p-6 rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] bg-[#EBEFF3]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Full Course Video"
              frameBorder="0"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 px-3 py-1 rounded hover:bg-opacity-75"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTrack;
