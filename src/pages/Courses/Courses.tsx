import MainCourse from '@/components/courses/MainCourse';
import Notes from '@/components/Notes/notes and materials';
import Taskprojects from '@/components/Notes/Task and projects';
import React from 'react';

const Courses = () => {
	return (

		<div>
			<MainCourse />
			<Notes />
			<Taskprojects />
		</div>

	)

};

export default Courses;
