import React from 'react';
import download from "../../assets/courses icons/download.svg";
import fileicon from "../../assets/courses icons/fileicon.svg";
import CourseButton from './coursebutton';

interface MaterialItem {
    file: string;
    name: string;
    chapter: string;
    link: string;
}

const Notes_Materials: React.FC = () => {
    const materials: MaterialItem[] = [
        { file: "chapter_1.pdf", name: "12-06-2025", chapter: "09.00 AM", link: "#" },
        { file: "chapter_2.pdf", name: "12-06-2025", chapter: "09.00 AM", link: "#" },
        { file: "chapter_3.pdf", name: "12-06-2025", chapter: "09.00 AM", link: "#" },
        { file: "chapter_4.pdf", name: "12-06-2025", chapter: "09.00 AM", link: "#" },
    ];

    return (
        <div className="px-4 py-6 w-full">
            {/* <h1 className="text-black text-2xl font-semibold mb-6">Class Notes & Materials</h1> */}
            <CourseButton />
            {/* 
            <div className="flex justify-center gap-4 mb-12">
                <Button className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    About
                </Button>
                <Button className="bg-[#7b00ff] hover:bg-[#7b00ff] text-white px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    Class Notes & Materials
                </Button>
                <Button className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    Task & Projects
                </Button>
                <Button className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    Course Track
                </Button>
            </div> */}


            <div className="bg-[#EBEFF3] text-[#444447] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg w-full max-w-full">


                <div className="grid grid-cols-4 font-semibold text-white bg-[#7b00ff] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] p-4 rounded-lg mb-4 text-center">
                    <span>File</span>
                    <span>Name</span>
                    <span>Chapters</span>
                    <span>PDF Download</span>
                </div>


                {materials.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-4 text-sm bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] p-4 rounded-lg mb-4 text-center items-center"
                    >
                        <span className="flex justify-center">
                            <img src={fileicon} alt="file icon" className="h-8 w-8" />
                        </span>
                        <span>{item.name}</span>
                        <span>{item.chapter}</span>
                        <span className="flex justify-center">
                            <a
                                href={item.link}
                                download
                                className="bg-[#EBEFF3] hover:bg-[#EBEFF3] px-4 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] flex items-center justify-center w-fit mx-auto"
                            >
                                <img src={download} alt="download icon" className="h-5 w-5" />
                            </a>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes_Materials;
