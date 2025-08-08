import React from "react";
import studentGif from "../../assets/Student SVG (1).gif";

const Loader: React.FC = () => {
    return (
        <div className="flex mt-50 justify-center h-full overflow-hidden relative bg-transparent">
            <img 
                src={studentGif} 
                alt="Loading..." 
                className="w-18 h-18 object-contain"
            />
        </div>
    );
};

export default Loader;
