/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'
import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import CourseButton from './coursebutton'
import TaskModal from '../../components/courses/TaskModal'
import { useDispatch, useSelector } from 'react-redux'

import { getStudentTask } from '@/features/Course/reducer/thunks'
import { selectcoursetask } from '@/features/Course/reducer/selector'


const Taskprojects = () => {
  const navigate = useNavigate()
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])

  const dispatch = useDispatch<any>()
  const taskData = useSelector(selectcoursetask)
  console.log(taskData, "corse student")


  useEffect(() => {
    dispatch(getStudentTask({ courseid: '67f3b7fcb8d2634300cc87b6' }))
  }, [dispatch])


  useEffect(() => {
    if (taskData && taskData) {
      const transformedTasks = taskData?.map((item: any) => ({
        id: item._id,

        name: item?.instructor?.full_name || 'N/A',


        type: item?.task_type || 'N/A',
        task: item?.task_name || 'N/A',
        question: item?.question || 'N/A',
        overview: 'Task overview',
        note: 'Task notes',


        deadline: item.deadline
          ? new Date(item.deadline).toLocaleDateString()
          : 'No deadline',


        status: !item.is_active ? 'completed' : 'pending',


        answers:
          item.answers?.map((ans: any) => ({
            student: ans.student || 'N/A',
            file: ans.file,
            status: ans.status,
            mark: ans.mark ?? null,
            completedAt: ans.completed_at
              ? new Date(ans.completed_at).toLocaleString()
              : null,
          })) || [],
      }))
      setTasks(transformedTasks)
    }
  }, [taskData])

  return (
    <div className="w-full mx-auto p-4">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#EBEFF3] text-[#333] cursor-pointer hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow"
        >
          <img src={navigationicon} />
        </Button>
        <h1 className="text-black text-2xl font-semibold">Task Projects</h1>
      </div>

      <CourseButton activeTabs={'task'} />

      <Card className="overflow-hidden bg-[#EBEFF3]">
        <div className="flex flex-col">
          {/* Header */}
          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] p-6 ml-4 mr-4 sticky top-0 z-10 mb-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Name</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Type</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Task Name</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Deadline</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Status</div>
            </div>
          </Card>

          {/* Body */}
          <div className="min-h-[500px] overflow-y-auto mx-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Card
                  key={index}
                  className="bg-[#ebeff3] p-4 mb-2 cursor-pointer hover:shadow-lg"
                  onClick={() => { setSelectedTask(task); setShowModal(true) }}
                >
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="text-center text-gray-600" style={{ ...FONTS.para_01 }}>{task.name}</div>
                    <div className="text-center text-gray-600 capitalize" style={{ ...FONTS.para_01 }}>{task.type}</div>
                    <div className="text-center text-gray-600" style={{ ...FONTS.para_01 }}>{task.task}</div>
                    <div className="text-center text-gray-600" style={{ ...FONTS.para_01 }}>{task.deadline}</div>
                    <div className="flex justify-center">
                      <Button
                        className={`rounded-xl px-4 py-1 text-sm cursor-pointer 
                          ${task.status === 'active' || task.status === 'completed'
                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                            : 'bg-gray-200 text-[#716F6F] hover:bg-gradient-to-l hover:from-[#7B00FF] hover:to-[#B200FF] hover:text-white'
                          }`}
                      >
                        {task.status}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 text-gray-500">
                No tasks available
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Modal */}
      <TaskModal show={showModal} onClose={() => setShowModal(false)} task={selectedTask} />
    </div>
  )
}

export default Taskprojects
