import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'
import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import CourseButton from './coursebutton'
import TaskModal from '../../components/courses/TaskModal'  

const Taskprojects = () => {
  const navigate = useNavigate()
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const tasks = [
    { name: 'Raji sukla', type: 'task', task: 'Larum ipsum', overview: 'Overview of task A', question: 'What is React?', note: 'Please read documentation', deadline: '26.08.2025', status: 'completed' },
    { name: 'Thamo', type: 'task', task: 'Lorem ipsum', overview: 'Overview of task B', question: 'Explain hooks', note: 'Revise useEffect', deadline: '12-06-2025', status: 'pending' },
    { name: 'Dhinesh', type: 'task', task: 'Lorem ipsum', overview: 'Overview of task C', question: 'What is Redux?', note: 'Revise state management', deadline: '21-09-2025', status: 'pending' },
    { name: 'M S Dhoni', type: 'task', task: 'Lorem ipsum', overview: 'Overview of task D', question: 'Explain lifecycle methods', note: 'Practice examples', deadline: '21-09-2025', status: 'completed' },
  ]

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

      <CourseButton activeTabs={"task"} />

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
            {tasks.map((task, index) => (
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
                        ${task.status === 'completed'
                          ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                          : 'bg-gray-200 text-[#716F6F] hover:bg-gradient-to-l hover:from-[#7B00FF] hover:to-[#B200FF] hover:text-white'
                        }`}
                    >
                      {task.status}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {/* Modal */}
      <TaskModal show={showModal} onClose={() => setShowModal(false)} task={selectedTask} />
    </div>
  )
}

export default Taskprojects
