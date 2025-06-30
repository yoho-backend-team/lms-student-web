import React, { useState } from "react";
import videoimg from "../../assets/courses icons/videoimg.png"

const CourseVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleStartVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="w-full px-6 py-6">
      <h1 className="text-2xl font-semibold text-black mb-6">Course Tracks</h1>

      <div className="bg-[#EBEFF3] p-6 rounded-xl shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] w-full  mx-auto">
        {isPlaying ? (
          <video
            controls
            autoPlay
            className="w-full h-auto rounded-lg"
            src="https://www.w3schools.com/html/mov_bbb.mp4"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            onClick={handleStartVideo}
            className="cursor-pointer transition duration-300 hover:scale-[1.01]"
          >
            <img
              src={videoimg} 
              alt="Course Thumbnail"
              className="w-full h-130 rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseVideo;
