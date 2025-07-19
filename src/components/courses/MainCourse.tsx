import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import humanimg from '../../assets/courses icons/demo human.png';
import { useSelector } from 'react-redux';
import { selectCourse } from '@/features/Course/reducer/selector';


const courses = [
  {
    title: 'MERN STACK',
    description:'The MERN stack is a popular JavaScript-based framework used for building full-stack web applications.',
    image: humanimg,
    modules: '1 Module',
    duration: '30 Days',
    route: '/about/mernstack',
  },
  {
    title: 'PYTHON',
    description: 'The Python helps you develope backend apps efficiently.',
    image: humanimg,
    modules: '2 Modules',
    duration: '45 Days',
    route: '/about/python',
  },

];

const MainCourse = () => {
  const navigate = useNavigate();
  
  const coursedata = useSelector(selectCourse)
  console.log(coursedata,'coursedata')


  

  return (
    <div className="px-4 py-6">
      <h1 className="text-black text-2xl font-semibold mb-6">Courses</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            description={course.description}
            image={course.image}
            modules={course.modules}
            duration={course.duration}
            onClick={() => navigate(course.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCourse;
