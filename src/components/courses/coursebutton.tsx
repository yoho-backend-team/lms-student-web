import { Button } from "@/components/ui/button";
import { selectCourse } from "@/features/Course/reducer/selector";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

type TabType = "about" | "notes" | "task" | "track";

interface CourseButtonProps {
  activeTabs: string;
}

const CourseButton: React.FC<CourseButtonProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const coursedata = useSelector(selectCourse);

  const activeTabs: TabType = location.pathname.includes(
    "/note_materials"
  )
    ? "notes"
    : location.pathname.includes("/task_projects")
      ? "task"
      : location.pathname.includes("/course_track")
        ? "track"
        : location.pathname.includes(`/about`)
          ? "about"
          : "about";

  const inactiveBtnClass =
    "w-full sm:w-48 md:w-52 lg:w-56 xl:w-60 2xl:w-64 cursor-pointer bg-[#EBEFF3] hover:bg-[#EBEFF3] focus:bg-[#EBEFF3] hover:bg-gradient-to-r focus:bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:text-white focus:text-white text-[#444] px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none focus:ring-2 focus:ring-[#7B00FF] focus:ring-opacity-50 transition-all duration-200 text-xs sm:text-sm md:text-base";

  const activeBtnClass =
    "cursor-pointer btnfocusshadow w-full sm:w-48 md:w-52 lg:w-56 xl:w-60 2xl:w-64 text-white text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3";

  return (
    <div className="flex flex-row flex-wrap gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-center items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-4">
      <Button
        onClick={() => navigate(`/courses/${coursedata?._id}/about`)}
        className={activeTabs === "about" ? activeBtnClass : inactiveBtnClass}
      >
        About
      </Button>

      <Button
        onClick={() => navigate(`/courses/${coursedata?.uuid}/note_materials`)}
        className={activeTabs === "notes" ? activeBtnClass : inactiveBtnClass}
      >
        Class Notes & Materials
      </Button>

      <Button
        onClick={() => navigate(`/courses/${coursedata?.uuid}/task_projects`)}
        className={activeTabs === "task" ? activeBtnClass : inactiveBtnClass}
      >
        Task & Projects
      </Button>

      <Button
        onClick={() => navigate(`/courses/${coursedata?.uuid}/course_track`)}
        className={activeTabs === "track" ? activeBtnClass : inactiveBtnClass}
      >
        Course Track
      </Button>
    </div>
  );
};

export default CourseButton;