import { Button } from "@/components/ui/button";
import { selectCourse } from "@/features/Course/reducer/selector";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

type TabType = 'about' | 'notes' | 'task' | 'track';

interface CourseButtonProps {
  activeTabs: string;
}


const CourseButton: React.FC<CourseButtonProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const coursedata = useSelector(selectCourse);

  // Determine active tab based on current route
  const activeTabs: TabType =
    location.pathname.includes('note_materials') ? 'notes' :
      location.pathname.includes('task_projects') ? 'task' :
        location.pathname.includes('course_track') ? 'track' :
          'about';

  const inactiveBtnClass = "w-60 cursor-pointer bg-[#EBEFF3] hover:bg-[#EBEFF3] focus:bg-[#EBEFF3] hover:bg-gradient-to-r focus:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white focus:text-white text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none focus:ring-2 focus:ring-[#7B00FF] focus:ring-opacity-50 transition-all duration-200";

  return (
    <div className="flex justify-center gap-6 mb-12">
      <Button
        onClick={() => navigate(`about/${coursedata?.uuid}`)}
        className={activeTabs === 'about' ? 'cursor-pointer btnfocusshadow w-60 text-white' : inactiveBtnClass}
      >
        About
      </Button>

      <Button
        onClick={() => navigate('note_materials')}
        className={activeTabs === 'notes' ? 'cursor-pointer btnfocusshadow w-60 text-white' : inactiveBtnClass}
      >
        Class Notes & Materials
      </Button>

      <Button
        onClick={() => navigate('task_projects')}
        className={activeTabs === 'task' ? 'cursor-pointer btnfocusshadow w-60 text-white' : inactiveBtnClass}
      >
        Task & Projects
      </Button>

      <Button
        onClick={() => navigate('course_track')}
        className={activeTabs === 'track' ? 'cursor-pointer btnfocusshadow w-60 text-white' : inactiveBtnClass}
      >
        Course Track
      </Button>
    </div>
  );
};

export default CourseButton;