import AboutCourse from '@/components/courses/AboutCourse'
import CourseTrack from '@/components/courses/Course_Track'
import MainCourse from '@/components/courses/MainCourse'
import NotesMaterials from '@/components/courses/notes__materials'
import Task_Projects from '@/components/courses/Task_Projects'
import { Route, Routes } from 'react-router-dom'

const CourseRoute = () => {

    return (
        <Routes>
            <Route path='/' element={<MainCourse />} />
            <Route path='/about/:course' element={<AboutCourse />} />
            <Route path='/classnodes/:course' element={<NotesMaterials />} />
            <Route path='/task/:course' element={<Task_Projects />} />
            <Route path='/course_track/:course' element={<CourseTrack />} />
        </Routes>
    )
}

export default CourseRoute