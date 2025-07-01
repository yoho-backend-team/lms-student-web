import React, { useState } from 'react';
import { Button } from '../ui/button';
import icons from "../../assets/courses icons/demo human.png"
import { useNavigate } from 'react-router-dom';
import navigationicon from "../../assets/courses icons/navigation arrow.svg";
import CourseButton from './coursebutton';


interface TimelineItem {
  icon: string;
  title: string;
  side: "left" | "right";
  color?: string;
}

const techTimeline: TimelineItem[] = [
  {
    icon: icons,
    title: "HTML, CSS, Javascript",
    side: "right",
    color: "bg-purple-600",
  },
  {
    icon: icons,
    title: "Mangodb, Express, Node.js",
    side: "left",
  },
  {
    icon: icons,
    title: "React",
    side: "right",
  },
  {
    icon: icons,
    title: "python",
    side: "left",
  },
];

const CourseTrack: React.FC = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-8">

      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 className="text-black text-2xl font-semibold">Course Track</h1>
      </div>


      <CourseButton activeTabs={"track"} />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        <div className="w-full flex justify-center">
          <div
            className="aspect-video w-full  shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg overflow-hidden cursor-pointer"
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


        <div className="flex justify-center shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] rounded-md w-full">
          <div className="relative flex flex-col items-center overflow-auto h-[500px]" style={{ scrollbarWidth: 'none' }}>


            {techTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative z-10 flex items-center my-14 w-full max-w-4xl">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-[400px] w-5 bg-gray-100 btnshadow rounded-full"></div>

                  {/* Left Section */}
                  <div className="w-1/2 flex justify-end pr-6">
                    {isEven ? (
                      <div className="bg-[#EBEFF3] rounded-full mr-10 p-6 shadow-[inset_8px_8px_12px_rgba(189,194,199,0.4),inset_-8px_-8px_12px_rgba(255,255,255,0.7)] transition-transform hover:scale-110 duration-300 ease-in-out">
                        <img src={item.icon} alt={item.title} className="w-20 h-20 rounded-xl object-contain" />
                      </div>
                    ) : (
                      <div className="bg-[#EBEFF3] rounded-2xl p-6 mr-10 text-right shadow-[12px_12px_20px_rgba(189,194,199,0.5),-10px_-10px_15px_rgba(255,255,255,0.7)] transition-transform hover:scale-105 duration-300 ease-in-out">
                        <span className="text-base font-medium text-gray-700">{item.title}</span>
                      </div>
                    )}
                  </div>

                  {/* Middle Connector */}
                  <div className="relative w-0">
                    <div className="w-10 h-10 rounded-full border-4 border-white bg-gradient-to-br from-[#B200FF] to-[#7B00FF] shadow-[0_0_15px_rgba(178,0,255,0.5)] absolute left-1/2 transform -translate-x-1/2 z-20"></div>
                    <div className="absolute w-1 h-full bg-gradient-to-b from-[#ccc] to-[#eee] left-1/2 transform -translate-x-1/2 z-0 rounded-full"></div>
                  </div>

                  {/* Right Section */}
                  <div className="w-1/2 flex justify-start pl-6">
                    {isEven ? (
                      <div className="bg-[#EBEFF3] rounded-2xl ml-10 p-6 text-left shadow-[12px_12px_20px_rgba(189,194,199,0.5),-10px_-10px_15px_rgba(255,255,255,0.7)] transition-transform hover:scale-105 duration-300 ease-in-out">
                        <span className="text-base font-medium text-gray-700">{item.title}</span>
                      </div>
                    ) : (
                      <div className="bg-[#EBEFF3] rounded-full ml-10 p-6 shadow-[inset_8px_8px_12px_rgba(189,194,199,0.4),inset_-8px_-8px_12px_rgba(255,255,255,0.7)] transition-transform hover:scale-110 duration-300 ease-in-out">
                        <img src={item.icon} alt={item.title} className="w-20 h-20 rounded-xl object-contain" />
                      </div>
                    )}
                  </div>
                </div>

              );
            })}
          </div>
        </div>

      </div>


      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
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
