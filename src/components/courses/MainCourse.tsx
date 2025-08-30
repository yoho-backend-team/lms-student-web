import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard'; // adjust the path
import { selectCourse } from '@/features/Course/reducer/selector';

interface Course {
	course_name: string;
	description: string;
	image: string;
	slug: string;
	coursemodules: string;
	duration: string;
}

const MainCourse = () => {
	const [courses, setCourses] = useState<Course | null>(null);
	const navigate = useNavigate();

	const coursedata = useSelector(selectCourse);

	useEffect(() => {
		setCourses(coursedata);
	}, [coursedata]);

	return (
		<div className='px-4 py-6'>
			<h1 className='text-black text-2xl font-semibold mb-6'>Courses</h1>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto'>
				<CourseCard
					title={courses?.course_name ?? ''}
					description={courses?.description ?? ''}
					image={courses?.image ?? ''}
					modules={courses?.coursemodules ?? ''}
					duration={courses?.duration ?? ''}
					onClick={() => navigate('/about/mernstack')} // if you have route
				/>
			</div>
		</div>
	);
};

export default MainCourse;
